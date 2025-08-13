import { cart } from '../../data/cart.js';
import { getElement } from '../../data/products.js';
import { getDeliveryAmount } from '../../data/deliveryOption.js';

export function renderPaymentSummary() {
    let totalPriceCents = 0; // product total in cents
    let shippingPriceCents = 0; // shipping total in cents

    cart.forEach((cartItem) => {
        const { matchingElement } = getElement(cartItem.productsId, cartItem);

        // Add product price
        if (matchingElement && matchingElement.priceCents) {
            totalPriceCents += matchingElement.priceCents * cartItem.quantity;
        }

        // Add shipping price
        const deliveryOption = getDeliveryAmount(cartItem.deliveryOptionId);
        if (deliveryOption && deliveryOption.priceCents) {
            shippingPriceCents += deliveryOption.priceCents;
        }
    });

    // Final total
    const grandTotalCents = totalPriceCents + shippingPriceCents;

    // Convert cents → currency format
    const totalPrice = (totalPriceCents / 100).toFixed(2);
    const shippingPrice = (shippingPriceCents / 100).toFixed(2);
    const grandTotal = (grandTotalCents / 100).toFixed(2);

    console.log(`Products: $${totalPrice}`);
    console.log(`Shipping: $${shippingPrice}`);
    console.log(`Grand Total: $${grandTotal}`);
}