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

   console.log(selectedValue)
  const matchingItem = matchingCheck(productId)
  
 if (matchingItem && selectedValue) {
    matchingItem.quantity = selectedValue;
  }else if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
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
