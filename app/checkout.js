import { cart, updatingCartQuantity } from "./cart.js";




function CartCheckOut() {
  document.querySelector('.return-to-home-link').innerHTML =` ${updatingCartQuantity()} Items `;
}

CartCheckOut()