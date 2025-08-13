import { cart } from '../../data/cart.js';
import { getElement } from '../../data/products.js';
import { getDeliveryAmount } from '../../data/deliveryOption.js';


export function renderPaymentSummary() {

    let totalPrice = 0;
    let shippingPriceCents = 0;

    cart.forEach((cartItem) => {
        const { matchingElement } = getElement(cartItem.productsId, cartItem);

        // Make sure matchingElement exists before accessing price
        if (matchingElement && matchingElement.price) {
            totalPrice += matchingElement.price * cartItem.quantity;
        }

        const deliveryOption = getDeliveryAmount(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.price;


    });
    const totalBeforeTax = totalPrice + shippingPriceCents;
    const tax = totalBeforeTax * 0.1;
    const total = totalBeforeTax + tax;

    const PaymentSummaryHTML = ` <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (3):</div>
          <div class="payment-summary-money">$${(totalPrice / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${(shippingPriceCents / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${(totalBeforeTax / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${(tax / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${(total / 100).toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>`;
    document.querySelector('.js-payment-summary').innerHTML = PaymentSummaryHTML;


}
