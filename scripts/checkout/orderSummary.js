import { cart, removingCartItem, updatedeliveryOption } from '../../data/cart.js';
import { product, getElement } from '../../data/products.js';
import { formattingPrice } from '../utils/fixPrice.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOption } from '../../data/deliveryOption.js';
import { renderPaymentSummary } from './paymentSummary.js';

// const today = dayjs();
// const deliveryDate = today.add(7, 'days');

// console.log(deliveryDate.format('dddd, MMMM D'));
// On page load, set cart quantity from localStorage in checkout-header-middle-section
document.addEventListener('DOMContentLoaded', () => {
  const cartQuantityElement = document.querySelector('.return-to-home-link');
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
    cartQuantityElement.textContent = cartQuantity + ` ` + `items`;
  }
});

export function renderOrderSummary() {
  function deliveryOptionHTML(matchingElement, cartElement) {
    let html = '';
    deliveryOption.forEach((option) => {

      const today = dayjs();
      const deliveryDate = today.add(option.deliveryDays, 'days');
      const deliveryDateFormatted = deliveryDate.format('dddd, MMMM D');
      const deliveryPrice = option.price === 0
        ? 'FREE'
        : `${formattingPrice(option.price)}`;

      const isChecked = option.id === cartElement.deliveryOptionId;
      html += `<div class="delivery-option js-delivery-option"
    data-product-id="${matchingElement.matchingElement.id}"
    data-delivery-option-id="${option.id}">
                <input type="radio"
                ${isChecked ? 'checked' : ''}
                  class="delivery-option-input"
                  name="delivery-option-${matchingElement.matchingElement.id}">
                <div>
                  <div class="delivery-option-date">
                    ${deliveryDateFormatted}
                  </div>
                  <div class="delivery-option-price">
                    ${deliveryPrice}- Shipping
                  </div>
                </div>
              </div>`;
    });
    return html;
  }
  ;

  let summaryCartHTML = '';
  cart.forEach((cartElement) => {
    const productsId = cartElement.productsId;

    const matchingElement = getElement(productsId, cartElement);
    const deliveryOptionId = cartElement.deliveryOptionId;
    const today = dayjs();
    const deliveryDate = today.add(matchingElement.selectedDeliveryOption.deliveryDays, 'days');
    const deliveryDateFormatted = deliveryDate.format('dddd, MMMM D');

    summaryCartHTML += `<div class="cart-item-container js-delete-button-working-${matchingElement.matchingElement.id}">
            <div class="delivery-date">
              Delivery date: ${deliveryDateFormatted}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingElement.matchingElement.image}">

              <div class="cart-item-details">
                <div class="product-name">
                 ${matchingElement.matchingElement.name}
                </div>
                <div class="product-price">
                 $${formattingPrice(matchingElement.matchingElement.priceCents ?? matchingElement.matchingElement.price ?? 0)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartElement.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary delete-link-js" data-products-id = "${matchingElement.matchingElement.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
               ${deliveryOptionHTML(matchingElement, cartElement)}
              </div>
            </div>
          </div>`;
  });

  document.querySelector('.js-cart').innerHTML = summaryCartHTML;

  document.querySelectorAll('.delete-link-js').forEach((link) => {
    link.addEventListener('click', () => {
      const productsId = link.dataset.productsId;
      removingCartItem(productsId);
      const container = document.querySelector(`.js-delete-button-working-${productsId}`);
      container.remove();
      renderPaymentSummary();
    });
  });
  document.querySelectorAll('.js-delivery-option').
    forEach((element) => {
      element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset;
        updatedeliveryOption(productId, deliveryOptionId)
        renderOrderSummary();
        renderPaymentSummary();
      });
    });

}



