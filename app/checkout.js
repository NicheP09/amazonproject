import { cart, updatingCartQuantity, removeFromCart,matchingCheck, updateDeliveryFunc } from "./cart.js";
import { products } from "../data/products.js";
import { deliveryOption } from "../data/deliveryOption.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


function updatingCheckoutQuantity() {
   document.querySelector('.return-to-home-link').innerHTML =` ${updatingCartQuantity()} Items `;

}

updatingCheckoutQuantity()

function CartCheckOut() {
  


 
  let checkOutHtml = '';
  let matchingProduct;
  cart.forEach(item => {
    products.forEach(product => {
      if (item.productId === product.id) {
        matchingProduct = product
      }
    })

    const deliveryOptionId = item.deliveryId;
  

    checkOutHtml += `
    
     <div class="cart-item-container cart-item-container-${matchingProduct.id}">
            <div class="delivery-date delivery-date-${matchingProduct.id}">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                 ${matchingProduct.name}
                </div>
                <div class="product-price">
                 $${matchingProduct.priceCents/ 100}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label quantity-label-${matchingProduct.id}">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link   update-quantity-link-${matchingProduct.id} link-primary" data-product-id= "${matchingProduct.id}">
                    Update
                  </span>

                  <span class="input-save-con">
                  <input class="update-input update-input-${matchingProduct.id}" type ="text">
                  <button class="save-update save-update-${matchingProduct.id} link-primary" data-product-id= "${matchingProduct.id}">Save</button>
                  </span>

                  <span class="delete-quantity-link delete-quantity-link-${matchingProduct.id} link-primary" data-product-id = "${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options" >
              
               ${deliveryOptionFunc(matchingProduct, item)}
              </div>
            </div>
          </div>
    
    `
    
  });
document.querySelector('.order-summary').innerHTML = checkOutHtml;

document.querySelectorAll('.delete-quantity-link').forEach(deleteClick => {
  deleteClick.addEventListener('click', ()=> {
    const {productId} = deleteClick.dataset;
    removeFromCart(productId);
    const container = document.querySelector(`.cart-item-container-${productId}`);
    container.remove();
    updatingCheckoutQuantity()
  })
})

document.querySelectorAll('.update-quantity-link').forEach(update => {
  update.addEventListener('click', ()=> {
    const {productId} = update.dataset;
    const container = document.querySelector(`.cart-item-container-${productId}`);
    container.classList.add('is-editing')
  })
})
document.querySelectorAll('.save-update').forEach(save => {
  save.addEventListener('click', () => {
     const {productId} = save.dataset;
    const updateInput = document.querySelector(`.update-input-${productId}`).value;
    const updatedInput = Number(updateInput);
    let matching = matchingCheck(productId);
    matching.quantity = updatedInput;
     const container = document.querySelector(`.cart-item-container-${productId}`);
    container.classList.remove('is-editing');
    document.querySelector(`.quantity-label-${productId}`).innerHTML = updateInput;
    updatingCheckoutQuantity()

  })
})




}

CartCheckOut()
function deliveryOptionFunc(matchingProduct, item) {
  
 
  
  let deliveryHtml = '';
  deliveryOption.forEach(option => {

     const todayDate = dayjs();
  const deliveryDay = todayDate.add(option.deliveryDays, 'days')
  const dateString = deliveryDay.format('ddd MMMM D YYYY')

    const priceString = option.priceCents === 0 ? 'FREE' : `$${option.priceCents/ 100} -`;
    const isChecked = option.id ===  item.deliveryId;

    
    deliveryHtml += `
            <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
              <div class="delivery-option" data-product-id= "${matchingProduct.id}" data-option-id= "${option.id}">
                  <input type="radio" ${isChecked ? "checked" : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                     ${dateString};
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>
                `
    
  })

  return deliveryHtml;
}

document.querySelectorAll('.delivery-option').forEach(option => {
  option.addEventListener('click', ()=> {
   const {productId, optionId} = option.dataset;
  updateDeliveryFunc(productId, optionId);
  CartCheckOut()
  })
})
  


