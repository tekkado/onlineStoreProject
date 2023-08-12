function registerUser(userData) {
    const apiUrl = "http://localhost:8080/api/register";
    
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })
    .then((response) => response.text())
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error("Error:", error);
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

document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const userData = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
        };

        registerUser(userData);
    });
});

export { registerUser, loginUser };
