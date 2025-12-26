document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".medico-page-wrapper");

  if (wrapper) {
    const revealElements = wrapper.querySelectorAll(".medico-reveal");

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("medico-active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }
});
