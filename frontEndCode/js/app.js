document.addEventListener('DOMContentLoaded', () => {

    function redirectToCatalog() {
        window.location.href = '../views/catalog.html';
    }

    const shopNowButton = document.getElementById('shop-now-button');
    if (shopNowButton) {
        shopNowButton.addEventListener('click', redirectToCatalog);
    }

    function displayFeaturedProducts(products) {
        const catalogContainer = document.getElementById('featured-container');
        catalogContainer.innerHTML = '';
        
        products.slice(0, 6).forEach(product => {
            const productLink = document.createElement("a");
            productLink.className = 'slideCardLink';
            productLink.href = "product-page.html";

            const productCard = document.createElement('div');
            productCard.className = 'slideCard';
            
            const productName = document.createElement("p");
            productName.textContent = product.name;
            
            const productPrice = document.createElement('p');
            productPrice.className = 'price';
            productPrice.textContent = `$${product.price}`;
            
            productCard.appendChild(productName);
            productCard.appendChild(productPrice);
            
            productLink.appendChild(productCard);
            catalogContainer.appendChild(productLink);
        });
        
        totalFeaturedSlides = Math.ceil(products.length / 3);
        featuredSlideShow(featuredSlideIndex);
    }
    
    function fetchProducts() {
        const apiUrl = 'http://localhost:8080/api/products';
        fetch(apiUrl)
            .then(response => response.json())
            .then(products => {
                console.log('Fetched products: ', products);
                displayFeaturedProducts(products);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }
    
    fetchProducts();
    
    let featuredSlideIndex = 1;
    let totalFeaturedSlides = 0;
    
    function featuredSlideShow(index) {
        if (index > totalFeaturedSlides) {
            featuredSlideIndex = 1;
        }
        if (index < 1) {
            featuredSlideIndex = totalFeaturedSlides;
        }
        const slides = document.querySelectorAll(".slideCard");
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = (featuredSlideIndex - 1) * 3; i < featuredSlideIndex * 3; i++) {
            if (slides[i]) {
                slides[i].style.display = "block";
            }
        }
    }
    
    function prevSlide() {
        featuredSlideShow(featuredSlideIndex -= 1);
    }
    
    function nextSlide() {
        featuredSlideShow(featuredSlideIndex += 1);
    }
    
    const prevArrow = document.querySelector(".prev-arrow");
    const nextArrow = document.querySelector(".next-arrow");
    
    prevArrow.addEventListener("click", prevSlide);
    nextArrow.addEventListener("click", nextSlide);
    
    featuredSlideShow(featuredSlideIndex);

}

);

