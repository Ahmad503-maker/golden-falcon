// Header shadow on scroll
window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    header.style.boxShadow = window.scrollY > 50 
        ? "0 5px 20px rgba(0,0,0,0.1)" 
        : "none";
});

// Mobile menu toggle
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");

toggle.addEventListener("click", function() {
    nav.classList.toggle("active");
});