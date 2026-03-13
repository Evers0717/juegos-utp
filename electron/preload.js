const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  sendScore: (data) => ipcRenderer.send("save-score", data),
  getHighScore: (gameId) => ipcRenderer.invoke("get-high-score", gameId),
});
