// Place your JavaScript code here
document.addEventListener('DOMContentLoaded', () => {
    // Example code: Add an event listener to a button
    const button = document.createElement('button');
    button.textContent = 'Click Me';
    button.addEventListener('click', () => {
        alert('Hello, World!');
    });
    document.getElementById('app').appendChild(button);
});

let featuredSlideIndex = 1;
const totalFeaturedSlides = document.querySelectorAll(".slideCard").length / 3;

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
        slides[i].style.display = "block";
    }
}

function prevSlide() {
    featuredSlideShow(featuredSlideIndex -= 1);
}

function nextSlide() {
    featuredSlideShow(featuredSlideIndex += 1);
}

featuredSlideShow(featuredSlideIndex);
