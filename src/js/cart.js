import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Attach event listeners to quantity inputs
  document.querySelectorAll(".cart-card__quantity").forEach((input) => {
    input.addEventListener("change", handleQuantityChange);
  });

  // Calculate and display the total
  updateCartTotal(cartItems);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    /> 
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0]?.ColorName || "N/A"}</p>
  <label for="quantity-${item.Id}">Quantity:</label>
  <input type="number" id="quantity-${item.Id}" class="cart-card__quantity" value="${item.quantity || 1}" min="1" data-id="${item.Id}">
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function handleQuantityChange(event) {
  const input = event.target;
  const productId = input.dataset.id;
  const newQuantity = parseInt(input.value);

  if (newQuantity < 1) {
    alert("Quantity must be at least 1.");
    input.value = 1;
    return;
  }

  // Update the quantity in local storage
  const cartItems = getLocalStorage("so-cart") || [];
  const updatedCartItems = cartItems.map((item) => {
    if (item.Id === productId) {
      item.quantity = newQuantity;
    }
    return item;
  });

  setLocalStorage("so-cart", updatedCartItems);

  // Recalculate the total
  updateCartTotal(updatedCartItems);
}

function updateCartTotal(cartItems) {
  const cartFooter = document.querySelector(".cart-footer");
  if (cartItems.length > 0) {
    // Calculate the total price based on quantity
    const total = cartItems.reduce(
      (sum, item) => sum + item.FinalPrice * (item.quantity || 1),
      0
    );

    // Show the cart footer and update the total
    cartFooter.classList.remove("hide");
    document.getElementById("cart-total").textContent = total.toFixed(2);
  } else {
    // Hide the cart footer if the cart is empty
    cartFooter.classList.add("hide");
  }
}

renderCartContents();
