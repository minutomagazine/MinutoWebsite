document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileNavButton = document.querySelector('.btn-mobile-nav');
    const header = document.querySelector('.header');

    if (mobileNavButton && header) {
        mobileNavButton.addEventListener('click', () => {
            header.classList.toggle('nav-open');
        });
    } else {
        console.error('Mobile navigation button or header not found!');
    }

    // Retrieve Cart Data from LocalStorage
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Cart Data:', cartData); // Debugging log

    // DOM Elements
    const subtotalPriceElement = document.getElementById('subtotal-price');
    const shippingPriceElement = document.getElementById('shipping-price');
    const totalPriceElement = document.getElementById('total-price');
    const citySelectElement = document.getElementById('city'); // Dropdown for city selection
    const placeOrderButton = document.getElementById('place-order'); // The "Place Order" button

    let subtotal = 0;
    let shippingCost = 0;

    // Calculate subtotal
    cartData.forEach(item => {
        const { price, quantity } = item;
        subtotal += price * quantity;
    });

    // Function to update the shipping cost based on city selection
    function updateShippingCost(city) {
        if (!city || city === "") {
            shippingCost = 0; // Default to 0 when no city is selected
            shippingPriceElement.textContent = `0.00 ден`;
        } else if (city.toLowerCase() === "skopje") {
            shippingCost = 0; // Free shipping for Skopje
            shippingPriceElement.textContent = `Free`;
        } else {
            shippingCost = 100; // Shipping cost for other cities
            shippingPriceElement.textContent = `${shippingCost.toFixed(2)} ден`;
        }

        // Update subtotal, shipping, and total prices
        subtotalPriceElement.textContent = `${subtotal.toFixed(2)} ден`;
        totalPriceElement.textContent = `${(subtotal + shippingCost).toFixed(2)} ден`;

        console.log('Selected City:', city); // Debugging log
        console.log('Shipping Cost:', shippingCost); // Debugging log
        console.log('Total:', subtotal + shippingCost); // Debugging log
    }

    // Add event listener to city selection dropdown
    if (citySelectElement) {
        citySelectElement.addEventListener('change', (event) => {
            const selectedCity = event.target.value;
            updateShippingCost(selectedCity);
        });
    } else {
        console.error("City dropdown not found!");
    }

    // Initialize the page with default shipping cost (e.g., "Select a city" active by default)
    updateShippingCost(citySelectElement ? citySelectElement.value : "");

    // "Place Order" button functionality
    if (placeOrderButton) {
        placeOrderButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent form submission if in a form

            // Check if cart is empty
            if (cartData.length === 0) {
                alert('Your cart is empty. Please add items to the cart before placing an order.');
                return;
            }

            // Prepare the order data for email
            const orderDetails = cartData.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            }));

            const subtotal = cartData.reduce((total, item) => total + item.price * item.quantity, 0);
            const shippingCost = 100; // Or calculate based on city
            const totalPrice = subtotal + shippingCost;

            const customerEmail = document.getElementById('email').value;
            const customerName = document.getElementById('first-name').value + ' ' + document.getElementById('last-name').value;

            // Send the order data to the server
            fetch('/send-order-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerEmail,
                    customerName,
                    orderDetails,
                    totalPrice,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Order placed successfully:', data);
                    alert('Thank you for your order! You will receive an email confirmation shortly.');

                    // Clear the cart after order
                    localStorage.removeItem('cart'); // Clear cart data from localStorage

                    // Redirect to the "Thank You" page
                    window.location.href = 'thank-you.html'; // Replace with the actual path of your thank you page
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('There was an error with the order. Please try again later.');
                });
        });
    } else {
        console.error('Place Order button not found!');
    }
});
