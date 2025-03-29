import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

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
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function updateCartTotal(cartItems) {
  const cartFooter = document.querySelector(".cart-footer");
  if (cartItems.length > 0) {
    // Calculate the total price
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

    // Show the cart footer and update the total
    cartFooter.classList.remove("hide");
    document.getElementById("cart-total").textContent = total.toFixed(2);
  } else {
    // Hide the cart footer if the cart is empty
    cartFooter.classList.add("hide");
  }
}

renderCartContents();
