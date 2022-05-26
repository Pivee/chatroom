const socket = io("http://localhost:4000");

socket.on("updateMessageThread", ({ data }) => {
  console.log("Data Received", data);
  handleNewMessage(data);
});

/**
 * Used in `index.html`
 */
function handleSubmitNewMessage(message) {
  const messageElement = document.getElementById("message");
  if (!message) message = messageElement.value;

  const usernameElement = document.getElementById("username");
  username = usernameElement.value === "" ? socket.id : usernameElement.value;

  socket.emit("createMessage", {
    data: {
      from: username,
      content: message,
    },
  });
}

function handleFormSubmitFunction(event) {
  event.preventDefault();
}

function handleNewMessage(message) {
  const messagesList = document.getElementById("messages");

  messagesList.appendChild(buildNewMessage(message));
}

function buildNewMessage(message) {
  const divMessageBox = document.createElement("div");
  divMessageBox.className = "message-box";

  const divMessage = document.createElement("div");
  divMessage.className = "message-content";



  if (message.from === socket.id) {
    divMessageBox.style.cssText = "display: flex; justify-content: flex-end";
    divMessage.classList.add("own-message");
  }

  divMessage.appendChild(
    document.createTextNode(`${message.content} - ${message.from}`)
  );

  divMessageBox.appendChild(divMessage);

  return divMessageBox;
}
