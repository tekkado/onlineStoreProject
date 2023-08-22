console.log("LogIn/Register functions triggered");

var loggedInUser = "";

function changeAccountDropdown(loggedIn) {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (loggedIn) {
        dropdownMenu.innerHTML = `
            <li><a href="#">Account Info</a></li>
            <li><a href="#">Orders</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Sign Out</a></li>
        `;
    } else {
        dropdownMenu.innerHTML = `
            <li><a href="../views/sign-in.html">Sign In</a></li>
            <li><a href="../views/register.html">Register</a></li>
        `;
    }
}

function redirectToHomePage() {
    console.log("Redirecting to homepage");
    changeAccountToUsername();
    window.location.href = "../html/index.html";
}

function changeAccountToUsername() {
    const accountLink = document.querySelector('.account');
    const storedUser = localStorage.getItem("loggedInUser");

    if (storedUser) {
        accountLink.textContent = storedUser;
        changeAccountDropdown(true); // Show account options
    } else {
        accountLink.textContent = "Account";
        changeAccountDropdown(false); // Show Sign In and Register
    }
}

//Loading footer and nav components
function loadComponent(url, containerId) {
    fetch(url)
        .then((response) => response.text())
        .then((content) => {
            const container = document.querySelector(containerId);
            container.innerHTML = content;
            changeAccountToUsername();
        })
        .catch((error) => {
            console.error("Error loading component:", error);
        });
}

loadComponent("../html/navbar.html", "#navbar-container");
loadComponent("../html/footer.html", "#footer-container");


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
                localStorage.setItem("loggedInUser", username);
                console.log("this is the username: " + username);
                console.log("Account text in navbar before update: " + document.querySelector('.account').textContent);
                changeAccountToUsername();
                console.log("this is the loggedInUser: " + localStorage.getItem("loggedInUser"));
                console.log("After update, before redirect: " + document.querySelector('.account').textContent);
                redirectToHomePage();
                console.log("After redirect: " + document.querySelector('.account').textContent);
            } else {
                console.error("Login failed!");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

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
                console.log("this is the username: " + userData.username);
                loggedInUser = userData.username;
                localStorage.setItem("loggedInUser", loggedInUser);
                changeAccountToUsername();
                console.log("this is the loggedInUser: " + loggedInUser);
                redirectToHomePage();
            }
        })
        .catch((registrationError) => {
            console.error("Error: ", registrationError);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    //LogIn Listener
    const loginForm = document.querySelector("#login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        console.log("Login form submitted");

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        loginUser(username, password);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    //Registration Listener
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
