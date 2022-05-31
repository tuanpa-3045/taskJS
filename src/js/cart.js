import { $, $$ } from "./constant.js";
import { setLocal, getLocal } from "./function.js";

async function getToCart() {
  try {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];

    const handleDecrease = (id) => {
      const result = localCart.find((element) => element.id === +id);

      if (result.amount > 1) {
        result.amount -= 1;
      }

      setLocal({ key: "cart", value: localCart });
      getToCart();
    };

    const handleIncrease = (id) => {
      const result = localCart.find((element) => element.id === +id);
      result.amount += 1;

      setLocal({ key: "cart", value: localCart });
      getToCart();
    };

    const handleDelete = (id) => {
      const modalDelete = $("#js-modal-delete");

      modalDelete.setAttribute("data-id", id);
      modalDelete.onclick = () => {
        const result = localCart.find((element) => element.id === +id);
        localCart.splice(localCart.indexOf(result), 1);

        setLocal({ key: "cart", value: localCart });
        getToCart();
      };
    };

    let html;
    if (localCart.length > 0) {
      html = localCart.map((item, index) => {
        return `
        <tr class="cart__row">
          <td scope="row"><img src=${item.urlImage} alt="cart image"/></td>
          <td>${item.title}</td>
          <td>${item.cost.toLocaleString()}</td>
          <td>
            <button data-id=${item.id} class="decrease"> -
            </button>
            ${item.amount}
            <button data-id=${item.id} class="increase"> +
            </button>
          </td>
          <td>${(item.cost * item.amount).toLocaleString()}</td>
          <td>
            <button
              type="button"
              class="btn btn-danger deleteProduct"
              data-id=${item.id}
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      `;
      });
    } else {
      html = `<tr><td colspan="100%" style="text-align: center" >Không có sản phẩm nào trong giỏ hàng. <a href="/list-category-product.html"> Đi đến trang mua hàng </a> </td></tr>`;
    }
    $("#js-cart-table").innerHTML =
      localCart.length > 0 ? html.join(" ") : html;

    $$(".decrease").forEach((item) =>
      item.addEventListener("click", () => handleDecrease(item.dataset.id))
    );

    $$(".increase").forEach((item) =>
      item.addEventListener("click", () => handleIncrease(item.dataset.id))
    );

    $$(".deleteProduct").forEach((item) => {
      item.addEventListener("click", () => handleDelete(item.dataset.id));
    });
  } catch (e) {
    console.log(e);
  }
}

window.addEventListener("DOMContentLoaded", getToCart);
