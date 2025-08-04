export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function orderFun(order) {
  orders.unshift(order);
  saveToStorage();

}

function saveToStorage() {
  localStorage.setItem('order', JSON.stringify(orders))
}