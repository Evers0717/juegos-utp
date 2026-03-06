let currentQuestionIndex = 0;
let currentQuestions = [];
let isAnswering = false;

let quizTimer;
let quizTimeLeft;
const TIEMPO_POR_PREGUNTA = 10;

const JOB_TITLES = [
  "LVL 0 Rookie",
  "Pasante (Nivel 2)",
  "Pasante (Nivel 3)",
  "Pasante (Nivel 4)",
  "Code Viber",
  "Dev Junior (Nivel 1)",
  "Dev Junior (Nivel 2)",
  "Dev Junior (Nivel 3)",
  "Dev Junior (Nivel 4)",
  "Dev Semi-Senior",
  "Dev Senior (Nivel 1)",
  "Dev Senior (Nivel 2)",
  "Tech Lead",
  "Arquitecto de Software",
  "LEVEL 100 BOSS",
];

const sfxCorrect = new Audio("../../assets/audio/correctSound.mp3");
const sfxWrong = new Audio("../../assets/audio/errorSound.mp3");

function startQuizTimer() {
  clearInterval(quizTimer);
  quizTimeLeft = TIEMPO_POR_PREGUNTA;

  const ring = document.getElementById("quiz-timer-ring");
  const text = document.getElementById("quiz-timer-text");

  ring.style.background = `conic-gradient(#00bcd4 100%, transparent 0)`;
  text.innerText = quizTimeLeft;

  quizTimer = setInterval(() => {
    quizTimeLeft--;
    text.innerText = quizTimeLeft;

    const porcentaje = (quizTimeLeft / TIEMPO_POR_PREGUNTA) * 100;
    const color = quizTimeLeft <= 10 ? "#ff4d6d" : "#00bcd4";
    ring.style.background = `conic-gradient(${color} ${porcentaje}%, transparent 0)`;

    if (quizTimeLeft <= 0) {
      clearInterval(quizTimer);
      evaluarRespuesta(-1, document.createElement("div"));
    }
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  iniciarPartida();
});

function iniciarPartida() {
  currentQuestionIndex = 0;
  isAnswering = false;
  const faciles = QUIZ_DATABASE.filter((q) => q.difficulty === "facil");
  const intermedias = QUIZ_DATABASE.filter(
    (q) => q.difficulty === "intermedio",
  );
  const dificiles = QUIZ_DATABASE.filter((q) => q.difficulty === "dificil");

  currentQuestions = [
    ...barajarArray(faciles).slice(0, 5),
    ...barajarArray(intermedias).slice(0, 5),
    ...barajarArray(dificiles).slice(0, 5),
  ];
  mostrarPregunta();
}

function mostrarPregunta() {
  isAnswering = false;
  const qData = currentQuestions[currentQuestionIndex];

  document.getElementById("rango-actual").innerText =
    JOB_TITLES[currentQuestionIndex];
  document.getElementById("pregunta-numero").innerText =
    `Pregunta ${currentQuestionIndex + 1} de 15`;
  document.getElementById("pregunta-texto").innerText = qData.question;

  const opcionesContenedor = document.getElementById("opciones-contenedor");
  opcionesContenedor.innerHTML = "";

  qData.options.forEach((opcion, index) => {
    const btn = document.createElement("button");
    btn.className = "btn-opcion";
    const letra = String.fromCharCode(65 + index);
    btn.innerHTML = `<span class="letra">${letra}:</span> ${opcion}`;
    btn.onclick = () => evaluarRespuesta(index, btn);
    opcionesContenedor.appendChild(btn);
  });

  actualizarEscaleraVisual();
  startQuizTimer();
}

function evaluarRespuesta(selectedIndex, botonSeleccionado) {
  if (isAnswering) return;
  isAnswering = true;

  clearInterval(quizTimer);

  const qData = currentQuestions[currentQuestionIndex];
  const esCorrecta = selectedIndex === qData.correctIndex;

  botonSeleccionado.classList.add("seleccionado");

  setTimeout(() => {
    if (esCorrecta) {
      playSound(sfxCorrect);
      botonSeleccionado.classList.remove("seleccionado");
      botonSeleccionado.classList.add("correcta");
      setTimeout(avanzarNivel, 1500);
    } else {
      playSound(sfxWrong);
      botonSeleccionado.classList.remove("seleccionado");
      botonSeleccionado.classList.add("incorrecta");
      const botones = document.querySelectorAll(".btn-opcion");
      if (qData) botones[qData.correctIndex].classList.add("correcta");
      setTimeout(gameOver, 2000);
    }
  }, 1000);
}

function actualizarEscaleraVisual() {
  const ladderList = document.getElementById("ladder-list");
  if (ladderList.children.length === 0) {
    JOB_TITLES.forEach((titulo, index) => {
      const li = document.createElement("li");
      li.className = "ladder-step";
      li.id = `ladder-step-${index}`;
      if (index === 4 || index === 9 || index === 14)
        li.classList.add("milestone");
      li.innerHTML = `<span class="num">${index + 1}</span> <span>${titulo}</span>`;
      ladderList.appendChild(li);
    });
  }

  JOB_TITLES.forEach((_, index) => {
    const li = document.getElementById(`ladder-step-${index}`);
    li.classList.remove("active", "passed");
    if (index === currentQuestionIndex) li.classList.add("active");
    else if (index < currentQuestionIndex) li.classList.add("passed");
  });
}

function avanzarNivel() {
  currentQuestionIndex++;
  if (currentQuestionIndex >= currentQuestions.length) pantallaVictoria();
  else mostrarPregunta();
}

function barajarArray(array) {
  let arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function playSound(audioEl) {
  try {
    audioEl.currentTime = 0;
    audioEl.play().catch(() => {});
  } catch (e) {}
}
function gameOver() {
  // Limpiamos el timer por seguridad
  clearInterval(quizTimer);

  const rangoAlcanzado = JOB_TITLES[currentQuestionIndex];
  let mensaje = "La entrevista no salió como esperábamos...";

  // Mensajes dinámicos según el progreso
  if (currentQuestionIndex >= 10) {
    mensaje = "¡Increíble! Casi llegas a la cima. Eres un Senior de respeto.";
  } else if (currentQuestionIndex >= 5) {
    mensaje = "Buen intento, al menos ya no eres un Rookie.";
  }

  // Inyectamos la pantalla de Game Over en el contenedor principal
  document.getElementById("juego-arena").innerHTML = `
    <div class="game-over-screen" style="text-align: center; padding: 40px;">
      <h2 style="color: #ff4d6d; font-size: 45px; text-shadow: 0 0 15px rgba(255,77,109,0.5);">ENTREVISTA FALLIDA</h2>
      <p style="font-size: 20px; color: #fff;">Rango alcanzado: <span style="color: #00bcd4;">${rangoAlcanzado}</span></p>
      <p style="color: #aaa; margin-bottom: 30px;">${mensaje}</p>
      <button class="btn-comodin" onclick="location.reload()" style="font-size: 18px; padding: 15px 30px;">
        REINTENTAR PROCESO
      </button>
    </div>
  `;
}

function pantallaVictoria() {
  clearInterval(quizTimer);
  playSound(sfxCorrect);

  document.getElementById("juego-arena").innerHTML = `
    <div class="victory-screen" style="text-align: center; padding: 40px;">
      <h2 style="color: #00c853; font-size: 45px; text-shadow: 0 0 15px rgba(0,200,83,0.5);">¡CONTRATADO!</h2>
      <h3 style="color: #ffd600;">NIVEL: ${JOB_TITLES[currentQuestions.length - 1]}</h3>
      <p style="color: #fff; margin-top: 20px;">Has demostrado ser el desarrollador definitivo.</p>
      <button class="btn-comodin" onclick="location.reload()" style="margin-top: 30px; font-size: 18px; border-color: #00c853; color: #00c853;">
        CELEBRAR Y REINICIAR
      </button>
    </div>
  `;
}
