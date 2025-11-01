// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ---------- Typing effect (smooth) ----------
const roles = ["Java Developer", "C++ Enthusiast", "Student"];
let roleIdx = 0, charIdx = 0;
const roleEl = document.getElementById("role");

function typeLoop(){
  const txt = roles[roleIdx];
  if(charIdx <= txt.length){
    roleEl.textContent = txt.slice(0,charIdx);
    charIdx++;
    gsap.delayedCall(0.06, typeLoop);
  } else {
    gsap.delayedCall(1.2, eraseLoop);
  }
}
function eraseLoop(){
  const txt = roles[roleIdx];
  if(charIdx > 0){
    roleEl.textContent = txt.slice(0,charIdx-1);
    charIdx--;
    gsap.delayedCall(0.035, eraseLoop);
  } else {
    roleIdx = (roleIdx+1) % roles.length;
    gsap.delayedCall(0.2, typeLoop);
  }
}

// ---------- Projects data ----------
const projects = [
  {
    title: "Banking System using OOPs in Java",
    description: "A banking management system built using core Java and OOP principles. Supports deposits, withdrawals, and account management.",
    link: "https://github.com/relxgouranxh/Banking-System-using-OOPs-Java-"
  },
  {
    title: "Tic-Tac-Toe-java",
    description: "A simple 2-player Tic Tac Toe game made in Java (console-based). Learn turn-based logic, input validation, and game condition checking.",
    link: "https://github.com/relxgouranxh/Tic-Tac-Toe-java"
  },
  {
    title: "Hopping-Fibonacci",
    description: "🐇 Java console app that simulates rabbit population growth using the Fibonacci sequence! 🌿 Each month shows rabbits visually with 🐇, highlights total population, and uses ...more for large numbers. Perfect beginner project to learn loops, conditions, and visualize real-life growth patterns. 🚀",
    link: "https://github.com/relxgouranxh/Hopping-Fibonacci"
  },
  {
    title: "Quiz-file-handling",
    description: "A simple Java-based quiz application that demonstrates file handling, user input, and object-oriented programming (OOP). This project reads questions from a file, displays them to the user in a multiple-choice format, takes input, and optionally stores the score or results — perfect for Java beginners learning how to work with files and basic data structures.",
    link: "https://github.com/relxgouranxh/Quiz-file-handling"
  }
];

// Render project cards
function renderProjects(){
  const list = document.getElementById("projectList");
  list.innerHTML = "";
  projects.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "project";
    div.innerHTML = `<h3>${p.title}</h3><p>${p.description}</p><a href="${p.link}" target="_blank" rel="noopener">View on GitHub</a>`;
    list.appendChild(div);
    // add small tilt interaction
    div.addEventListener("mousemove", e=>{
      const r = div.getBoundingClientRect();
      const cx = r.left + r.width/2;
      const cy = r.top + r.height/2;
      const dx = (e.clientX - cx) / (r.width/2);
      const dy = (e.clientY - cy) / (r.height/2);
      gsap.to(div, {rotationY: dx*6, rotationX: -dy*6, scale:1.02, duration:0.6, ease:"power3.out"});
    });
    div.addEventListener("mouseleave", ()=> {
      gsap.to(div, {rotationY:0, rotationX:0, scale:1, duration:0.6, ease:"power3.out"});
    });
  });
}

// ---------- Hero entrance timeline ----------
function heroTimeline(){
  const tl = gsap.timeline();
  // subtle pop for card
  tl.from(".card-mock", {y:40, opacity:0, rotateX:8, duration:1.2, ease:"power4.out"}, 0.2);
  // intro texts
  tl.from(".intro", {y:20, opacity:0, duration:0.6, ease:"power3.out"}, 0.05);
  tl.from(".name", {y:24, opacity:0, duration:0.9, ease:"elastic.out(1,0.6)"}, 0.18);
  tl.from(".role", {y:18, opacity:0, duration:0.6, ease:"power3.out"}, 0.35);
  tl.from(".hero-desc", {y:14, opacity:0, duration:0.6, ease:"power3.out"}, 0.42);
  tl.from(".cta a", {y:14, opacity:0, stagger:0.08, duration:0.5, ease:"power3.out"}, 0.6);
  // glow pulse on name
  tl.to(".glow", {textShadow:"0 10px 45px rgba(0,188,212,0.28)", repeat:-1, yoyo:true, duration:1.8, ease:"sine.inOut"}, 1.1);
}

// ---------- Scroll-triggered reveals ----------
function setupScrollAnimations(){
  // reveal sections
  gsap.utils.toArray(".section").forEach(section=>{
    gsap.from(section, {
      y: 40, opacity: 0, duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // stagger project cards entrance
  gsap.from(".project", {
    y: 30, opacity:0, duration:0.9, stagger:0.12, ease:"power3.out",
    scrollTrigger:{
      trigger: "#projects",
      start: "top 80%"
    }
  });

  // parallax for hero-right card
  gsap.to(".card-mock", {
    yPercent: -8, ease:"none",
    scrollTrigger:{
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      scrub: 0.6
    }
  });
}

// ---------- Canvas particles background ----------
function startBgCanvas(){
  const canvas = document.getElementById("bgCanvas");
  const ctx = canvas.getContext("2d");
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;
  const num = Math.floor((w*h)/70000);
  const particles = [];

  function rand(min,max){ return Math.random()*(max-min)+min; }

  function init(){
    particles.length = 0;
    for(let i=0;i<num;i++){
      particles.push({
        x: rand(0,w),
        y: rand(0,h),
        r: rand(0.6,2.6),
        vx: rand(-0.2,0.6),
        vy: rand(-0.15,0.15),
        hue: rand(190,205),
        alpha: rand(0.08,0.22)
      });
    }
  }

  function resize(){
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    init();
  }

  function draw(){
    ctx.clearRect(0,0,w,h);
    // subtle gradient overlay
    const grad = ctx.createLinearGradient(0,0,w,h);
    grad.addColorStop(0,"rgba(0,24,42,0.06)");
    grad.addColorStop(1,"rgba(0,8,14,0.06)");
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,w,h);

    particles.forEach(p=>{
      p.x += p.vx;
      p.y += p.vy;
      if(p.x > w+20) p.x = -20;
      if(p.x < -20) p.x = w+20;
      if(p.y > h+20) p.y = -20;
      if(p.y < -20) p.y = h+20;

      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue},80%,60%,${p.alpha})`;
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    });

    // connect near particles (very subtle)
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const a=particles[i], b=particles[j];
        const dx=a.x-b.x, dy=a.y-b.y;
        const d = Math.sqrt(dx*dx+dy*dy);
        if(d<90){
          ctx.strokeStyle = `rgba(0,188,212,${0.02*(1 - d/90)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", gsap.utils.debounce(resize, 200));
  init();
  draw();
}

// ---------- initialization ----------
document.addEventListener("DOMContentLoaded", ()=>{
  // projects + typing
  renderProjects();
  typeLoop();

  // initial animations
  heroTimeline();
  setupScrollAnimations();
  startBgCanvas();

  // smooth nav links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener("click", e=>{
      const target = document.querySelector(a.getAttribute("href"));
      if(target){
        e.preventDefault();
        gsap.to(window, {scrollTo: {y: target, offsetY:72}, duration:1, ease:"power2.out"});
      }
    });
  });
});

