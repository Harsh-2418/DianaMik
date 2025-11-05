document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.getElementById("gallery-grid");

  const totalImages = 37;
  const images = Array.from({ length: totalImages }, (_, i) => `/gallery/images/image${i + 1}.jpg`);

  // Generate images
  images.forEach((src, index) => {
    const item = document.createElement("div");
    item.classList.add("masonry-item");
    item.innerHTML = `
      <img src="${src}" alt="Gallery Image ${index + 1}" loading="lazy">
    `;
    galleryGrid.appendChild(item);
  });

  // Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close");

  galleryGrid.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      lightbox.style.display = "flex";
      lightboxImg.src = e.target.src;
    }
  });

  closeBtn.addEventListener("click", () => (lightbox.style.display = "none"));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.style.display = "none";
  });
});
