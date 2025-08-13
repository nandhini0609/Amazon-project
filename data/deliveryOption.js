export const deliveryOption = [{
    id: '1',
    deliveryDays: 7,
    price: 0
}, {
    id: '2',
    deliveryDays: 3,
    price: 499
}, {
    id: '3',
    deliveryDays: 1,
    price: 999
}];
export function getDeliveryAmount(deliveryOptionId) {
    let result;
    deliveryOption.forEach((option) => {
        if (option.id === deliveryOptionId) {
            result = option;
        }

    });
    return deliveryOption.id === deliveryOptionId ? result : deliveryOption[0];
}  
