const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

function run(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { shell: "cmd.exe" }, (err, stdout, stderr) => {
      if (err) return reject(stderr || err.message);
      resolve(stdout);
    });
  });
}

// List saved WiFi profile names
app.get("/api/profiles", async (req, res) => {
  try {
    const out = await run("netsh wlan show profiles");
    const names = out
      .split("\n")
      .filter((line) => line.includes("All User Profile"))
      .map((line) => line.split(":")[1]?.trim())
      .filter(Boolean);
    res.json({ names });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

// Reveal the saved key for one profile
app.get("/api/password/:name", async (req, res) => {
  try {
    const name = req.params.name.replace(/"/g, ""); // basic sanitizing
    const out = await run(`netsh wlan show profile "${name}" key=clear`);
    const match = out.match(/Key Content\s*:\s*(.+)/);
    res.json({
      name,
      password: match ? match[1].trim() : "(no password found / open network)",
      raw: out,
    });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.listen(PORT, () => {
  console.log(`WiFi checker UI running at http://localhost:${PORT}`);
});
