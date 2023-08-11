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

});