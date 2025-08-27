import { cart, addToCart } from '../data/cart.js';
import { product, loadProducts } from '../data/products.js';
import { formattingPrice } from './utils/fixPrice.js';

// On page load, set cart quantity from localStorage
document.addEventListener('DOMContentLoaded', () => {
  const cartQuantityElement = document.querySelector('.cart-quantity-js');
  let cartQuantity = 0;
  const cartData = localStorage.getItem('cart');
  if (cartData) {
    try {
      const cartObj = JSON.parse(cartData);
      if (Array.isArray(cartObj)) {
        cartQuantity = cartObj.reduce((sum, item) => sum + (item.quantity || 0), 0);
      } else if (typeof cartObj === 'object' && cartObj !== null) {
        cartQuantity = Object.values(cartObj).reduce((sum, qty) => sum + (typeof qty === 'number' ? qty : 0), 0);
      }
    } catch (e) {
      cartQuantity = 0;
    }
  }
  if (cartQuantityElement) {
    cartQuantityElement.textContent = cartQuantity;
  }
});

loadProducts(renderToGrid);
export function renderToGrid() {
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
          <img class="product-rating-stars" src="images/ratings/rating-${products.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${products.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${formattingPrice(products.priceCents)}
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
         ${products.extraInfoHTML()}
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

  console.log(Accumulator)

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









}
