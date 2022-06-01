import { GET_PRODUCT, $, $$ } from "./constant.js";
import { setLocal, getLocal } from "./function.js";
import { showSuccessToast } from "./toast.js";
import { getQuantity } from "./getQuantity.js";

async function getProduct() {
  try {
    const { data } = await axios
      .get(GET_PRODUCT, { params })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        const { products, pagination } = data;
        renderProduct(products);
        renderPagination(pagination);
      });
  } catch (e) {
    console.log(e);
  }
}

async function loadProducts() {
  try {
    const { data } = getProduct();
    const payload = getLocal("cart");

    function addToCart(id) {
      showSuccessToast({ mes: "Thêm vào giỏ hàng thành công" });
      const result = data.find((element) => element.id === +id);

      const product = payload.filter(
        (element) => element.id === +id && (element.amount += 1)
      );

      if (product.length === 0) {
        payload.push({
          ...result,
          amount: 1,
        });
      }
      setLocal({ key: "cart", value: payload });
      getQuantity();
    }

    if (data) {
      let html = data.map((item, index) => {
        return `
            <div class="col-12 col-sm-6 col-lg-4 mb-3">
              <div class="product__image">
                <div class="tag-${item.tag}">
                  <img src=${item.urlImage} alt="product image" />
                  <div class="product__info">
                    <button class="icon"><i class="fa-solid fa-heart"></i>Yêu thích</button>
                    <button class="icon"><i class="fas fa-signal mr-1"></i>So sánh</button>
                    <button class="icon"><i class="fa-solid fa-down-left-and-up-right-to-center"></i></button>
                  </div>
                </div>
                <div class="product__content text-center">
                  <h3 class="product__title">${item.title}</h3>
                  <p class="main-price my-3">
                  ${(item.cost * 0.9).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                    <del class="product__cost">${item.cost.toLocaleString(
                      "vi-VN",
                      {
                        style: "currency",
                        currency: "VND",
                      }
                    )}</del>
                  </p>
                  <button class="button js-add-cart" data-id=${item.id}>
                    add to cart
                  </button>
                  <p class="product__description"></p>
                </div>
              </div>
            </div>
        `;
      });
      $("#js-product").innerHTML = html.join(" ");
      $$(".js-add-cart").forEach((item) =>
        item.addEventListener("click", () => addToCart(item.dataset.id))
      );
    }
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("DOMContentLoaded", loadProducts, getQuantity());
