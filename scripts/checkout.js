import { cart, removingCartItem } from '../data/cart.js';
import { product } from '../data/products.js';
import { formattingPrice } from './utils.js/fixPrice.js';


let summaryCartHTML = '';
cart.forEach((cartElement) => {
  const productsId = cartElement.productsId;

  let matchingElement = '';

  product.forEach((CartItem) => {
    if (CartItem.id === productsId) {
      matchingElement = CartItem;
    }
  });

  summaryCartHTML += ` <div class="cart-item-container js-delete-button-working-${matchingElement.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingElement.image}">

              <div class="cart-item-details">
                <div class="product-name">
                 ${matchingElement.name}
                </div>
                <div class="product-price">
                 $${formattingPrice(matchingElement.price)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartElement.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary delete-link-js" data-products-id = "${matchingElement.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingElement.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingElement.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingElement.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
`;

});

console.log(summaryCartHTML);
document.querySelector('.js-cart').innerHTML = summaryCartHTML;

document.querySelectorAll('.delete-link-js').forEach((link) => {
  link.addEventListener('click', () => {
    const productsId = link.dataset.productsId;
    removingCartItem(productsId);
    const container = document.querySelector(`.js-delete-button-working-${productsId}`);
    container.remove();
  })
})