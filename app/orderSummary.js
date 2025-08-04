import { cart, updatingCartQuantity, matchingCheck } from "../data/cart.js";
import { deliveryOption } from "../data/deliveryOption.js";
import { products } from "../data/products.js";
import { orderFun, orders } from "../data/order.js";


 

export function orderSummary() {
  const totalItem =updatingCartQuantity()
  let productPrice = 0;
  let productPriceCents = 0;
    let item;
  let itemsCost = 0;
  let totalShippingCostCents = 0;
  let shipping;
  cart.forEach( cartItem => {
    products.forEach(product => {
      if (product.id === cartItem.productId) {
       productPrice = product.priceCents;
      }
       
  })
  deliveryOption.forEach(option => {
    if (cartItem.deliveryId === option.id) {
      totalShippingCostCents += option.priceCents;
    }
  })

  
  productPriceCents += productPrice * cartItem.quantity;
  

   
})
const totalItemCost = productPriceCents/100;
const totalShipping = totalShippingCostCents/100;
const totalBeforeTax = (productPriceCents + totalShippingCostCents)/100;
const estimatedTax = (totalBeforeTax * 0.1).toFixed(2);
const orderTotal = ((productPriceCents + totalShippingCostCents)/100 + (totalBeforeTax * 0.1)).toFixed(2)



const paymentSummaryHtml = `
 <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalItem}):</div>
            <div class="payment-summary-money">$${totalItemCost}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${totalShipping}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalBeforeTax}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${estimatedTax}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${orderTotal}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>

`
document.querySelector('.payment-summary').innerHTML = paymentSummaryHtml;

document.querySelector('.place-order-button').addEventListener('click', async() => {
  try{
  const response = await fetch('https://supersimplebackend.dev/orders', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      cart : cart
    })
  })

  const order = await response.json();
  orderFun(order);
 
 
  } catch(error) {
    console.log("unexpected error. Try again later")
  }


   window.location.href = "orders.html"
})
}


