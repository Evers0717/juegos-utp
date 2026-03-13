/**
 * @param {number} gameId
 * @param {number} finalScore
 */
function registrarPuntajeGlobal(gameId, finalScore) {
  const playerName = sessionStorage.getItem("activePlayer");

  if (!playerName) {
    console.warn(
      "Intento de guardado sin sesión activa. El puntaje no se registrará.",
    );
    return;
  }

  const dataToSend = {
    name: playerName,
    gameId: gameId,
    score: finalScore,
  };

  console.log("Enviando reporte a base de datos...", dataToSend);

  if (window.electronAPI && window.electronAPI.sendScore) {
    window.electronAPI.sendScore(dataToSend);
  } else {
    console.error(
      "API de Electron no detectada. ¿Estás en el navegador o en la App?",
    );
  }
}
