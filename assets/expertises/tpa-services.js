document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".tpa-page-wrapper");

  if (wrapper) {
    const revealElements = wrapper.querySelectorAll(".tpa-reveal");

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("tpa-active");
            observer.unobserve(entry.target); // Trigger once
          }
        });
      },
      {
        root: null,
        threshold: 0.1, // Trigger slightly earlier
        rootMargin: "0px 0px -50px 0px",
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }
});
