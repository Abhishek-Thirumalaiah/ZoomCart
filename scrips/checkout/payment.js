import { cart } from "../../data/cart.js";
import { getId } from "../../data/products.js";
import { deliveryOptionId } from '../../data/deliver.js'

export function paymentCart() {
    let payment = 0
    let shipping = 0
    cart.forEach((cartitem) => {
        const product = getId(cartitem.id)
        payment += product.price * cartitem.Quantity

        const deliverOption = deliveryOptionId(cartitem.deliveryOptionId)
        shipping += deliverOption.deliverPrice
    });
    const tax = payment + shipping
    const estimate = (tax / 100) * 10
    const final = tax + estimate
    let cart_quantity = 0;
    cart.forEach((item) => {
        cart_quantity += item.Quantity;
    });
    const paymentSummary = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart_quantity}):</div>
            <div class="payment-summary-money">${payment} Rs</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${shipping} Rs</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${tax} Rs</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${estimate} Rs</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${final} Rs</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`
    document.querySelector('.js-payment-summary').innerHTML = paymentSummary
}
paymentCart()