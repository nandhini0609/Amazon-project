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

