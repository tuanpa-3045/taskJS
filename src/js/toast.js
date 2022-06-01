function toast({ title = "", message = "", type = "", duration = 3000 }) {
  const main = document.getElementById("toast");
  if (main) {
    const toastItem = document.createElement("div");

    // Auto remove toast
    const autoRemoveToast = setTimeout(function () {
      main.removeChild(toastItem);
    }, duration + 1000);

    toastItem.onclick = function (e) {
      if (e.target.closest(".toast-item__close")) {
        main.removeChild(toastItem);
        clearTimeout(autoRemoveToast);
      }
    };

    const icons = {
      success: "fas fa-check-circle",
      info: "fas fa-info-circle",
      warning: "fas fa-exclamation-circle",
      error: "fas fa-exclamation-circle",
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);

    toastItem.classList.add("toast-item", `toast-item--${type}`);
    toastItem.style.animation = `slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`;
    toastItem.innerHTML = `
          <div class="toast-item__icon">
            <i class="${icon}"></i>
          </div>
          <div class="toast-item__body">
            <h3 class="toast-item__title">${title}</h3>
            <p class=".toast-item__msg">${message}</p>
          </div>
          <div class="toast-item__close">
            <i class="fas fa-times"></i>
          </div>
      `;
    main.appendChild(toastItem);
  }
}

export function showSuccessToast({ mes }) {
  toast({
    title: " Thành công",
    message: mes,
    type: "success",
    duration: 1000,
  });
}

export function showErrorToast({ mes }) {
  toast({
    title: "Thất bại",
    message: mes,
    type: "error",
    duration: 1000,
  });
}
