// ===== MENU TOGGLE =====
{
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("open");
  });
}

// ===== HERO SLIDER WITH CONTROLS =====
{
  const slides = document.querySelectorAll(".hero .slide");
  const dotsContainer = document.querySelector(".slider-dots");
  const leftArrow = document.querySelector(".nav-arrow.left");
  const rightArrow = document.querySelector(".nav-arrow.right");

  let currentSlide = 0;
  let slideInterval;

  // Create dots dynamically
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

  // Auto slide every 5s
  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  // Event listeners for arrows
  leftArrow.addEventListener("click", () => {
    prevSlide();
    resetInterval();
  });
  rightArrow.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });

  // Initialize
  showSlide(currentSlide);
  startAutoSlide();
}

// ===== SCROLL ANIMATION (first version with delay) =====
{
  const reveals = document.querySelectorAll(".reveal-left, .reveal-right");

  function handleScrollOne() {
    const triggerBottom = window.innerHeight * 0.85;

    reveals.forEach((el, index) => {
      const boxTop = el.getBoundingClientRect().top;
      const boxBottom = el.getBoundingClientRect().bottom;

      if (boxTop < triggerBottom && boxBottom > 0) {
        setTimeout(() => {
          el.classList.add("active");
        }, index * 200);
      } else {
        el.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", handleScrollOne);
  window.addEventListener("load", handleScrollOne);
}

// ===== READ MORE TOGGLE (first version) =====
{
  const readMoreBtn = document.querySelector(".read-more-btn");
  const moreText = document.querySelector(".more-text");

  if (readMoreBtn) {
    readMoreBtn.addEventListener("click", () => {
      moreText.classList.toggle("open");
      readMoreBtn.textContent = moreText.classList.contains("open")
        ? "Read Less"
        : "Read More";
    });
  }
}

// ===== SCROLL REVEAL (second version with replay + stagger) =====
{
  function handleScrollTwo() {
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

  window.addEventListener("scroll", handleScrollTwo);
  window.addEventListener("load", handleScrollTwo);
}

// ===== READ MORE / READ LESS TOGGLE (About Section second version) =====
{
  const readMoreBtn2 = document.querySelector(".read-more-btn");
  const moreText2 = document.querySelector(".more-text");

  if (readMoreBtn2 && moreText2) {
    readMoreBtn2.addEventListener("click", () => {
      moreText2.classList.toggle("open");
      readMoreBtn2.textContent = moreText2.classList.contains("open")
        ? "Read Less"
        : "Read More";
    });
  }
}

// ===== SMOOTH SCROLLING FOR NAVBAR LINKS =====
{
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
}
// ===== Expertise Section Animation =====
document.addEventListener("DOMContentLoaded", () => {
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
});

//=====counter animation=====//
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      let speed;

      // Set speed based on target value
      if (target <= 10) speed = 70;         // slower (for 6+)
      else if (target <= 30) speed = 180;    // medium-slow (for 25+)
      else if (target <= 70) speed = 60;     // faster (for 60+)
      else speed = 40;                       // fastest (for 100+)

      const updateCount = () => {
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    });
  };

  const section = document.querySelector("#stats");
  let triggered = false;

  window.addEventListener("scroll", () => {
    const sectionTop = section.offsetTop - window.innerHeight + 200;
    if (!triggered && window.scrollY > sectionTop) {
      animateCounters();
      triggered = true;
    }
  });
});

//=======why choose us========
// Scroll Animation for Why Choose Us Boxes (One by One)
const chooseBoxes = document.querySelectorAll(".choose-box");

window.addEventListener("scroll", () => {
  chooseBoxes.forEach((box, index) => {
    const boxTop = box.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight - 100;
    if (boxTop < triggerPoint) {
      setTimeout(() => {
        box.classList.add("visible");
      }, index * 200); // delay each box by 200ms
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".choose-box");
  const reveal = () => {
    boxes.forEach(box => {
      const rect = box.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        box.classList.add("visible");
      }
    });
  };
  window.addEventListener("scroll", reveal);
  reveal();
});

//========== CLIENTS SECTION ==========
const slider = document.querySelector('.clients-slider');
const track = document.querySelector('.clients-track');

slider.addEventListener('mouseenter', () => {
  track.style.animationPlayState = 'paused';
});

slider.addEventListener('mouseleave', () => {
  track.style.animationPlayState = 'running';
});

/*==========BLOGS SECTION==========*/
document.addEventListener("DOMContentLoaded", function() {
  const cards = document.querySelectorAll(".blog-card");

  function revealOnScroll() {
    cards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < window.innerHeight - 100) {
        card.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});


