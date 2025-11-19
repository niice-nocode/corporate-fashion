function initProjectHoverButtons() {
  // Select all project images
  const projectImages = document.querySelectorAll('.project_image');
  
  projectImages.forEach(image => {
    // Find or create the case_button within this specific project image
    let hoverButton = image.querySelector('.case_button');
    
    if (!hoverButton) {
      console.warn('case_button not found in project_image');
      return;
    }
    
    // Initial setup - hide button and position it
    gsap.set(hoverButton, {
      opacity: 0,
      scale: 0.8,
      xPercent: -50,
      yPercent: -50
    });
    
    // QuickTo for smooth following
    let xTo = gsap.quickTo(hoverButton, "x", { duration: 0.6, ease: "power3.out" });
    let yTo = gsap.quickTo(hoverButton, "y", { duration: 0.6, ease: "power3.out" });
    
    // Mouse enter - show button
    image.addEventListener('mouseenter', (e) => {
      gsap.to(hoverButton, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    });
    
    // Mouse move - follow cursor within the image bounds
    image.addEventListener('mousemove', (e) => {
      const rect = image.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      xTo(x);
      yTo(y);
    });
    
    // Mouse leave - hide button
    image.addEventListener('mouseleave', () => {
      gsap.to(hoverButton, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in"
      });
    });
  });
}

// Initialize after DOM is loaded and after GSAP animations
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure GSAP scroll animations are initialized
  setTimeout(() => {
    initProjectHoverButtons();
  }, 100);
});