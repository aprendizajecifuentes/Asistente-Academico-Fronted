// Objeto global para almacenar la selección del usuario
let userData = {};

/**
 * Cambia entre pasos y guarda datos parciales
 */
function nextStep(stepId, data) {
  Object.assign(userData, data);

  // Ocultar todos los pasos
  document
    .querySelectorAll(".step")
    .forEach((s) => s.classList.remove("active"));

  // Mostrar el paso actual
  const next = typeof stepId === "number" ? "step-" + stepId : stepId;
  document.getElementById(next).classList.add("active");

  // Si llegamos al chat, renderizar info final
  if (stepId === 5) renderChatSummary();
}

/**
 * Valida y guarda el ID del usuario
 */
function saveId() {
  const val = document.getElementById("user-id").value;
  if (!val.trim()) {
    alert("Por favor, ingresa tu identificación.");
    return;
  }
  nextStep(3, { id: val });
}

/**
 * Procesa la selección de la materia y decide el flujo (Docente vs Estudiante)
 */
function processMateriaSelection() {
  const materia = document.getElementById("select-materia").value;

  if (!materia) {
    alert("Selecciona una materia para continuar.");
    return;
  }

  userData.materia = materia;

  if (userData.rol === "Docente") {
    document.getElementById("display-materia").innerText = materia;
    nextStep("step-docente-upload", {});
  } else {
    document.getElementById(
      "consulta-intro"
    ).innerText = `Estás consultando como estudiante de ${materia}`;
    nextStep(4, {});
  }
}

/**
 * Muestra un resumen visual en la pantalla de chat
 */
function renderChatSummary() {
  document.getElementById("final-materia").innerText = userData.materia;
  const infoDiv = document.getElementById("chat-info");

  infoDiv.innerHTML = `
        <span class="tag">👤 ${userData.rol}</span>
        <span class="tag">🆔 ${userData.id}</span>
        <span class="tag">📝 ${userData.tipo}</span>
    `;
}

/**
 * Simula el envío de un mensaje en la interfaz
 */
function sendMessage() {
  const input = document.getElementById("user-input");
  const chatWindow = document.getElementById("chat-window");
  const message = input.value.trim();

  if (message === "") return;

  // Crear el globo de mensaje del usuario
  const userDiv = document.createElement("div");
  userDiv.style.cssText =
    "background: #dcfce7; padding: 10px; border-radius: 10px; margin-bottom: 10px; align-self: flex-end; border-right: 4px solid #10b981; margin-left: 20px;";
  userDiv.innerHTML = `<b>Tú:</b> ${message}`;

  chatWindow.appendChild(userDiv);

  // Limpiar input y hacer scroll al final
  input.value = "";
  chatWindow.scrollTop = chatWindow.scrollHeight;

  // Simulación de respuesta automática (esto se conectará a la IA después)
  setTimeout(() => {
    const botDiv = document.createElement("div");
    botDiv.className = "bot-msg";
    botDiv.style.marginBottom = "10px";
    botDiv.innerHTML = `<b>Bot:</b> Recibido. Estoy analizando tu consulta sobre <b>${userData.materia}</b>...`;
    chatWindow.appendChild(botDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 1000);
}
