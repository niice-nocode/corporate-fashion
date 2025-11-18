// Project Image Hover - Cursor Following Button
document.addEventListener('DOMContentLoaded', function() {
  
  // Check of GSAP beschikbaar is
  if (typeof gsap === 'undefined') {
    console.error('GSAP is niet geladen!');
    return;
  }

  const projectImages = document.querySelectorAll('.project_image');
  
  projectImages.forEach((image) => {
    const caseButton = image.querySelector('.case_button');
    
    if (!caseButton) {
      console.warn('Geen .case_button gevonden in:', image);
      return;
    }

    // Zet button op fixed positioning
    caseButton.style.position = 'fixed';
    caseButton.style.pointerEvents = 'none';
    caseButton.style.zIndex = '1000';
    
    // Start state
    gsap.set(caseButton, {
      opacity: 0,
      scale: 0.8
    });

    let isHovering = false;

    // Mouse enter - toon button
    image.addEventListener('mouseenter', function() {
      isHovering = true;
      
      gsap.to(caseButton, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        delay: 0.2,
        ease: 'expo.out'
      });
    });

    // Mouse move - volg cursor
    image.addEventListener('mousemove', function(e) {
      if (isHovering) {
        gsap.to(caseButton, {
          x: e.clientX,
          y: e.clientY,
          xPercent: -50,
          yPercent: -50,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    });

    // Mouse leave - verberg button
    image.addEventListener('mouseleave', function() {
      isHovering = false;
      
      gsap.to(caseButton, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.in'
      });
    });
  });
});