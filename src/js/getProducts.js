// import { GET_PRODUCT } from "./constant";
const URL_BASE = "http://localhost:8000";
const GET_PRODUCT = `${URL_BASE}/products`;

async function getProduct() {
  const response = await fetch(GET_PRODUCT);
  return response.json();
}

async function loadProducts() {
  try {
    const data = await getProduct();
    if (data) {
      let html = data.map((item, index) => {
        return `
                  <div class="tag-sale"><img src="./assets/images/Product/9.jpg" alt="product image" />
                  </div>
                  <div class="product__content col-6 col-sm-6">
                    <h3 class="product__title">rượu vang đà lạt</h3>
                    <p class="main-price my-3">370.000<sup>Đ</sup>
                      <del class="product__cost">450.000<sup>Đ</sup></del>
                    <p class="intro">Một hợp chất có trong rượu vang được gọi là resveratro có khả năng làm tăng tối đa
                      tuổi thọ. Resveratro còn có khả năng ngăn chặn mật độ ôxy hoá của protein béo.</p>
                    </p>
                    <button class="button">add to cart</button>
                    <p class="product__description"></p>
                  </div>
        `;
      });
      document.getElementById("product").innerHTML = html.join("");
    }
  } catch (e) {
    console.log(e);
  }
}

window.addEventListener("DOMContentLoaded", loadProducts);
