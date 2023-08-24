
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const totalPriceValue = document.getElementById("total-price-value");

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

    if (!isValidCardNumber) {
        cardError.style.display = "block";
    } else {
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
