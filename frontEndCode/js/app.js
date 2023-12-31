const urlParams = new URLSearchParams(window.location.search);
const orderSuccessParam = urlParams.get("orderSuccess");

if (orderSuccessParam === "true") {
  const successMessage = document.getElementById("success-message");
  if (successMessage) {
    successMessage.style.display = "block";
  }
}

console.log("Product functions + DOMContentLoaded triggered");
document.addEventListener("DOMContentLoaded", () => {
  let originalProducts = [];
  function fetchProducts(callback) {
    const apiUrl = "http://localhost:8080/api/products";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((products) => {
        originalProducts = products;
        callback(products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  let currentSlideIndex = 0;
  const productsPerPage = 3;

  function createFeaturedSlideList(products, start, end) {
    const featuredContainer = document.getElementById("featured-container");
    featuredContainer.innerHTML = "";

    for (let i = start; i < end; i++) {
      const productLink = document.createElement("a");
      productLink.className = "slideCardLink";
      productLink.href = `../views/product.html?name=${encodeURIComponent(
        products[i].name
      )}&imageSrc=${encodeURIComponent(
        products[i].imageSrc
      )}&price=${encodeURIComponent(
        products[i].price
      )}&category=${encodeURIComponent(
        products[i].category
      )}&brand=${encodeURIComponent(
        products[i].brand
      )}&description=${encodeURIComponent(products[i].description)}`;

      const productCard = document.createElement("div");
      productCard.className = "slideCard";

      const productName = document.createElement("p");
      productName.textContent = products[i].name;

      const productPrice = document.createElement("p");
      productPrice.className = "price";
      productPrice.textContent = `$${products[i].price}`;

      productCard.appendChild(productName);
      productCard.appendChild(productPrice);

      productLink.appendChild(productCard);
      featuredContainer.appendChild(productLink);
    }
  }

  function displaySlide(products, startIndex) {
    const endIndex = startIndex + productsPerPage;
    createFeaturedSlideList(products, startIndex, endIndex);
  }

  function prevSlide(products) {
    currentSlideIndex =
      (currentSlideIndex - productsPerPage + products.length) % products.length;
    displaySlide(products, currentSlideIndex);
  }

  function nextSlide(products) {
    currentSlideIndex = (currentSlideIndex + productsPerPage) % products.length;
    displaySlide(products, currentSlideIndex);
  }

  function fetchAndInitializeProducts() {
    //this is just for feature slide on home page
    fetchProducts((products) => {
      const firstSixProducts = products.slice(0, 6);
      displaySlide(firstSixProducts, currentSlideIndex);

      const prevArrow = document.querySelector(".prev-arrow");
      const nextArrow = document.querySelector(".next-arrow");

      prevArrow.addEventListener("click", () => prevSlide(firstSixProducts));
      nextArrow.addEventListener("click", () => nextSlide(firstSixProducts));
    });
  }

  fetchAndInitializeProducts();

  const catalogProdPerPage = 12;
  let currentPage = 1;
  let products = [];

  function displayProducts(startIndex, endIndex) {
    const productContainer = document.querySelector(".product-list");
    productContainer.innerHTML = "";

    for (let i = startIndex; i < endIndex; i++) {
      const product = products[i];

      if (!product) {
        break;
      }

      const productCard = document.createElement("div");
      productCard.className = "product-card";

      const image = document.createElement("img");
      image.src = product.imageSrc;
      image.alt = product.name;

      const title = document.createElement("h3");
      title.textContent = product.name;

      const price = document.createElement("p");
      price.className = "price";
      price.textContent = `$${product.price.toFixed(2)}`;

      productCard.appendChild(image);
      productCard.appendChild(title);
      productCard.appendChild(price);

      productCard.addEventListener("click", () => {
        const queryParams = new URLSearchParams();
        queryParams.append("name", product.name);
        queryParams.append("imageSrc", product.imageSrc);
        queryParams.append("price", product.price);
        queryParams.append("category", product.category);
        queryParams.append("brand", product.brand);
        queryParams.append("description", product.description);

        window.location.href = `../views/product.html?${queryParams.toString()}`;
      });

      productContainer.appendChild(productCard);
    }
  }

  function updatePaginationButtons() {
    const prevButton = document.querySelector("#prev-catalog-arrow");
    const nextButton = document.querySelector("#next-catalog-arrow");

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = products.length <= currentPage * catalogProdPerPage;
  }

  function loadPage(page) {
    currentPage = page;
    const startIndex = (page - 1) * catalogProdPerPage;
    const endIndex = startIndex + catalogProdPerPage;
    displayProducts(startIndex, endIndex);
    updatePaginationButtons();
  }

  const prevButton = document.querySelector("#prev-catalog-arrow");
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      loadPage(currentPage - 1);
    }
  });

  const nextButton = document.querySelector("#next-catalog-arrow");
  nextButton.addEventListener("click", () => {
    loadPage(currentPage + 1);
  });

  fetchProducts((fetchedProducts) => {
    products = fetchedProducts;
    loadPage(currentPage);
  });

  function clearFilters() {
    // how to go back to the initail catalog view
    const categoryLinks = document.querySelectorAll(".filter-category");
    const brandLinks = document.querySelectorAll(".filter-brand");

    categoryLinks.forEach((link) => link.classList.remove("selected"));
    brandLinks.forEach((link) => link.classList.remove("selected"));

    fetchProducts((fetchedProducts) => {
      products = fetchedProducts;
      sortedProducts = products.slice().sort((a, b) => a.id - b.id);
      loadPage(currentPage);
    });
  }

  const clearFiltersButton = document.querySelector("#clear-filters");
  clearFiltersButton.addEventListener("click", () => {
    console.log("Clear Filters button clicked");
    clearFilters();
  });

  function sortProductsByPrice(products) {
    return products.slice().sort((a, b) => a.price - b.price);
  }

  function sortProductsByName(products) {
    return products.slice().sort((a, b) => a.name.localeCompare(b.name));
  }

  const sortPriceBtn = document.querySelector("#sort-price");
  const sortNameBtn = document.querySelector("#sort-name");

  let priceSortOrder = "asc";
  let nameSortOrder = "asc";

  sortPriceBtn.addEventListener("click", () => {
    if (priceSortOrder === "asc") {
      products = sortProductsByPrice(products);
      priceSortOrder = "desc";
    } else {
      products = sortProductsByPrice(products).reverse();
      priceSortOrder = "asc";
    }
    nameSortOrder = "asc";
    loadPage(currentPage);
  });

  sortNameBtn.addEventListener("click", () => {
    if (nameSortOrder === "asc") {
      products = sortProductsByName(products);
      nameSortOrder = "desc";
    } else {
      products = sortProductsByName(products).reverse();
      nameSortOrder = "asc";
    }
    priceSortOrder = "asc";
    loadPage(currentPage);
  });

  console.log("Fetching unique categories and brands...");
  function fetchUniqueCategoriesAndBrands(callback) {
    // getting brands and categories
    const apiUrl =
      "http://localhost:8080/api/products/unique-categories-brands";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched unique categories and brands: ", data);
        callback(data);
      })
      .catch((error) => {
        console.error("Error fetching unique categories and brands:", error);
      });
  }

  fetchUniqueCategoriesAndBrands((data) => {
    const categoriesDropdown = document.getElementById("category-dropdown");
    const brandsDropdown = document.getElementById("brand-dropdown");

    const categories = new Set();
    const brands = new Set();

    data.forEach((item) => {
      if (item.category) categories.add(item.category);
      if (item.brand) brands.add(item.brand);
    });

    categories.forEach((category) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#";
      a.className = "filter-category";
      a.dataset.category = category;
      a.textContent = category;
      li.appendChild(a);
      categoriesDropdown.appendChild(li);
    });

    brands.forEach((brand) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#";
      a.className = "filter-brand";
      a.dataset.brand = brand;
      a.textContent = brand;
      li.appendChild(a);
      brandsDropdown.appendChild(li);
    });
  });

  // -- category and brand --

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("filter-category")) {
      event.preventDefault();
      const selectedCategory = event.target.dataset.category;
      clearBrandFilter();
      filterByCategory(selectedCategory);

      toggleSelectedClass(event.target, "filter-category");
    }

    if (event.target.classList.contains("filter-brand")) {
      event.preventDefault();
      const selectedBrand = event.target.dataset.brand;
      clearCategoryFilter();
      filterByBrand(selectedBrand);

      toggleSelectedClass(event.target, "filter-brand");
    }
  });

  function toggleSelectedClass(targetElement, className) {
    const elementsWithClass = document.querySelectorAll(`.${className}`);

    elementsWithClass.forEach((element) => {
      element.classList.remove("selected");
    });

    targetElement.classList.add("selected");
  }

  function clearCategoryFilter() {
    const categoryLinks = document.querySelectorAll(".filter-category");
    categoryLinks.forEach((link) => link.classList.remove("active"));
    loadPage(currentPage);
  }

  function clearBrandFilter() {
    const brandLinks = document.querySelectorAll(".filter-brand");
    brandLinks.forEach((link) => link.classList.remove("active"));
    loadPage(currentPage);
  }

  function filterByCategory(category) {
    if (!category) {
      loadPage(currentPage);
      return;
    }
    const filteredProducts = originalProducts.filter(
      (product) => product.category === category
    );
    loadFilteredProducts(filteredProducts);
  }

  function filterByBrand(brand) {
    if (!brand) {
      loadPage(currentPage);
      return;
    }
    const filteredProducts = originalProducts.filter(
      (product) => product.brand === brand
    );
    loadFilteredProducts(filteredProducts);
  }

  function loadFilteredProducts(filteredProducts) {
    products = filteredProducts;
    currentSlideIndex = 0;
    loadPage(1);
  }
});

// -- cart js --
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const cartItemsContainer = document.getElementById("cart-items");
const emptyCartMessage = document.getElementById("empty-cart-message");
const tableHead = document.querySelector("thead");
const totalElement = document.querySelector(".total p");

function displayCartItems() {
  cartItemsContainer.innerHTML = "";
  tableHead.style.display =
    cartItems.length === 0 ? "none" : "table-header-group";

  let totalPrice = 0;

  if (cartItems.length === 0) {
    emptyCartMessage.style.display = "block";
  } else {
    emptyCartMessage.style.display = "none";

    cartItems.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                              <td>${item.name}</td>
                              <td>
                                  <input type="number" value="${item.quantity || 1
        }">
                                  <button class="update-quantity" data-index="${index}">Update</button>
                              </td>
                              <td>$${item.price.toFixed(2)}</td>
                              <td class="item-total">$${(
          item.price * (item.quantity || 1)
        ).toFixed(2)}</td>
                              <td><button class="remove-item" data-index="${index}">Remove</button></td>
                          `;

      cartItemsContainer.appendChild(row);

      totalPrice += item.price * (item.quantity || 1);
    });
  }

  totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

function updateCartInLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

function addToCart(item) {
  cartItems.push(item);
  updateCartInLocalStorage();
  displayCartItems();
}

function updateQuantity(index, newQuantity) {
  const item = cartItems[index];
  item.quantity = newQuantity;
  item.total = item.price * newQuantity;

  localStorage.setItem("cart", JSON.stringify(cartItems));
  displayCartItems();
}

function removeCartItem(index) {
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  displayCartItems();
}

cartItemsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("update-quantity")) {
    const index = event.target.getAttribute("data-index");
    const newQuantity = parseInt(
      event.target.parentElement.querySelector("input").value
    );
    updateQuantity(index, newQuantity);
  } else if (event.target.classList.contains("remove-item")) {
    const index = event.target.getAttribute("data-index");
    removeCartItem(index);
  }
});

displayCartItems();

function populateCheckoutTable() {
  const cartTableBody = document.getElementById("cart-products");

  cartItems.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>${item.price}</td>
          <td>${item.total}</td>
      `;
    cartTableBody.appendChild(row);
  });
}

// if not logged in or cart is empty, send alerts instead of checking out
function goToCheckout() {
  console.log(cartItems.length);
  if (localStorage.getItem("loggedInUser") == null){ 
    alert("Please Login or Register!")
  }
  else if (cartItems.length === 0) {
    alert("Your Cart is Empty!");
  } else {
    localStorage.setItem("cart", JSON.stringify(cartItems)); 
    window.location.href = "../views/checkout.html";
  }
}
