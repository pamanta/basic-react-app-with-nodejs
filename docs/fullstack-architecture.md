# Fullstack Architecture: Browser -> API -> DB -> Browser

This document explains how requests move through the app in both development and production-style execution.

## Stack
- Frontend: React (`src/App.jsx`)
- Frontend dev server: Vite (`npm run dev:ui`, port `5173`)
- Backend: Express (`server.js`, `npm run dev:api`, port `8080`)
- Database: Not yet connected (placeholder point is inside API route handlers)

## Dev execution model (separate processes)
- Process 1: UI (`npm run dev:ui`) on `http://localhost:5173`
- Process 2: API (`npm run dev:api`) on `http://localhost:8080`
- Combined command: `npm run dev` starts both.

### Dev request flow for `GET /api/hello`
1. Browser loads UI from Vite at `http://localhost:5173`.
2. React component mounts and runs `fetch('/api/hello')`.
3. Vite dev proxy forwards `/api/hello` to `http://localhost:8080/api/hello`.
4. Express route handler in `server.js` receives the request.
5. Backend executes business logic.
6. (Future DB step) backend queries the database.
7. Backend sends JSON response.
8. Browser receives JSON.
9. React updates state (`setData`) and re-renders UI.

## Production-style execution model (single process)
- Build frontend into `dist/` via `npm run build`.
- Start Express with `npm run start`.
- Express serves static frontend files and API endpoints from one server on `http://localhost:8080`.

### Production-style request flow
1. Browser requests `GET /` from Express.
2. Express serves `dist/index.html`.
3. Browser loads JS/CSS assets from `dist/`.
4. React runs `fetch('/api/hello')`.
5. Express handles `GET /api/hello`.
6. (Future DB step) backend queries DB.
7. Express returns JSON.
8. React renders the returned message.

## Database integration point
Current routes return static JSON. Add DB calls before `res.json(...)` in each API handler.

Example:

```js
app.get('/api/hello', async (req, res) => {
  try {
    const row = await db.query('SELECT message FROM greetings LIMIT 1');
    res.json({ message: row.message });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

## Key files
- `src/App.jsx` - Triggers browser API request
- `vite.config.js` - Dev proxy from UI server to API server
- `server.js` - API routes and static file serving
