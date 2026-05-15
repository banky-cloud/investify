import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
config

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to Vite build folder
const distPath = path.join(__dirname, "../client/dist");

// Serve static files
app.use(express.static(distPath));

// React Router support
app.use((req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});