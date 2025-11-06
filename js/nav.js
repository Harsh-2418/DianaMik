 document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const dropdowns = document.querySelectorAll(".dropdown > a");

    // Toggle navbar open/close
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show-menu");
      menuToggle.classList.toggle("active");
    });

    // Dropdowns for mobile
    dropdowns.forEach((drop) => {
      drop.addEventListener("click", (e) => {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          const parent = drop.parentElement;
          parent.classList.toggle("active");
        }
      });
    });
  });
