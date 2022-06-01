import { $ } from "./constant.js";
import { getLocal } from "./function.js";

function getOrder() {
  const localCart = getLocal("cart");
  const address = getLocal("address");

  let htmlProduct,
    htmlUser,
    totalAmount = 0,
    totalMoney = 0;

  if (localCart.length > 0) {
    htmlProduct = localCart.map((item, index) => {
      totalAmount += item.amount;
      totalMoney += item.amount * item.cost;
      return `
        <tr class="cart__row">
          <td scope="row"><img src=${item.urlImage} alt="cart image"/></td>
          <td>${item.title}</td>
          <td>${item.cost.toLocaleString()}</td>
          <td>
            ${item.amount}
          </td>
          <td>${(item.cost * item.amount).toLocaleString()} </td>
        </tr>
      `;
    });
  }

  htmlUser = `
    <li class="order__item"><i class="fas fa-user d-block mr-1"></i>
      <div>
        <p>${address.name}</p>
        <p>${address.email}</p>
      </div>
    </li>
    <li class="order__item"><i class="fas fa-map-marker-alt mr-1"></i>
      <p>${address.address}</p>
    </li>
    <li class="order__item"><i class="fa-solid fa-phone mr-1"></i>
      <p>${address.phone}</p>
    </li>
  `;

  $("#js-cart-table").innerHTML = htmlProduct.join(" ");
  $("#js-cart-user").innerHTML = htmlUser;
  $("#js-total-amount").innerHTML = totalAmount;
  $("#js-total-money").innerHTML = totalMoney.toLocaleString();
  $("#js-finish").addEventListener("click", () => {
    localStorage.removeItem("cart");
    window.location.href = "./complete.html";
  });
}

window.addEventListener("DOMContentLoaded", getOrder);
