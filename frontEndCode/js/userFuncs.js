var loggedInUser = "";

function redirectToHomePage() {
    window.location.href = `../html/index.html?username=${username}`;
}

function updateAccountLink() {
    const accountLink = document.querySelector('.account');
    const urlParams = new URLSearchParams(window.location.search);
    const loggedUser = urlParams.get('username');

    if (loggedUser) {
        accountLink.textContent = loggedUser;
    } else {
        accountLink.textContent = "Account";
    }
}

//Loading footer and nav components
function loadComponent(url, containerId) {
    fetch(url)
        .then((response) => response.text())
        .then((content) => {
            const container = document.querySelector(containerId);
            container.innerHTML = content;
        })
        .catch((error) => {
            console.error("Error loading component:", error);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    loadComponent("../html/navbar.html", "#navbar-container");
    loadComponent("../html/footer.html", "#footer-container");
});

// Function to handle user login
function loginUser(username, password) {
    const apiUrl = "http://localhost:8080/api/users/login";
    console.log("Login processing...");

    const userData = {
        username: username,
        password: password,
    };

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })
        .then((response) => response.text())
        .then((data) => {
            console.log("Login response: " + data);
            if (data === "Login successful.") {
                console.log("this is the username: " + username);
                updateAccountLink();
                redirectToHomePage();
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
                updateAccountLink()
                redirectToHomePage();

                // fetch(updateCartUrl, {
                //     method: "PUT",
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                //     body: JSON.stringify(cartItems),
                // })
                //     .then((response) => response.text())
                //     .then((updateCartData) => {
                //         console.log(updateCartData);

                //         localStorage.removeItem("cart");
                //         updateDropdownMenu(true);
                //     })
                //     .catch((updateCartError) => {
                //         console.error("Error updating cart:", updateCartError);
                //     });
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
