document.addEventListener("DOMContentLoaded", () => {
  // ===== HERO SLIDER WITH CONTROLS =====
  {
    const slides = document.querySelectorAll(".hero .slide");
    const dotsContainer = document.querySelector(".slider-dots");
    const leftArrow = document.querySelector(".nav-arrow.left");
    const rightArrow = document.querySelector(".nav-arrow.right");

    if (slides.length > 0 && dotsContainer && leftArrow && rightArrow) {
      let currentSlide = 0;
      let slideInterval;

      slides.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });

      const dots = document.querySelectorAll(".slider-dots .dot");

      function showSlide(index) {
        slides.forEach((slide, i) => {
          slide.classList.remove("active");
          dots[i].classList.remove("active");
        });
        slides[index].classList.add("active");
        dots[index].classList.add("active");
        currentSlide = index;
      }

      function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      }

      function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
      }

      function goToSlide(index) {
        showSlide(index);
        resetInterval();
      }

      function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 2000);
      }

      function resetInterval() {
        clearInterval(slideInterval);
        startAutoSlide();
      }

      leftArrow.addEventListener("click", () => {
        prevSlide();
        resetInterval();
      });
      rightArrow.addEventListener("click", () => {
        nextSlide();
        resetInterval();
      });

      showSlide(currentSlide);
      startAutoSlide();
    }
  }

  // ===== SCROLL ANIMATION (first + second version merged safely) =====
  function handleScrollAnimations() {
    const triggerBottom = window.innerHeight * 0.85;
    const reveals = document.querySelectorAll(".reveal-left, .reveal-right");

    reveals.forEach((el, index) => {
      const boxTop = el.getBoundingClientRect().top;
      const boxBottom = el.getBoundingClientRect().bottom;

      if (boxTop < triggerBottom && boxBottom > 0) {
        el.style.transitionDelay = `${index * 0.15}s`;
        el.classList.add("active");
      } else {
        el.classList.remove("active");
        el.style.transitionDelay = "0s";
      }
    });
  }

  window.addEventListener("scroll", handleScrollAnimations);
  handleScrollAnimations();

  // ===== READ MORE TOGGLE =====
  const readMoreBtn = document.querySelector(".read-more-btn");
  const moreText = document.querySelector(".more-text");

  if (readMoreBtn && moreText) {
    readMoreBtn.addEventListener("click", () => {
      moreText.classList.toggle("open");
      readMoreBtn.textContent = moreText.classList.contains("open")
        ? "Read Less"
        : "Read More";
    });
  }

  // ===== SMOOTH SCROLLING =====
  const navLinkItems = document.querySelectorAll("a[href^='#']");
  navLinkItems.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.startsWith("#")) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // ===== Expertise Section Animation =====
  if (document.querySelector("[data-animate]")) {
    const cards = document.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach((card) => observer.observe(card));
  }

  // ===== UPDATED STATS COUNTER LOGIC =====
  if (document.querySelector("#stats")) {
    const counters = document.querySelectorAll(".counter");
    const section = document.querySelector("#stats");
    let triggered = false;

    const animateCounters = () => {
      const totalDuration = 2000; // All counters will finish in approx 2 seconds

      counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target");
        
        // Determine frames if running at 30ms intervals
        const minInterval = 30;
        const totalFrames = totalDuration / minInterval;

        let stepTime, increment;

        // If target is small (e.g., 8), we can't increment by less than 1.
        // So we slow down the timer instead.
        if (target < totalFrames) {
          stepTime = totalDuration / target; // Slower tick for small numbers
          increment = 1;
        } else {
          stepTime = minInterval; // Fast tick for large numbers
          increment = Math.ceil(target / totalFrames);
        }

        const updateCount = () => {
          const current = +counter.innerText;
          
          if (current < target) {
            const next = current + increment;
            counter.innerText = next > target ? target : next;
            // Use the dynamic stepTime
            setTimeout(updateCount, stepTime);
          } else {
            counter.innerText = target;
          }
        };
        
        updateCount();
      });
    };

    window.addEventListener("scroll", () => {
      // Logic: If section is visible
      const sectionTop = section.offsetTop - window.innerHeight + 200;
      if (!triggered && window.scrollY > sectionTop) {
        animateCounters();
        triggered = true;
      }
    });

    // Also try to trigger if already in view on load
    window.addEventListener("load", () => {
      const sectionTop = section.offsetTop - window.innerHeight + 200;
      if (!triggered && window.scrollY > sectionTop) {
        animateCounters();
        triggered = true;
      }
    });
  }

  // ===== WHY CHOOSE US =====
  const chooseBoxes = document.querySelectorAll(".choose-box");
  const revealChoose = () => {
    chooseBoxes.forEach((box, index) => {
      const boxTop = box.getBoundingClientRect().top;
      if (boxTop < window.innerHeight - 100) {
        setTimeout(() => box.classList.add("visible"), index * 200);
      }
    });
  };
  window.addEventListener("scroll", revealChoose);
  revealChoose();

  // ===== CLIENTS SECTION =====
  const slider = document.querySelector(".clients-slider");
  const track = document.querySelector(".clients-track");
  if (slider && track) {
    slider.addEventListener("mouseenter", () => {
      track.style.animationPlayState = "paused";
    });
    slider.addEventListener("mouseleave", () => {
      track.style.animationPlayState = "running";
    });
  }

  // ===== BLOGS SECTION =====
  const blogCards = document.querySelectorAll(".blog-card");
  function revealBlogs() {
    blogCards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < window.innerHeight - 100) {
        card.classList.add("visible");
      }
    });
  }
  window.addEventListener("scroll", revealBlogs);
  revealBlogs();
});