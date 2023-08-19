function redirectToHomePage() {
    window.location.href = "../html/index.html";
}

function updateDropdownMenu(authenticated) {
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const dropdownItems = dropdownMenu.querySelectorAll("li");

    dropdownItems[2].style.display = authenticated ? "none" : "block";
    dropdownItems[3].style.display = authenticated ? "none" : "block";

    dropdownItems[4].style.display = authenticated ? "block" : "none"; // Account Info
    dropdownItems[5].style.display = authenticated ? "block" : "none"; // Orders
    dropdownItems[6].style.display = authenticated ? "block" : "none"; // Settings
    dropdownItems[7].style.display = authenticated ? "block" : "none"; // Sign Out
}

// Function to handle user login
function loginUser(username, password) {
    console.log("Login processing...");

    const userData = {
        username: username,
        password: password,
    };

    fetch("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })
        .then((response) => response.text())
        .then((data) => {
            if (data === "Login successful.") {
                localStorage.setItem("isLoggedIn", "true");
                updateDropdownMenu(true);
                redirectToHomePage();

                console.log("Login successful");
            } else {
                console.error("Login failed!");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        console.log("Login form submitted");

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        loginUser(username, password);
    });
});

// Function to handle user registration
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
        .then((response) => response.text())
        .then((data) => {
            console.log("Registration response: ", data);

            if (data === "User registered and logged in successfully.") {
                const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
                const userId = data.userId;
                const updateCartUrl = `http://localhost:8080/api/users/${userId}/cart`;
                redirectToHomePage();

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
                        updateDropdownMenu(true);
                    })
                    .catch((updateCartError) => {
                        console.error("Error updating cart:", updateCartError);
                    });
            }
        })
        .catch((registrationError) => {
            console.error("Error: ", registrationError);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.querySelector("#register-form");

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        console.log("Registration form submitted");

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
