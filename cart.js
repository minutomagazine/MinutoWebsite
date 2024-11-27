document.addEventListener("DOMContentLoaded", function () {
  // Initialize cart from localStorage or create an empty array
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Function to save the cart to localStorage
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Function to update the cart count in the navbar
  function updateCartCount() {
    const cartCountElement = document.querySelector(".cart-count");
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
  }

  // Function to calculate and update the subtotal and total
  function updateTotal() {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    // Determine shipping cost based on city selection
    const city = document.querySelector("#city")?.value?.toLowerCase();
    let shippingCost = 0;

    if (city && city !== "skopje") {
      shippingCost = 100; // 100 ден for other cities
    } else if (city === "skopje") {
      shippingCost = 0; // Free delivery in Skopje
    }

    const total = subtotal + shippingCost;

    // Update the total and subtotal in the summary
    const subtotalElement = document.querySelector("#subtotal");
    const shippingElement = document.querySelector("#shipping");
    const totalElement = document.querySelector("#total");

    if (subtotalElement) {
      subtotalElement.textContent = `${subtotal.toFixed(2)} ден`;
    }
    if (shippingElement) {
      shippingElement.textContent = shippingCost > 0 ? `${shippingCost.toFixed(2)} ден` : "Calculated at checkout";
    }
    if (totalElement) {
      totalElement.textContent = `${total.toFixed(2)} ден`;
    }
  }

  // Function to render the cart items on the cart page
  function renderCart() {
    const cartItemsContainer = document.querySelector("tbody");
    cartItemsContainer.innerHTML = ""; // Clear existing items

    cart.forEach((item, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td style="display: flex; align-items: center; gap: 10px;">
                <img src="${item.cover}" alt="${item.name}" style="width: 50px; height: auto;">
                <span>${item.name}</span>
            </td>
            <td>${item.price} ден</td>
            <td>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-index="${index}">
            </td>
            <td>${(item.price * item.quantity).toFixed(2)} ден</td>
            <td>
                <button class="remove-button" data-index="${index}">X</button>
            </td>
      `;
      cartItemsContainer.appendChild(row);
    });

    // Update totals after rendering the cart
    updateTotal();
  }

  // Event listener for "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const cover = this.dataset.cover;
      const name = this.dataset.title;
      const price = 100; // Example price, replace with dynamic value if needed

      const existingItem = cart.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ cover, name, price, quantity: 1 });
      }

      saveCart();
      updateCartCount();
      renderCart();
    });
  });

  // Event listener for quantity inputs
  document.addEventListener("input", function (event) {
    if (event.target.classList.contains("quantity-input")) {
      const index = event.target.dataset.index;
      const newQuantity = parseInt(event.target.value, 10);
      if (newQuantity > 0) {
        cart[index].quantity = newQuantity;
        saveCart();
        renderCart();
      }
    } else if (event.target.id === "city") {
      // Update totals if the city changes
      updateTotal();
    }
  });

  // Event listener for "Remove" buttons
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-button")) {
      const index = event.target.dataset.index;
      cart.splice(index, 1);
      saveCart();
      updateCartCount();
      renderCart();
    }
  });

  // Initial render
  updateCartCount();
  if (document.body.contains(document.querySelector(".cart-table"))) {
    renderCart();
  }
});

document.querySelectorAll(".title-input").forEach((input) => {
  input.addEventListener("input", (event) => {
    const updatedTitle = event.target.value;
    console.log(`Updated Title: ${updatedTitle}`); // Log the updated title
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const proceedButton = document.getElementById("proceedButton");

  proceedButton.addEventListener("click", () => {
    // Redirect to the checkout page
    window.location.href = "checkout.html"; // Replace with the correct path
  });
});
