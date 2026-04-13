// ===========================
//  PORTFÓLIO - script.js
// ===========================

// ---- Navbar scroll ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ---- Hamburger / mobile nav ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Fecha ao clicar em link
navLinks.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ---- Active nav link por seção ----
const sections  = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navItems.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${id}`) a.classList.add('active');
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// ---- Partículas no hero ----
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = window.innerWidth < 768 ? 25 : 50;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const x    = Math.random() * 100;
    const size = Math.random() * 3 + 1;
    const dur  = Math.random() * 8 + 6;
    const del  = Math.random() * 10;

    p.style.cssText = `
      left: ${x}%;
      bottom: ${Math.random() * 30}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${dur}s;
      animation-delay: ${del}s;
      opacity: ${Math.random() * 0.5 + 0.2};
    `;

    // Algumas partículas com cor diferente
    if (Math.random() > 0.6) {
      p.style.background = 'var(--accent2)';
    } else if (Math.random() > 0.8) {
      p.style.background = 'var(--accent3)';
    }

    container.appendChild(p);
  }
}

createParticles();

// ---- Cursor glow suave (desktop only) ----
if (window.innerWidth > 900) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,245,196,0.04) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
    left: -200px; top: -200px;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

// ---- Scroll reveal com IntersectionObserver ----
const revealEls = document.querySelectorAll(
  '.skill-card, .projeto-card, .tl-item, .sobre-text p, .info-item, .contato-texto, .contato-form'
);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ---- Animação da skill-bar ao entrar na tela ----
const skillBars = document.querySelectorAll('.skill-fill');

const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      // Força o reflow para reiniciar a animação
      el.style.animationPlayState = 'running';
      barObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });

skillBars.forEach(bar => {
  bar.style.animationPlayState = 'paused';
  barObserver.observe(bar);
});

// ---- Formulário de contato ----
const form = document.getElementById('contato-form');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;

    btn.innerHTML = 'Enviando... ⏳';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    // Simula envio (substitua por fetch real)
    setTimeout(() => {
      btn.innerHTML = 'Mensagem enviada! ✅';
      btn.style.background = '#00c46e';

      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.background = '';
        form.reset();
      }, 3000);
    }, 1500);
  });
}

// ---- Typing effect no nome (hero) ----
function typeEffect(element, text, speed = 90) {
  if (!element) return;
  element.textContent = '';
  let i = 0;
  const cursor = element.nextElementSibling;

  const interval = setInterval(() => {
    element.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      // Mantém o cursor piscando mas o texto completo
    }
  }, speed);
}

// Aguarda animação de entrada antes do typing
window.addEventListener('load', () => {
  setTimeout(() => {
    const nameLine = document.querySelector('.name-line');
    if (nameLine) {
      // Guarda o cursor
      const cursorSpan = nameLine.querySelector('.cursor-blink');
      const nameText = 'Danilo Ortiz'; // ← TROQUE PELO SEU NOME
      nameLine.childNodes.forEach(n => {
        if (n.nodeType === Node.TEXT_NODE) n.remove();
      });
      nameLine.insertBefore(document.createTextNode(''), cursorSpan);

      let i = 0;
      const textNode = nameLine.childNodes[0];
      const interval = setInterval(() => {
        textNode.textContent += nameText[i];
        i++;
        if (i >= nameText.length) clearInterval(interval);
      }, 100);
    }
  }, 600);
});

// ---- Smooth scroll com offset para navbar ----
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    const offset = document.querySelector('.navbar').offsetHeight + 20;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ---- Parallax sutil no hero grid ----
window.addEventListener('scroll', () => {
  const grid = document.querySelector('.hero-grid');
  if (!grid) return;
  const y = window.scrollY * 0.3;
  grid.style.transform = `translateY(${y}px)`;
}, { passive: true });

// ---- Hover 3D suave nos cards ----
document.querySelectorAll('.skill-card, .projeto-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect   = card.getBoundingClientRect();
    const cx     = rect.left + rect.width / 2;
    const cy     = rect.top + rect.height / 2;
    const dx     = (e.clientX - cx) / (rect.width / 2);
    const dy     = (e.clientY - cy) / (rect.height / 2);
    const rotX   = -dy * 5;
    const rotY   =  dx * 5;
    card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ---- Contagem animada nos stats ----
function animateCounter(el, target, duration = 1200) {
  const start = 0;
  const step  = (timestamp, startTime) => {
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(start + (target - start) * ease) + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(ts => step(ts, startTime));
  };
  requestAnimationFrame(ts => step(ts, ts));
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-n');
      nums.forEach(n => {
        const val = parseInt(n.textContent);
        if (!isNaN(val)) {
          n.dataset.suffix = n.textContent.replace(/\d+/, '');
          animateCounter(n, val);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);

console.log('%c🚀 Portfólio carregado!', 'color: #00f5c4; font-size: 16px; font-weight: bold;');
console.log('%c✨ Feito com HTML, CSS & JS puro', 'color: #9aaec1; font-size: 12px;');