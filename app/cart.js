export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  productId: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
  quantity: 3,
  deliveryId: '3',
}, {
   productId: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
  quantity: 2,
  deliveryId: '2',
}];


function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function matchingCheck(productId) {
 
  let matching;
  cart.forEach(cartItem => {
    if (cartItem.productId === productId) {
      matching = cartItem;
    }
  })
  return matching;
}


export function addTocartFunc(productId, selectedValue) {

  const matchingItem = matchingCheck(productId)
  if (matchingItem) {
    matchingItem.quantity += 1;
  }else if (matchingItem && selectedValue) {
    matchingItem.quantity = selectedValue;
  }  else {
    if (selectedValue){
      cart.push({
        productId,
        quantity: selectedValue,
        deliveryId: '1',
      })
    }else{
    cart.push({
      productId,
      quantity: 1,
      deliveryId: '2',
    }
    )
  }
  }
  updatingCartQuantity()
  saveToStorage()
}

export function updatingCartQuantity() {
  let total = 0;
  cart.forEach(item => {
    total += item.quantity
  })
  saveToStorage()
return total;
}



export function removeFromCart(productId) {
 let matching = matchingCheck(productId);
 let newCart= [];
 cart.forEach(item => {
  if (productId !== item.productId) {
    newCart.push(item)
  }
 })
 cart = newCart
 updatingCartQuantity;
 saveToStorage();

}