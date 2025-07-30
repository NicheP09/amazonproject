export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2,
  deliveryId: '1',
}, {
   productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1,
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

export function updateDeliveryFunc(productId, optionId){
  let matching;
  cart.forEach(cartItem => {
    if (cartItem.productId === productId) {
      matching = cartItem;
    }
  })
 
  matching.deliveryId = optionId;
  saveToStorage();
}