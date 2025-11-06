// include.js — handles dynamic header/footer import + navbar initialization

document.addEventListener("DOMContentLoaded", () => {
  // ===== Load HEADER =====
  const header = document.getElementById("header");
  if (header) {
    fetch("/header.html")
      .then((res) => res.text())
      .then((data) => {
        header.innerHTML = data;
        initNavbar(); // ✅ Initialize navbar after header is added
      })
      .catch((err) => console.error("Error loading header:", err));
  }

  // ===== Load FOOTER =====
  const footer = document.getElementById("footer");
  if (footer) {
    fetch("/footer.html")
      .then((res) => res.text())
      .then((data) => {
        footer.innerHTML = data;
      })
      .catch((err) => console.error("Error loading footer:", err));
  }
});

// ===== Initialize Navbar Logic =====
function initNavbar() {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const dropdowns = document.querySelectorAll(".dropdown > a");

  if (!menuToggle || !navLinks) {
    console.warn("Navbar elements not found — skipping init.");
    return;
  }

  // Toggle navbar open/close (hamburger)
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show-menu");
    menuToggle.classList.toggle("active");
  });

  // Close menu when link clicked (optional — uncomment if needed)
  // navLinks.querySelectorAll("a").forEach((link) => {
  //   link.addEventListener("click", () => {
  //     navLinks.classList.remove("show-menu");
  //     menuToggle.classList.remove("active");
  //   });
  // });

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
}
