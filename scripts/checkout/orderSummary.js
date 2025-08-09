import { cart, removingCartItem, updatedeliveryOption } from '../../data/cart.js';
import { product } from '../../data/products.js';
import { formattingPrice } from '../utils.js/fixPrice.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOption } from '../../data/deliveryOption.js';

// const today = dayjs();
// const deliveryDate = today.add(7, 'days');

// console.log(deliveryDate.format('dddd, MMMM D'));

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
    data-product-id="${matchingElement.id}"
    data-delivery-option-id="${option.id}">
                <input type="radio"
                ${isChecked ? 'checked' : ''}
                  class="delivery-option-input"
                  name="delivery-option-${matchingElement.id}">
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

        let matchingElement = product.find((CartItem) => CartItem.id === productsId);
        const selectedDeliveryOption = deliveryOption.find(
            (option) => option.id === cartElement.deliveryOptionId
        );

        const today = dayjs();
        const deliveryDate = today.add(selectedDeliveryOption.deliveryDays, 'days');
        const deliveryDateFormatted = deliveryDate.format('dddd, MMMM D');

        summaryCartHTML += `<div class="cart-item-container js-delete-button-working-${matchingElement.id}">
            <div class="delivery-date">
              Delivery date: ${deliveryDateFormatted}
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
        });
    });
    document.querySelectorAll('.js-delivery-option').
        forEach((element) => {
            element.addEventListener('click', () => {
                const { productId, deliveryOptionId } = element.dataset;
                updatedeliveryOption(productId, deliveryOptionId)
                renderOrderSummary();
            });
        });

}



