// Global include script for header and footer
document.addEventListener("DOMContentLoaded", function () {
  // Load header
  fetch("/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;
      // Add header CSS link dynamically
      const headerCSS = document.createElement("link");
      headerCSS.rel = "stylesheet";
      headerCSS.href = "/css/style.css";
      document.head.appendChild(headerCSS);
    })
    .catch((error) => console.error("Error loading header:", error));

  // Load footer
  fetch("/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
      // Add footer CSS link dynamically
      const footerCSS = document.createElement("link");
      footerCSS.rel = "stylesheet";
      footerCSS.href = "/css/style.css";
      document.head.appendChild(footerCSS);
    })
    .catch((error) => console.error("Error loading footer:", error));
});
