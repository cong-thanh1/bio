const toast = document.querySelector('.toast');
let toastTimer;

document.querySelectorAll('.copy-button').forEach((button) => {
  button.addEventListener('click', async () => {
    const value = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      button.classList.add('copied');
      toast.textContent = `Đã sao chép: ${value}`;
      toast.classList.add('show');
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => {
        toast.classList.remove('show');
        button.classList.remove('copied');
      }, 1800);
    } catch {
      toast.textContent = `Số tài khoản: ${value}`;
      toast.classList.add('show');
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2400);
    }
  });
});
