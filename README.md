# basic_react

Minimal fullstack app using React (Vite) + Express.

## Development mode (separate UI + API)
- UI server: `npm run dev:ui` (Vite on `http://localhost:5173`)
- API server: `npm run dev:api` (Express on `http://localhost:8080`)
- Both together: `npm run dev`

Vite proxies `/api/*` requests from port `5173` to the API server on port `8080`.

## Production-like mode
1. Build frontend:
   - `npm run build`
2. Start server:
   - `npm run start`
3. Open:
   - `http://localhost:8080`

In this mode, Express serves both API endpoints and built frontend assets from `dist/`.

## Scripts
- `npm run dev` - Runs both backend and frontend in parallel
- `npm run dev:api` - Runs Express backend only
- `npm run dev:ui` - Runs Vite frontend only
- `npm run build` - Builds React app into `dist/`
- `npm run start` - Starts Express server

## API endpoints
- `GET /api/hello`
- `GET /api/hello2`
- `GET /api/hello3`

## Architecture
See `docs/fullstack-architecture.md` for the full request-flow document.
