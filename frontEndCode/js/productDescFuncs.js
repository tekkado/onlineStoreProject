
const urlSearchParams = new URLSearchParams(window.location.search);
const productName = urlSearchParams.get("name");
const productImageSrc = urlSearchParams.get("imageSrc");
const productPrice = urlSearchParams.get("price");
const productCategory = urlSearchParams.get("category");
const productBrand = urlSearchParams.get("brand");
const productDescription = urlSearchParams.get("description");

const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

// Populate the product details in the HTML
document.querySelector("h2").textContent = productName;
document.querySelectorAll("p")[0].textContent = `Price: $${productPrice}`;
document.querySelectorAll(
    "p"
)[1].textContent = `Category: ${productCategory}`;
document.querySelectorAll("p")[2].textContent = `Brand: ${productBrand}`;
document.querySelectorAll(
    "p"
)[3].textContent = `Description: ${productDescription}`;

const addToCartButton = document.getElementById("add-to-cart");
// Attach a click event listener to the "Add to Cart" button
addToCartButton.addEventListener("click", () => {
    const product = {
        name: productName,
        price: parseFloat(productPrice),
        imageSrc: productImageSrc,
        category: productCategory,
        brand: productBrand,
        description: productDescription,
    };

    const existingCartItemIndex = cartItems.findIndex(
        (cartItem) => cartItem.name === product.name
    );

    if (existingCartItemIndex !== -1) {
        // Item already exists, increase its quantity
        cartItems[existingCartItemIndex].quantity++;
    } else {
        // Item doesn't exist, add it to the cart
        product.quantity = 1;
        cartItems.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    displayCartItems();
});
