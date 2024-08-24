// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.querySelector('.cart-count');

    // Update the cart count on page load
    updateCartCount();

    // Function to update the cart count
    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    // Example function to add items to the cart
    function addToCart(pizza) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        const existingPizzaIndex = cart.findIndex(item => item.id === pizza.id);
        
        if (existingPizzaIndex !== -1) {
            cart[existingPizzaIndex].quantity += 1;
        } else {
            cart.push(pizza);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${pizza.name} added to cart!`);
    }
});
