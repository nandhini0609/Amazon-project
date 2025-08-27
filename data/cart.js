let cart;

loadToStorage();
export function loadToStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart || cart.length === 0) {
        cart = [
            { productsId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", quantity: 1, deliveryOptionId: "1" },
            { productsId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", quantity: 2, deliveryOptionId: "2" },

        ];
    }
}

function saveToCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export { cart };

export function addToCart(productsId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productsId === cartItem.productsId) {
            matchingItem = cartItem;
        }
    });
    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productsId: productsId,
            quantity: 1,
            deliveryOptionId: '1'
        });

    }
    saveToCart();
};

export function removingCartItem(productsId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productsId !== productsId) {
            newCart.push(cartItem);
        }

    });
    cart = newCart;
    saveToCart();

}

export function updatedeliveryOption(productsId, deliveryOptionId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productsId === cartItem.productsId) {
            matchingItem = cartItem;
        }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToCart();
}