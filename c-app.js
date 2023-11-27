import {
    ref,
    push,
    onChildAdded,
    getDatabase,
  } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBNBqJA2hIwjtDdUCc1JoXbMCxib_XkoFI",
    authDomain: "hsr-gi.firebaseapp.com",
    projectId: "hsr-gi",
    storageBucket: "hsr-gi.appspot.com",
    messagingSenderId: "392973251153",
    appId: "1:392973251153:web:f1eb4289a7fad778a8be70",
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  // APP
  const cekName = localStorage.getItem("name");
  const username = document.getElementById("username");
  const btnUser = document.getElementById("btn-user");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");
  const logoutButton = document.getElementById("logout-button");
  const messageContainer = document.getElementById("messages");
  if (!cekName) {
    username.removeAttribute("hidden");
    btnUser.removeAttribute("hidden");
  } else {
    logoutButton.removeAttribute("disabled", true);
    sendButton.removeAttribute("disabled", true);
  }

  document.addEventListener("DOMContentLoaded", () => {
    // GET NAME FOR USING IN CHAT
    const savedName = localStorage.getItem("name");

    // Check if there is a saved name in localStorage
    if (!savedName) {
      // Handle Enter key press event on the username input
      username.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          const newName = username.value.trim();
          if (newName) {
            // Save the new name to localStorage and reload the page
            localStorage.setItem("name", newName);
            window.location.reload();
          }
        }
      });

      // Handle click event on the username button
      btnUser.addEventListener("click", () => {
        const newName = username.value.trim();
        if (newName) {
          // Save the new name to localStorage and reload the page
          localStorage.setItem("name", newName);
          window.location.reload();
        }
      });
    }

    // Handle click event on the logout button
    logoutButton.addEventListener("click", () => {
      // Remove the name from localStorage and reload the page
      localStorage.removeItem("name");
      window.location.reload();
    });

    // ADD MESSAGE ON DATABASE
    const sendMessage = () => {
      const name = localStorage.getItem("name");
      const message = messageInput.value.trim();

      if (name && message) {
        // Push the message data to the database
        const messagesRef = ref(db, "messages");
        push(messagesRef, {
          name: name,
          message: message,
          timestamp: new Date().getTime(),
        });
        messageInput.value = "";
      }
    };

    // Handle click event on the send button
    sendButton.addEventListener("click", sendMessage);

    // Handle Enter key press event on the message input
    messageInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        sendMessage();
      }
    });

    // ADD MESSAGE FUNCTION
    const addMessage = (name, message) => {
      // Create a div element for the message
      const messageDiv = document.createElement("div");
      messageDiv.innerHTML = `<b>${name}:</b> ${message}`;

      // Append the message div to the message container
      messageContainer.appendChild(messageDiv);

      // Scroll to the bottom of the message container
      messageContainer.scrollTop = messageContainer.scrollHeight;

      // Find Admin
      const admin = localStorage.getItem("admin");
      const admin2 = name === "admin";
      if (admin || admin2) {
        // Add the admin class to the message div
        messageDiv.classList.add("admin");
      }
    };

    // Get the messages reference from the database
    const messagesRef = ref(db, "messages");

    // Listen for child added event on the messages reference
    onChildAdded(messagesRef, (snapshot) => {
      const messageData = snapshot.val();
      // Add the message to the message container
      addMessage(messageData.name, messageData.message);
    });
  });
