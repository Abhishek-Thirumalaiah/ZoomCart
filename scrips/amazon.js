import {product} from '../data/products.js'
import {cart,cartAdding,countingCart} from '../data/cart.js'
let productlist = ''

product.forEach((product) => {
  productlist += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.starrating()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.price}.Rs
          </div>

          <div class="product-quantity-container">
            <select class="option_value">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          ${product.sizeHTML()}
          <div class="product-spacer"></div>

          <div class="added-to-cart added_js">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary adding_cart_js" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`
})
document.querySelector('.products-grid').innerHTML = productlist
document.querySelectorAll('.adding_cart_js').forEach((button) => {
  button.addEventListener('click', () => {
    const cartproductId = button.dataset.productId
    const option = parseInt(button.parentElement.querySelector('.option_value').value)
    cartAdding(cartproductId,option)

    let timing = 0
    let timing_id=null
    const addedMessage = button.parentElement.querySelector('.added_js');
    if (timing === 0) {
      addedMessage.style.opacity = '1';
      timing_id=setTimeout(() => {
        addedMessage.style.opacity = '0';
      }, 1200);
      timing = 1
    }
    else{
      clearTimeout(timing_id)
      timing=0
      addedMessage.style.opacity = '1';
      let settingTime = setTimeout(() => {
        addedMessage.style.opacity = '0';
      }, 1200);
    }

  })
})