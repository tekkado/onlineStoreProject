document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    console.log("Form submitted");

    const userData = {
      email: document.getElementById("email").value,
      firstName: document.getElementById("first-name").value,
      lastName: document.getElementById("last-name").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };

    registerUser(userData);
  });
});

function registerUser(userData) {
  const apiUrl = "http://localhost:8080/api/users/register";
  console.log("Starting registration...");

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .catch((jsonError) => {
      console.error("JSON parsing error:", jsonError);
    })
    .then((data) => {
      console.log("Registration response: ", data);
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const userId = data.userId;
      const updateCartUrl = `http://localhost:8080/api/users/${userId}/cart`;
      console.log("Registration Successful");
      
      fetch(updateCartUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItems),
      })
        .then((response) => response.text())
        .then((updateCartData) => {
          console.log(updateCartData);

          localStorage.removeItem("cart");

          window.location.href = "/frontEndCode/html/index.html";
        })
        .catch((updateCartError) => {
          console.error("Error updating cart:", updateCartError);
        });
    })
    .catch((registrationError) => {
      console.error("Error: ", registrationError);
    });
}

// Function to handle user login
function loginUser(username, password) {
  const userData = {
    username: username,
    password: password,
  };

  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Login successful");
      } else {
        console.error("Login failed");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
