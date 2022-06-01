import { $, $$ } from "./constant.js";
import { getLocal } from "./function.js";

export function getQuantity() {
  try {
    let initialValue = 0;
    const localCart = getLocal("cart");

    localCart.map((item) => (initialValue += item.amount));

    $("#amount").innerHTML = initialValue;
  } catch (e) {
    console.log(e);
  }
}
