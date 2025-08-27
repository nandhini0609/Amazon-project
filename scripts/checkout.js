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
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import '../data/cart-class.js';
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-backend.js';



Promise.all([
    loadProductsFetch()
    ,
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        })

    })
]).then((values) => {
    console.log(values)
    renderOrderSummary();
    renderPaymentSummary();
});

