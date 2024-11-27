///////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    //e.preventDefault(); //Ova ti pravese problem. Pozdrav, Tato.
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile naviagtion
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions

function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

///////////////////////////////////////////////////////////
// Make the cart work

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const maxItemsAllowed = 10;

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productElement = button.closest(".product");
      const productName =
        productElement.querySelector(".product-title").textContent;
      const productPrice = parseFloat(
        productElement
          .querySelector(".product-price")
          .textContent.replace("ден", "")
      );

      if (getCartTotalItems() < maxItemsAllowed) {
        addToCart(productName, productPrice);
        saveCart();
        updateCartCount();
        alert("Item added to cart!"); // Basic feedback to ensure it’s working
      } else {
        alert(
          `You can only add up to ${maxItemsAllowed} magazines to your cart.`
        );
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Function to update the cart count
  function updateCartCount(count) {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      cartCount.textContent = count.toString().toUpperCase(); // Update count
    } else {
      console.error("Cart count element not found!");
    }
  }

  <script>
    document.addEventListener("DOMContentLoaded", function () {
    function updateCartCount(count) {
      const cartCount = document.querySelector('.cart-count');
      if (cartCount) {
        cartCount.textContent = count.toString().toUpperCase();
      } else {
        console.error("Cart count element not found!");
      }
    }

// JavaScript for Mobile Navigation Toggle
    const mobileNavButton = document.querySelector('.btn-mobile-nav');
    const headerElement = document.querySelector('.header');

    mobileNavButton.addEventListener('click', () => {
    headerElement.classList.toggle('nav-open'); // Add or remove nav-open class
  });

