// cashless-script.js

document.addEventListener('DOMContentLoaded', () => {
    // Select the unique wrapper for this page
    const wrapper = document.querySelector('.cashless-page-wrapper');
    
    if (wrapper) {
        // Only select elements INSIDE the wrapper to avoid conflicts
        const revealElements = wrapper.querySelectorAll('.cashless-reveal');

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('cashless-active');
                    observer.unobserve(entry.target); // Trigger animation once
                }
            });
        }, {
            root: null, 
            threshold: 0.15, // Trigger when 15% visible
            rootMargin: "0px 0px -50px 0px" // Smooth early trigger
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }
});