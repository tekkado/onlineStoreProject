const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const totalPriceValue = document.getElementById("total-price-value");

const streetInput = document.getElementById("street");
const provinceInput = document.getElementById("province");
const countryInput = document.getElementById("country");
const zipInput = document.getElementById("zip");
const phoneInput = document.getElementById("phone");

const streetError = document.getElementById("street-error");
const provinceError = document.getElementById("province-error");
const countryError = document.getElementById("country-error");
const zipError = document.getElementById("zip-error");
const phoneError = document.getElementById("phone-error");

function validateForm() {
    let valid = true;

    if (streetInput.value.trim() === "") {
        streetError.style.display = "block";
        valid = false;
    } else {
        streetError.style.display = "none";
    }

    if (provinceInput.value.trim() === "") {
        provinceError.style.display = "block";
        valid = false;
    } else {
        provinceError.style.display = "none";
    }

    if (countryInput.value.trim() === "") {
        countryError.style.display = "block";
        valid = false;
    } else {
        countryError.style.display = "none";
    }

    if (zipInput.value.trim() === "") {
        zipError.style.display = "block";
        valid = false;
    } else {
        zipError.style.display = "none";
    }

    if (phoneInput.value.trim() === "") {
        phoneError.style.display = "block";
        valid = false;
    } else {
        phoneError.style.display = "none";
    }
    if (!valid) {
        alert("Please fill in empty fields!")
    }
    return valid;
}

function populateCheckoutTable() {
    const cartTableBody = document.getElementById("cart-products");

    cartItems.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>${item.price}</td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                    `;
        cartTableBody.appendChild(row);
    });
    updateTotalPrice();
}

window.onload = populateCheckoutTable;

function validateCardNumber(cardNumber) {
    return /^\d{16}$/.test(cardNumber);
}

const cardNumberInput = document.getElementById("card-number");
const confirmOrderButton = document.getElementById(
    "confirm-order-button"
);
const cardError = document.getElementById("card-error");

confirmOrderButton.addEventListener("click", function (event) {
    event.preventDefault();
    cardError.style.display = "none";

    const isValidCardNumber = validateCardNumber(cardNumberInput.value);
    const isFormValid = validateForm();

    if (!isValidCardNumber) {
        cardError.style.display = "block";
    }

    if (isFormValid && isValidCardNumber) {
        const loggedInUser = localStorage.getItem("loggedInUser");
        const checkoutData = JSON.parse(localStorage.getItem("checkoutData")) || [];

        const checkout = { username: loggedInUser, items: cartItems };
        checkoutData.push(checkout);

        localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

        localStorage.removeItem("cart");
        window.location.href = "../html/index.html?orderSuccess=true";
    }
});

cardNumberInput.addEventListener("input", function () {
    const isValidCardNumber = validateCardNumber(cardNumberInput.value);

    if (isValidCardNumber) {
        cardError.style.display = "none";
    }
});

function updateTotalPrice() {
    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    totalPriceValue.textContent = `$${totalPrice.toFixed(2)}`;
}
