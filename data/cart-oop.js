function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,
        loadToStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

            if (!this.cartItems || this.cartItems.length === 0) {
                this.cartItems = [
                    { productsId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", quantity: 1, deliveryOptionId: "1" },
                    { productsId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", quantity: 2, deliveryOptionId: "2" },

                ];
            }
        },
        saveToCart() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
        addToCart(productsId) {
            let matchingItem;
            this.cartItems.forEach((cartItem) => {
                if (productsId === cartItem.productsId) {
                    matchingItem = cartItem;
                }
            });
            if (matchingItem) {
                matchingItem.quantity += 1;
            } else {
                this.cartItems.push({
                    productsId: productsId,
                    quantity: 1,
                    deliveryOptionId: '1'
                });

            }
            this.saveToCart();
        },
        removingCartItem(productsId) {
            const newCart = [];

            this.cartItems.forEach((cartItem) => {
                if (cartItem.productsId !== productsId) {
                    newCart.push(cartItem);
                }

            });
            this.cartItems = newCart;
            this.saveToCart();

        },
        updatedeliveryOption(productsId, deliveryOptionId) {
            let matchingItem;
            this.cartItems.forEach((cartItem) => {
                if (productsId === cartItem.productsId) {
                    matchingItem = cartItem;
                }
            });
            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveToCart();
        }



    }
    return cart;

}

const cart = Cart('cart-oop');
const BusinessCart = Cart('business-cart-oop');
cart.loadToStorage();
BusinessCart.loadToStorage();
console.log(cart)
console.log(BusinessCart)

//object oriented programming let us code in a realtime like purchasing in realtime ussing cart hence we can add product or remove product etcc..
//we can also create multiple objects using oop and also put it into a single function
//we only use uppercase to cretae function in oop











