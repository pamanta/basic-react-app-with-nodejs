import path from "path";
import express from "express";

import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// Backend API routes
app.get("/api/hello", (req, res) => {
  console.log(req.method, req.url);
  res.json({ message: "Hello from Node.js backend!" });
});

app.get("/api/hello2", (req, res) => {
  console.log(req.method, req.url);
  res.json({ message: "Hello2 from Node.js backend!" });
});

app.get("/api/hello3", (req, res) => {
  console.log(req.method, req.url);
  res.json({ message: "Hello3 from Node.js backend!" });
});

// Frontend static files
app.use(express.static(path.join(__dirname, "dist")));

// Serve the frontend with index.html for all other routes
// this helps with client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
