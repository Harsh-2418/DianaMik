document.addEventListener('DOMContentLoaded', () => {
    
    // Select all elements with the 'reveal' class
    const reveals = document.querySelectorAll('.reveal');

    // Create an Intersection Observer
    // This API monitors when elements enter the viewport (screen)
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is visible on screen
            if (entry.isIntersecting) {
                // Add the 'active' class to trigger the CSS transition
                entry.target.classList.add('active');
                
                // Optional: Stop observing once revealed (so it doesn't animate again when scrolling up)
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // Viewport is the root
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Slight offset to trigger before bottom
    });

    // Start observing each reveal element
    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // Optional: Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});