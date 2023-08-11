console.log('DOMContentLoaded event triggered');
document.addEventListener('DOMContentLoaded', () => {
  
    function fetchProducts(callback) {
        const apiUrl = 'http://localhost:8080/api/products';
        fetch(apiUrl)
            .then(response => response.json())
            .then(products => {
                console.log('Fetched products: ', products);
                callback(products);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }

    let currentSlideIndex = 0;
    const productsPerPage = 3;

    function createFeaturedSlideList(products, start, end) {
        const featuredContainer = document.getElementById('featured-container');
        featuredContainer.innerHTML = '';

        for (let i = start; i < end; i++) {
            const productLink = document.createElement('a');
            productLink.className = 'slideCardLink';
            productLink.href = 'product-page.html';

            const productCard = document.createElement('div');
            productCard.className = 'slideCard';

            const productName = document.createElement('p');
            productName.textContent = products[i].name;

            const productPrice = document.createElement('p');
            productPrice.className = 'price';
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
        currentSlideIndex = (currentSlideIndex - productsPerPage + products.length) % products.length;
        displaySlide(products, currentSlideIndex);
    }

    function nextSlide(products) {
        currentSlideIndex = (currentSlideIndex + productsPerPage) % products.length;
        displaySlide(products, currentSlideIndex);
    }

    function fetchAndInitializeProducts() {
        fetchProducts(products => {
            const firstSixProducts = products.slice(0, 6);
            displaySlide(firstSixProducts, currentSlideIndex);

            const prevArrow = document.querySelector('.prev-arrow');
            const nextArrow = document.querySelector('.next-arrow');

            prevArrow.addEventListener('click', () => prevSlide(firstSixProducts));
            nextArrow.addEventListener('click', () => nextSlide(firstSixProducts));
        });
    }

    fetchAndInitializeProducts();

    let currentPage = 1;
    const catalogProdPerPage = 12;
    let products = [];
    
    function displayProducts(startIndex, endIndex) {
        const productContainer = document.querySelector('.product-list');
        productContainer.innerHTML = '';

        for (let i = startIndex; i < endIndex; i++) {
            const product = products[i];

            if (!product) {
                break;
            }

            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            const image = document.createElement('img');
            image.src = product.imageSrc;
            image.alt = product.name;

            const title = document.createElement('h3');
            title.textContent = product.name;

            const price = document.createElement('p');
            price.className = 'price';
            price.textContent = `$${product.price.toFixed(2)}`;

            productCard.appendChild(image);
            productCard.appendChild(title);
            productCard.appendChild(price);

            productContainer.appendChild(productCard);
        }
    }

    function updatePaginationButtons() {
        const prevButton = document.querySelector('#prev-catalog-arrow');
        const nextButton = document.querySelector('#next-catalog-arrow');

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

    const prevButton = document.querySelector('#prev-catalog-arrow');
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            loadPage(currentPage - 1);
        }
    });

    const nextButton = document.querySelector('#next-catalog-arrow');
    nextButton.addEventListener('click', () => {
        loadPage(currentPage + 1);
    });

    fetchProducts((fetchedProducts) => {
        products = fetchedProducts;
        loadPage(currentPage);
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
        const apiUrl =
          "http://localhost:8080/api/products/unique-categories-brands";
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            console.log("Fetched unique categories and brands: ", data);
            callback(data);
          })
          .catch((error) => {
            console.error(
              "Error fetching unique categories and brands:",
              error
            );
          });
      }

      function generateDropdownItems(items, container, className, attribute) {
        container.innerHTML = "";

        items.forEach((item) => {
          const link = document.createElement("a");
          link.href = "#";
          link.className = className;
          link.textContent = item;
          link.setAttribute(attribute, item);

          const listItem = document.createElement("li");
          listItem.appendChild(link);

          container.appendChild(listItem);
        });
      }

      fetchUniqueCategoriesAndBrands((data) => {
        const uniqueCategories = data.categories;
        const uniqueBrands = data.brands;

        const categoryDropdown = document.querySelector('.dropdown#category-dropdown');
        const brandDropdown = document.querySelector('.dropdown#brand-dropdown');

        generateDropdownItems(
          uniqueCategories,
          categoryDropdown,
          "filter-category",
          "data-category"
        );
        generateDropdownItems(
          uniqueBrands,
          brandDropdown,
          "filter-brand",
          "data-brand"
        );

        const categoryLinks = document.querySelectorAll(".filter-category");
        const brandLinks = document.querySelectorAll(".filter-brand");

        categoryLinks.forEach((link) => {
          link.addEventListener("click", () => {
            const selectedCategory = link.getAttribute("data-category");
            if (selectedCategory) {
              products = filterProductsByCategory(selectedCategory);
              loadPage(1);
            }
          });
        });

        brandLinks.forEach((link) => {
          link.addEventListener("click", () => {
            const selectedBrand = link.getAttribute("data-brand");
            if (selectedBrand) {
              products = filterProductsByBrand(selectedBrand);
              loadPage(1);
            }
          });
        });
      });

});