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
  const li = document.createElement("li");

  li.appendChild(
    document.createTextNode(`${message.content} - ${message.from}`)
  );

  return li;
}
