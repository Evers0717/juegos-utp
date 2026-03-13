const sfxSuccess = new Audio("../../assets/audio/correctSound.mp3");
const sfxError = new Audio("../../assets/audio/errorSound.mp3");
const CURRENT_GAME_ID = 3;
// Variables Globales del Estado del Juego
let score = 0;
let lives = 3;
let streak = 0;
let currentPacket = null;

// Variables del Temporizador
let timerInterval;
let timeLeft;
let currentMaxTime;

// Elementos del DOM
const elArena = document.getElementById("game-arena");
const elTimerRing = document.getElementById("timer-ring");
const elTimerText = document.getElementById("timer-text");
const elLives = document.getElementById("ui-lives");
const elScore = document.getElementById("ui-score");
const elStreak = document.getElementById("ui-streak");

const elIp = document.getElementById("pkt-ip");
const elProtocol = document.getElementById("pkt-protocol");
const elPort = document.getElementById("pkt-port");
const elPayload = document.getElementById("pkt-payload");

document.addEventListener("DOMContentLoaded", () => {
  setupKeyboardControls();

  setTimeout(nextPacket, 1000);
});

function nextPacket() {
  if (lives <= 0) return;

  // 1. Elegir un paquete aleatorio de la base de datos
  const randomIndex = Math.floor(Math.random() * PACKET_DATABASE.length);
  currentPacket = PACKET_DATABASE[randomIndex];

  // 2. Actualizar la UI de la tarjeta
  elIp.innerText = currentPacket.ip;
  elProtocol.innerText = currentPacket.protocol;
  elPort.innerText = currentPacket.port;
  elPayload.innerText = currentPacket.payload;

  // 3. Calcular la dificultad (El tiempo baja mientras más puntos tienes)
  currentMaxTime = Math.max(800, 3000 - score * 0.5);
  timeLeft = currentMaxTime;

  // 4. Iniciar el reloj
  startTimer();
}

function playSound(audioElement) {
  audioElement.currentTime = 0;
  audioElement
    .play()
    .catch((err) => console.log("Navegador bloqueó el audio:", err));
}

function startTimer() {
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timeLeft -= 16;

    if (timeLeft <= 0) {
      timeLeft = 0;
      updateTimerUI();
      handleTimeout();
    } else {
      updateTimerUI();
    }
  }, 16);
}

function updateTimerUI() {
  // Actualizar el texto (ej. "2.5s")
  const seconds = (timeLeft / 1000).toFixed(1);
  elTimerText.innerText = `${seconds}s`;

  // Actualizar el anillo CSS (conic-gradient)
  const percentage = (timeLeft / currentMaxTime) * 100;

  // Cambiar color a rojo si queda menos del 25% del tiempo
  const ringColor = percentage > 25 ? "#00c853" : "#ff4d6d";

  elTimerRing.style.background = `conic-gradient(${ringColor} ${percentage}%, transparent 0)`;
}

function handleTimeout() {
  clearInterval(timerInterval);
  handleDecision(false, true);
}

// ==========================================
// RESOLUCIÓN DE DECISIONES
// ==========================================

function handleDecision(isBlocking, isTimeout = false) {
  clearInterval(timerInterval);

  const isMalicious = currentPacket.isMalicious;

  if (isBlocking && isMalicious) {
    // ✅ ACIERTO: Bloqueó un ataque
    playSound(sfxSuccess); // <-- SONIDO AQUÍ
    score += 100;
    streak++;
    triggerFlash("flash-green");
  } else if (!isBlocking && !isMalicious) {
    // ✅ ACIERTO: Dejó pasar tráfico legítimo
    playSound(sfxSuccess); // <-- SONIDO AQUÍ
    score += 50;
    streak++;
  } else if (isBlocking && !isMalicious) {
    // ❌ ERROR: Falso Positivo
    playSound(sfxError); // <-- SONIDO AQUÍ
    score = Math.max(0, score - 50);
    streak = 0;
    triggerFlash("flash-red");
  } else if (!isBlocking && isMalicious) {
    // ❌ ERROR CRÍTICO: Falso Negativo
    playSound(sfxError); // <-- SONIDO AQUÍ
    lives--;
    streak = 0;
    triggerFlash("flash-red");
  }

  updateStatsUI();

  if (lives > 0) {
    setTimeout(nextPacket, 200);
  } else {
    gameOver();
  }
}

// ==========================================
// FUNCIONES DE UTILIDAD Y EFECTOS
// ==========================================
function updateStatsUI() {
  elScore.innerText = score.toString().padStart(4, "0");
  elStreak.innerText = streak;

  let livesText = "";
  for (let i = 0; i < 3; i++) {
    livesText += i < lives ? "❤️" : "🖤";
  }
  elLives.innerText = livesText;
}

function triggerFlash(className) {
  elArena.classList.remove("flash-red", "flash-green");

  void elArena.offsetWidth;
  elArena.classList.add(className);
}

function gameOver() {
  if (typeof registrarPuntajeGlobal === "function") {
    registrarPuntajeGlobal(CURRENT_GAME_ID, score);
  }
  elTimerRing.style.background = `conic-gradient(#ff4d6d 100%, transparent 0)`;
  elTimerText.innerText = "FAIL";
  elPayload.innerHTML = `<span style="color:#ff4d6d; font-size: 18px;">🔥 SYSTEM COMPROMISED 🔥</span><br><br>Puntuación Final: ${score}<br>Amenazas Detenidas: ${streak}<br><br><button class="play-btn" onclick="location.reload()">REINICIAR SISTEMA</button>`;
}

// ==========================================
// CONTROLES DE TECLADO (Modo Arcade)
// ==========================================
function setupKeyboardControls() {
  document.addEventListener("keydown", (event) => {
    if (lives <= 0) return;

    if (timeLeft <= 0 || !currentPacket) return;

    if (event.key === "ArrowLeft") {
      document.querySelector(".btn-allow").style.transform = "translateY(2px)";
      setTimeout(
        () => (document.querySelector(".btn-allow").style.transform = "none"),
        100,
      );
      handleDecision(false);
    } else if (event.key === "ArrowRight") {
      document.querySelector(".btn-block").style.transform = "translateY(2px)";
      setTimeout(
        () => (document.querySelector(".btn-block").style.transform = "none"),
        100,
      );
      handleDecision(true);
    }
  });
}
