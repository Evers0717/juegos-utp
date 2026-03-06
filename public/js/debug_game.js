// ==========================================
// ESTADO DEL JUEGO
// ==========================================
let gameChallenges = [];
let currentChallengeIdx = 0;
let lives = 3;
let isProcessing = false;

const sfxCorrect = new Audio("../../assets/audio/correctSound.mp3");
const sfxWrong = new Audio("../../assets/audio/errorSound.mp3");

document.addEventListener("DOMContentLoaded", () => {
  prepararPartida();
});
function prepararPartida() {
  lives = 3;
  currentChallengeIdx = 0;

  // 1. Barajar todos los retos de la base de datos y elegir 5
  gameChallenges = [...DEBUG_CHALLENGES]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  loadChallenge();
}

function loadChallenge() {
  const challenge = gameChallenges[currentChallengeIdx];

  const elLevelName = document.getElementById("level-name");
  const elCodeDisplay = document.getElementById("code-display");
  const elChallengeCount = document.getElementById("challenge-count");
  const elLang = document.getElementById("challenge-lang");

  if (!elLevelName || !elCodeDisplay) return;

  elLevelName.innerText = challenge.title;
  elChallengeCount.innerText = `${currentChallengeIdx + 1} / 5`;
  elLang.innerText = challenge.language || "Código";
  updateLivesUI();

  elCodeDisplay.innerHTML = "";
  const lines = challenge.code.split("\n");

  lines.forEach((lineText, index) => {
    const lineNum = index + 1;
    const lineRow = document.createElement("div");
    lineRow.className = "code-line";
    lineRow.id = `line-${lineNum}`;

    lineRow.innerHTML = `
            <span class="line-num">${lineNum}</span>
            <span class="code-text">${escapeHTML(lineText)}</span>
        `;
    lineRow.onclick = () => checkLine(lineNum, lineRow);
    elCodeDisplay.appendChild(lineRow);
  });

  // NUEVO: Ahora mostramos la INTENCIÓN del código, no el error.
  printTerminal(`> OBJETIVO DEL MÓDULO: ${challenge.description}`);
}

function showHint() {
  if (isProcessing || lives <= 0) return;

  const challenge = gameChallenges[currentChallengeIdx];
  // Opcional: puedes penalizar con una vida si quieres
  // lives--;
  // updateLivesUI();

  printTerminal(
    `💡 PISTA: ${challenge.hint || "Analiza bien el flujo de datos."}`,
    "#ffd600",
  );
}

// ==========================================
// VALIDACIÓN
// ==========================================
function checkLine(clickedLine, element) {
  if (lives <= 0 || isProcessing) return;

  const challenge = gameChallenges[currentChallengeIdx];
  isProcessing = true;

  if (clickedLine === challenge.errorLine) {
    playSound(sfxCorrect);
    element.classList.add("line-success");
    // Mostramos éxito pero sin revelar el nombre técnico del error de inmediato
    printTerminal(
      `✅ ¡SISTEMA REPARADO! El módulo funciona correctamente ahora.`,
      "#00c853",
    );

    setTimeout(() => {
      currentChallengeIdx++;
      if (currentChallengeIdx < gameChallenges.length) {
        isProcessing = false;
        loadChallenge();
      } else {
        victory();
      }
    }, 2000);
  } else {
    playSound(sfxWrong);
    lives--;
    element.classList.add("line-error");
    updateLivesUI();
    printTerminal(
      `❌ ANALIZANDO... Línea ${clickedLine} sin anomalías. Integridad reducida.`,
      "#ff4d6d",
    );

    setTimeout(() => {
      element.classList.remove("line-error");
      isProcessing = false;
      if (lives <= 0) gameOver();
    }, 1000);
  }
}
// ==========================================
// UTILIDADES
// ==========================================
function updateLivesUI() {
  const elLives = document.getElementById("lives-display");
  if (elLives) {
    elLives.innerText = "❤️".repeat(lives) + "🖤".repeat(3 - lives);
  }
}

function printTerminal(msg, color = "#00ff00") {
  const elTerminal = document.getElementById("terminal-content");
  if (elTerminal) {
    elTerminal.innerHTML = `<span style="color: ${color}">${msg}</span>`;
  }
}

function playSound(audio) {
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

// Evita que el código inyectado rompa el HTML
function escapeHTML(str) {
  return str.replace(
    /[&<>"']/g,
    (m) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[m],
  );
}

function victory() {
  document.getElementById("code-display").innerHTML = `
    <div style="text-align:center; padding-top:50px; color:#00c853;">
        <h2 style="font-size: 40px; text-shadow: 0 0 20px rgba(0,200,83,0.4);">¡SISTEMA DEPURADO!</h2>
        <p>Has resuelto los 5 desafíos con éxito.</p>
        <button class="btn-cyber success" onclick="location.reload()" style="margin-top:20px; font-size:16px;">
            INICIAR_NUEVO_ESCANEO
        </button>
    </div>
  `;
}

function gameOver() {
  document.getElementById("code-display").innerHTML = `
    <div style="text-align:center; padding-top:50px; color:#ff4d6d;">
        <h2 style="font-size: 40px; text-shadow: 0 0 20px rgba(255,77,109,0.4);">SISTEMA COMPROMETIDO</h2>
        <p>Demasiados errores de diagnóstico. Kernel Panic.</p>
        <button class="btn-cyber" onclick="location.reload()" style="margin-top:20px; font-size:16px; border-color:#ff4d6d; color:#ff4d6d;">
            REINICIAR_TERMINAL
        </button>
    </div>
  `;
}
