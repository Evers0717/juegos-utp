const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const dbFolder = path.join(__dirname, "../data");
if (!fs.existsSync(dbFolder)) {
  fs.mkdirSync(dbFolder, { recursive: true });
}

const db = require("./database.js");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile(path.join(__dirname, "../public/index.html"));
}

ipcMain.on("save-score", (event, data) => {
  const { name, gameId, score } = data;
  const query = `INSERT INTO scores (player_name, game_id, score) VALUES (?, ?, ?)`;
  db.run(query, [name, gameId, score], (err) => {
    if (err) {
      console.error("Error al guardar en DB:", err.message);
    } else {
      console.log(`✅ Puntaje de ${name} registrado en la DB.`);
    }
  });
});

ipcMain.handle("get-high-score", async (event, gameId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT MAX(score) as top FROM scores WHERE game_id = ?`;
    db.get(query, [gameId], (err, row) => {
      if (err) resolve(0);
      resolve(row ? row.top : 0);
    });
  });
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
