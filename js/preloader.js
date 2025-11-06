// ======== Preloader with 3-Second Delay ========
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  // Keep the preloader for at least 3 seconds
  setTimeout(() => {
    preloader.classList.add("hidden");
  }, 2000); // 2000ms = 2 seconds
});
