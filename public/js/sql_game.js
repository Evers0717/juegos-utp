// js/sql_game.js

let currentLevelIdx = 0;
const CURRENT_GAME_ID = 2;
let lives = 3;
let draggedBlock = null;
let currentScore = 0;
const sfxSuccess = new Audio("../../assets/audio/correctSound.mp3");
const sfxError = new Audio("../../assets/audio/errorSound.mp3");
// ==========================================
// INICIALIZACIÓN
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  setupDragAndDrop();
  loadLevel(currentLevelIdx);
  obtenerHighScore();
});

async function obtenerHighScore() {
  if (window.electronAPI && window.electronAPI.getHighScore) {
    const record = await window.electronAPI.getHighScore(CURRENT_GAME_ID);
    document.getElementById("high-score").innerText = record || 0;
  }
}

function actualizarMarcador() {
  currentScore = currentLevelIdx * 100;
  document.getElementById("current-score").innerText = currentScore;
}
// ==========================================
// LÓGICA DE NIVELES
// ==========================================
function loadLevel(index) {
  if (index >= SQL_LEVELS.length) {
    const scoreFinal = finalizarJuegoSQL();
    printTerminal(
      `🏆 ¡FELICIDADES! Has completado todos los retos. Score: ${scoreFinal}`,
      "#00c853",
    );
    return;
  }

  const level = SQL_LEVELS[index];

  // 1. Textos UI
  document.getElementById("level-title").innerText = level.title;
  document.getElementById("task-text").innerText = level.task;
  updateLivesDisplay();

  // 2. Cargar Esquema
  const schemaPanel = document.getElementById("schema-content");
  schemaPanel.innerHTML = "";
  for (const [table, columns] of Object.entries(level.schema)) {
    schemaPanel.innerHTML += `<div style="margin-bottom: 10px;">
      <span style="color:#ffd600;">Tabla: ${table.toUpperCase()}</span><br>
      -- Columnas: ${columns.join(", ")}
    </div>`;
  }

  // 3. Generar y barajar bloques
  const palette = document.getElementById("palette-zone");
  document.getElementById("drop-zone").innerHTML = ""; // Limpiar mesa
  palette.innerHTML = "";

  // Barajar array (Algoritmo Fisher-Yates)
  const shuffledBlocks = [...level.blocks].sort(() => Math.random() - 0.5);

  shuffledBlocks.forEach((text, i) => {
    const block = document.createElement("div");
    block.className = "sql-block";
    block.innerText = text;
    block.draggable = true;
    block.id = `block-${i}`; // ID único necesario para el drag

    // Asignar colores según tipo (Opcional)
    if (
      [
        "SELECT",
        "FROM",
        "WHERE",
        "GROUP BY",
        "ORDER BY",
        "JOIN",
        "ON",
        "AND",
        "OR",
      ].includes(text)
    ) {
      block.classList.add("block-keyword");
    } else if (["=", ">", "<", ",", "*"].includes(text)) {
      block.classList.add("block-operator");
    } else {
      block.classList.add("block-table");
    }

    // Eventos Drag específicos del bloque
    block.addEventListener("dragstart", (e) => {
      draggedBlock = block;
      setTimeout(() => (block.style.opacity = "0.5"), 0);
    });

    block.addEventListener("dragend", () => {
      draggedBlock.style.opacity = "1";
      draggedBlock = null;
    });

    palette.appendChild(block);
  });

  printTerminal(
    `> Nivel ${level.level} Cargado. Construye tu consulta.`,
    "#80deea",
  );
}

// ==========================================
// DRAG AND DROP (Zonas)
// ==========================================
function setupDragAndDrop() {
  const containers = [
    document.getElementById("drop-zone"),
    document.getElementById("palette-zone"),
  ];

  containers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      e.preventDefault(); // Necesario para permitir el "drop"
      container.classList.add("drag-over");
    });

    container.addEventListener("dragleave", () => {
      container.classList.remove("drag-over");
    });

    container.addEventListener("drop", (e) => {
      e.preventDefault();
      container.classList.remove("drag-over");
      if (draggedBlock) {
        container.appendChild(draggedBlock);
      }
    });
  });
}

// ==========================================
// VALIDACIÓN DEL JUEGO
// ==========================================
function checkQuery() {
  if (lives <= 0) return;

  const dropZone = document.getElementById("drop-zone");
  const blocks = Array.from(dropZone.children);

  if (blocks.length === 0) {
    playSound(sfxError);
    printTerminal("⚠️ La zona de ensamblaje está vacía.", "#ff4d6d");
    return;
  }

  const userQuery = blocks.map((b) => b.innerText.trim()).join(" ");
  const expectedQueries = SQL_LEVELS[currentLevelIdx].expected;

  printTerminal(`> Ejecutando: ${userQuery}`, "#ccc");

  const isCorrect = Array.isArray(expectedQueries)
    ? expectedQueries.includes(userQuery)
    : userQuery === expectedQueries;

  if (isCorrect) {
    playSound(sfxSuccess);
    currentLevelIdx++;
    actualizarMarcador();

    printTerminal("✅ ¡CONSULTA EXITOSA!", "#00c853");
    setTimeout(() => loadLevel(currentLevelIdx), 1500);
  } else {
    // ❌ FALLO
    playSound(sfxError);
    lives--;
    updateLivesDisplay();
    printTerminal(
      `❌ ERROR DE SINTAXIS O LÓGICA. Intenta de nuevo.`,
      "#ff4d6d",
    );

    dropZone.style.borderColor = "#ff4d6d";
    setTimeout(
      () => (dropZone.style.borderColor = "rgba(255,255,255,0.2)"),
      500,
    );

    if (lives <= 0) {
      manejarGameOverSQL();
      printTerminal("💀 GAME OVER. Has perdido todas tus vidas.", "#ff4d6d");
    }
  }
}

function resetBlocks() {
  const dropZone = document.getElementById("drop-zone");
  const palette = document.getElementById("palette-zone");
  while (dropZone.firstChild) {
    palette.appendChild(dropZone.firstChild);
  }
}

function updateLivesDisplay() {
  document.getElementById("lives-display").innerText =
    "❤️".repeat(lives) + "🖤".repeat(3 - lives);
}

function printTerminal(msg, color) {
  const terminal = document.getElementById("terminal-output");
  terminal.innerHTML = `<span style="color: ${color}">${msg}</span>`;
}

function playSound(audioElement) {
  try {
    audioElement.currentTime = 0;
    audioElement.play().catch((e) => console.warn("Audio bloqueado:", e));
  } catch (e) {
    console.error("Error al reproducir audio:", e);
  }
}

function finalizarJuegoSQL() {
  const puntosPorNivel = 100;
  const bonoVidas = lives * 50;
  const puntajeTotal = currentLevelIdx * puntosPorNivel + bonoVidas;

  if (typeof registrarPuntajeGlobal === "function") {
    registrarPuntajeGlobal(CURRENT_GAME_ID, puntajeTotal);
  }

  return puntajeTotal;
}

function manejarGameOverSQL() {
  const puntajeConsolacion = currentLevelIdx * 50;

  if (typeof registrarPuntajeGlobal === "function") {
    registrarPuntajeGlobal(CURRENT_GAME_ID, puntajeConsolacion);
  }
}
