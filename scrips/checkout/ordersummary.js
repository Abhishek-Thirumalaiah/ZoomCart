import { cart, updatedelivery } from '../../data/cart.js'
import { product,getId } from '../../data/products.js'
import { deleteBtnCart } from '../../data/cart.js'
import { deliveryOption,deliveryOptionId} from '../../data/deliver.js'
import {paymentCart} from './payment.js'

export function renderPage() {
    let checkoutSummary = ''

    cart.forEach((cartitem) => {
        const productid = cartitem.id
        const matching=getId(productid)
        
        if (!matching) return;

        let deliveryid = cartitem. deliveryOptionId
        let deliveringoption=deliveryOptionId(deliveryid)
        const today = dayjs()
        const delivery = today.add(deliveringoption.deliverdays, 'days')
        const deliverydate = delivery.format('dddd, MMMM D')
        checkoutSummary += `
      <div class="cart-item-container cart-remove-js-${matching.id}">
          <div class="delivery-date">
            Delivery date:${deliverydate}
          </div>
  
          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matching.image}">
  
            <div class="cart-item-details">
              <div class="product-name">
                ${matching.name}
              </div>
              <div class="product-price">
                ${matching.price} Rs
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label-${matching.id}">${cartitem.Quantity}</span>
                </span>
                <span class="delete-quantity-link link-primary delete-js" data-delete-btn='${matching.id}'>
                  Delete
                </span>
              </div>
            </div>
  
            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliverying(matching, cartitem)}
              
            </div>
          </div>
        </div>`
    })
    function deliverying(matching, cartitem) {
        let deliveryHTML = ''
        deliveryOption.forEach((deliverOption) => {
            const today = dayjs()
            const delivery = today.add(deliverOption.deliverdays, 'days')
            const deliverydate = delivery.format('dddd, MMMM D')
            let deliveryPrice = deliverOption.deliverPrice === 0 ? `Free` : `${deliverOption.deliverPrice} Rs`
            const isChecked = deliverOption.id === cartitem.deliveryOptionId ? `checked` : ``
            deliveryHTML +=
                `<div class="delivery-option js-deliver-option" data-delivery-products-id=${deliverOption.id} data-products-id=${matching.id}>
          <input type="radio" ${isChecked} class="delivery-option-input" name="${matching.id}">
          <div>
            <div class="delivery-option-date">
              ${deliverydate}
            </div>
            <div class="delivery-option-price">
              ${deliveryPrice} - Shipping
            </div>
          </div>
        </div>`
        })
        return deliveryHTML
    }

    document.querySelector('.order-summary').innerHTML = checkoutSummary;
    document.querySelectorAll('.delete-js').forEach((link) => {
        link.addEventListener('click', () => {
            let productid = link.dataset.deleteBtn
            deleteBtnCart(productid)
            const removeCart = document.querySelector(`.cart-remove-js-${productid}`)
            removeCart.remove()
            paymentCart()
        })
    })

    document.querySelectorAll('.js-deliver-option').forEach((element) => {
        element.addEventListener('click', () => {
            const { productsId, deliveryProductsId } = element.dataset
            updatedelivery(productsId, deliveryProductsId)
            renderPage()
            paymentCart()
        })
    })

}

