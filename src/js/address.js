import { $ } from "./constant.js";
import { setLocal, getLocal } from "./function.js";
const regexEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
const regexPhoneNumber = new RegExp(/^[0-9]{10,11}$/);

function saveAddressToLocal() {
  let checkEmail = true;
  let checkPhoneNumber = true;
  let dataUser = getLocal("address");

  $("#name").value = dataUser.name || "";
  $("#email").value = dataUser.email || "";
  $("#phone").value = dataUser.phone || "";
  $("#address").value = dataUser.address || "";

  $("#phone").onblur = function () {
    if (regexPhoneNumber.test($("#phone")?.value)) {
      $("#js-phone-error").innerHTML = ``;
      checkPhoneNumber = true;
    } else {
      $("#js-phone-error").innerHTML = `
        <p class="text-danger">Số điện thoại không hợp lệ</p>
      `;
      checkPhoneNumber = false;
    }
  };

  $("#email").onblur = function () {
    if (regexEmail.test($("#email")?.value)) {
      $("#js-email-error").innerHTML = ``;
      checkEmail = true;
    } else {
      $("#js-email-error").innerHTML = `
        <p class="text-danger">Email không hợp lệ</p>
      `;
      checkEmail = false;
    }
  };

  $("#checkout").addEventListener("click", function (e) {
    if (
      checkEmail &&
      checkPhoneNumber &&
      $("#email").value &&
      $("#phone").value &&
      $("#address").value &&
      $("#name").value
    ) {
      setLocal({
        key: "address",
        value: {
          name: $("#name").value,
          email: $("#email").value,
          phone: $("#phone").value,
          address: $("#address").value,
        },
      });
      window.location.href = "./order.html";
    }
  });
}

window.addEventListener("DOMContentLoaded", saveAddressToLocal);
