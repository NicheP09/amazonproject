export let cart =  [];


function matchingCheck(productId) {
 
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
      })
    }else{
    cart.push({
      productId,
      quantity: 1,
    }
    )
  }
  }
}

export function updatingCartQuantity() {
  let total = 0;
  cart.forEach(item => {
    total += item.quantity
  })
  return total;
}

