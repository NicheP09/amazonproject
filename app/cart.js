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
export function addTocartFunc(productId) {
  const matchingItem = matchingCheck(productId)
  
  if (matchingItem) {
    matchingItem.quantity += 1;
  }else {
    cart.push({
      productId,
      quantity: 1,
    }
    )
  }

}