document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Load header
    const headerResponse = await fetch("../header.html");
    const headerHTML = await headerResponse.text();
    document.getElementById("header").innerHTML = headerHTML;

    // Load footer
    const footerResponse = await fetch("../footer.html");
    const footerHTML = await footerResponse.text();
    document.getElementById("footer").innerHTML = footerHTML;

    // Ensure main stylesheet is loaded only once
    if (!document.querySelector('link[href*="style.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "../css/style.css";
      document.head.appendChild(link);
    }
  } catch (err) {
    console.error("Include load failed:", err);
  }
});
