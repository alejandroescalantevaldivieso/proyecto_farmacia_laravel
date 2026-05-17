document.addEventListener("DOMContentLoaded", () => {

  const chatToggle = document.getElementById("chat-toggle");
  const chatWindow = document.getElementById("chat-window");
  const closeChat = document.getElementById("close-chat");
  const sendBtn = document.getElementById("send-btn");
  const chatInput = document.getElementById("chat-input");
  const chatBody = document.getElementById("chat-body");

  // Abrir chat
  chatToggle.addEventListener("click", () => {
    chatWindow.style.display = "flex";
  });

  // Cerrar chat
  closeChat.addEventListener("click", () => {
    chatWindow.style.display = "none";
  });

  // Enviar mensaje
  sendBtn.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  chatInput.value = "";

  fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content")
    },
    body: JSON.stringify({ message: text })
  })
    .then(res => res.json())
    .then(data => {
      addMessage(data.reply, "bot");
    })
    .catch(() => {
      addMessage("Error al conectar con el servidor", "bot");
    });
}


  function addMessage(text, type) {
    const div = document.createElement("div");
    div.classList.add("message", type);
    div.textContent = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

});
