// Responsive Navbar Toggle
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
    navLinks.classList.remove("active");
  });
});

// Typing Effect for Hero Section
const roles = ["Java Developer", "C++ Programmer", "Software Enthusiast"];
let roleIndex = 0;
let charIndex = 0;
const roleElement = document.createElement("span");
roleElement.className = "typing";
document.querySelector(".hero p").after(roleElement);

function typeRole() {
  if (charIndex < roles[roleIndex].length) {
    roleElement.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeRole, 100);
  } else {
    setTimeout(eraseRole, 1500);
  }
}

function eraseRole() {
  if (charIndex > 0) {
    roleElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseRole, 50);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 300);
  }
}
typeRole();

// Glow & Entrance Animation
window.addEventListener("load", () => {
  const heroText = document.querySelector(".glow");
  heroText.style.opacity = 0;
  heroText.style.transform = "scale(0.9)";
  setTimeout(() => {
    heroText.style.transition = "1s ease";
    heroText.style.opacity = 1;
    heroText.style.transform = "scale(1)";
  }, 400);

  // Animate navbar appearance
  const navbar = document.querySelector(".navbar");
  navbar.style.opacity = 0;
  setTimeout(() => {
    navbar.style.transition = "1.2s ease";
    navbar.style.opacity = 1;
  }, 200);
});

// Parallax background effect
document.addEventListener("mousemove", (e) => {
  const moveX = (e.clientX * 0.02);
  const moveY = (e.clientY * 0.02);
  document.body.style.backgroundPosition = `${moveX}px ${moveY}px`;
});

// Project Card 3D Hover Animation
const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    card.style.boxShadow = `0 0 30px rgba(33,150,243,0.7)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
  });
});
