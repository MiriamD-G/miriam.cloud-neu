const hamburgerSVG = document.querySelector(".hamburgerSVG");

const navMenu = document.querySelector(".nav-menu");

hamburgerSVG.addEventListener("click", () => {
    hamburgerSVG.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll("nav-link").forEach(n => n.addEventListener("click", () => {
    hamburgerSVG.classList.remove("active");
    navMenu.classList.remove("active");
}))