export let deliveryOption = [{
    id: '1',
    deliverdays: '7',
    deliverPrice: 0
}, {
    id: '2',
    deliverdays: '4',
    deliverPrice: 40
}, {
    id: '3',
    deliverdays: '1',
    deliverPrice: 90
}]
export function deliveryOptionId(deliveryid) {
    let deliveringoption
    deliveryOption.forEach((option) => {
        if (option.id === deliveryid) {
            deliveringoption = option
        }
    })
    return deliveringoption || deliveryOption[0]
}