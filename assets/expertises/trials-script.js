document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".trials-page-wrapper");

  if (wrapper) {
    const revealElements = wrapper.querySelectorAll(".trials-reveal");

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("trials-active");
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
