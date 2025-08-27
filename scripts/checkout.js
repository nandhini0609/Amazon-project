import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import '../data/cart-class.js';
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-backend.js';

async function loadPage() {
    // throw 'error';
    // it will throws error  and stop running the try then move to catch
    try {
        await loadProductsFetch();
        const value = await new Promise((resolve, reject) => {
            // throw 'error2';

            loadCart(() => {
                // reject('error3')
                resolve('value3');
            });
        });

    } catch (error) {
        console.log('unexpected error.Please try again later')

    }

    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

// Promise.all([
//     loadProductsFetch()
//     ,
//     new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         })

//     })
// ]).then((values) => {
//     console.log(values)
//     renderOrderSummary();
//     renderPaymentSummary();
// })

// new Promise((resolve) => {

//     loadProducts(() => {
//         resolve('value1');
//     });
// }).then((value) => {
//     console.log(value)
//     return new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         })

//     })

// }).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// })

// loadProducts(() => {
//     loadCart(() => {
//         renderOrderSummary();
//         renderPaymentSummary();
//     })

// });

