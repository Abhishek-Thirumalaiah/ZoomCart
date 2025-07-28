function cart(cartlib) {
    let cart = JSON.parse(localStorage.getItem(cartlib));
    if (!cart) {
        cart = [{
            id: "36c64692-677f-4f58-b5ec-0dc2cf109e27",
            Quantity: 0,
            deliveryOptionId: '1'
        }]
    }

    function cartAdding(cartproductId, option) {
        let matching
        cart.forEach((item) => {
            if (cartproductId === item.id) {
                matching = item
            }
        })
        if (matching) {
            matching.Quantity += option
        }
        else {
            cart.push({
                id: cartproductId,
                Quantity: option,
                deliveryOptionId: '1'
            })
        }
        setStorage()
        countingCart()

    }
    function deleteBtnCart(productid) {
        let newcart = []
        cart.forEach((deletebtn) => {
            if (deletebtn.id !== productid) {
                newcart.push(deletebtn)
            }
        })
        cart = newcart
        setStorage()
        countingCart()
    }
    function setStorage() {
        localStorage.setItem(cartlib, JSON.stringify(cart))
    }

    function countingCart() {
        let cart_quantity = 0;
        cart.forEach((item) => {
            cart_quantity += item.Quantity;
        });
        const cartElement = document.getElementById('cart_quantity');
        if (cartElement) {
            cartElement.innerHTML = cart_quantity;
        }
        const checkoutCount = document.querySelector('.checkout-count-js');
        if (checkoutCount) {
            checkoutCount.innerHTML = `${cart_quantity} items`;
        }
    }

    function updatedelivery(productsId, deliveryProductsId) {
        let matching
        cart.forEach((item) => {
            if (productsId === item.id) {
                matching = item
            }
        })
        matching.deliveryOptionId = deliveryProductsId
        setStorage()
    }
}
cart('cart-lib')
cart('cart-business')
