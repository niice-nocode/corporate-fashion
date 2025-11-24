gsap.registerPlugin(CustomEase);

CustomEase.create( "main", "0.65, 0.01, 0.05, 0.99" );

gsap.defaults({
  ease:"main",
  duration:0.7
});
  
function initSideNavWipeEffect(){

  let navWrap = document.querySelector("[data-sidenav-wrap]");
  let state = navWrap.getAttribute("data-nav-state");
  let overlay = navWrap.querySelector("[data-sidenav-overlay]");
  let menu = navWrap.querySelector("[data-sidenav-menu]");
  let bgPanels = navWrap.querySelectorAll("[data-sidenav-panel]");
  let menuToggles = document.querySelectorAll("[data-sidenav-toggle]");
  let menuLinks = navWrap.querySelectorAll("[data-sidenav-link]");
  let fadeTargets = navWrap.querySelectorAll("[data-sidenav-fade]");
  let menuButton = document.querySelector("[data-sidenav-button]");
  let menuButtonTexts = menuButton.querySelectorAll("[data-sidenav-label]");
  let menuButtonIcon = menuButton.querySelector("[data-sidenav-icon]");

  let tl = gsap.timeline()
  
  const openNav = () =>{
    navWrap.setAttribute("data-nav-state", "open");
    menu.style.position = "fixed";
    menu.style.top = "0";
    menu.style.right = "0";
    menu.style.bottom = "0";
    menu.style.width = "100%";
    menu.style.height = "100vh";

    tl.clear()
    .set(navWrap,{display:"block"})
    .set(menu,{xPercent:0},"<")
    .fromTo(menuButtonTexts,{yPercent:0},{yPercent:-100,stagger:0.2})
    .fromTo(menuButtonIcon,{rotate:0},{rotate:315},"<")
    .fromTo(overlay,{autoAlpha:0},{autoAlpha:1},"<")
    .fromTo(bgPanels,{xPercent:101},{xPercent:0,stagger:0.12,duration: 0.575},"<")
    .fromTo(menuLinks,{yPercent:140,rotate:10},{yPercent:0, rotate:0,stagger:0.05},"<+=0.35")
    .fromTo(fadeTargets,{autoAlpha:0,yPercent:50},{autoAlpha:1, yPercent:0,stagger:0.04},"<+=0.2");
  }
  
  const closeNav = () =>{
    navWrap.setAttribute("data-nav-state", "closed");
    menu.style.position = "";
    menu.style.top = "";
    menu.style.right = "";
    menu.style.bottom = "";
    menu.style.width = "";
    menu.style.height = "";

    tl.clear()
    .to(overlay,{autoAlpha:0})
    .to(menu,{xPercent:120},"<")
    .to(menuButtonTexts,{yPercent:0},"<")
    .to(menuButtonIcon,{rotate:0},"<")
    .set(navWrap,{display:"none"});
  }  
  
  // Toggle menu open / close depending on its current state
  menuToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      state = navWrap.getAttribute("data-nav-state");
      if (state === "open") {
        closeNav();
      } else {
        openNav();
      }
    });    
  });
  
  // If menu is open, you can close it using the "escape" key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navWrap.getAttribute("data-nav-state") === "open") {
      closeNav();
    }
  });
}

// Initialize Draggable Infinite GSAP Slider
document.addEventListener("DOMContentLoaded", () => {
  initSideNavWipeEffect();
});