import { cart, addToCart } from '../data/cart.js';
import { product } from '../data/products.js';
import { formattingPrice } from './utils/fixPrice.js';

let Accumulator = '';

product.forEach((products) => {
  Accumulator += `<div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${products.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${products.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${products.getStar()}">
          <div class="product-rating-count link-primary">
            ${products.rating.number}
          </div>
        </div>

        <div class="product-price">
          "${products.rating}"
        </div >

        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary add-cart-js" data-products-id = "${products.id}">
          Add to Cart
        </button>
      </div > `

});

document.querySelector('.products-js').innerHTML = Accumulator;


function updateCart() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  document.querySelector('.cart-quantity-js').innerHTML = cartQuantity;
}

document.querySelectorAll('.add-cart-js').forEach((button) => {
  button.addEventListener('click', () => {
    const productsId = button.dataset.productsId;
    addToCart(productsId);
    updateCart();

  });

});








