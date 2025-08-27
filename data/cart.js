let cart;

loadToStorage();
export function loadToStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart || cart.length === 0) {
        return null
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

export function loadCart(fun) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        console.log(xhr.response);
        console.log('load Products')

        fun();
    })
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
}