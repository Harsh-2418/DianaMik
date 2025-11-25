// jci-script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scoped Reveal Animation
    const wrapper = document.querySelector('.jci-page-wrapper');
    
    if (wrapper) {
        const revealElements = wrapper.querySelectorAll('.jci-reveal');

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('jci-active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null, 
            threshold: 0.15, 
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }
});