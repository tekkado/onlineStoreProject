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
