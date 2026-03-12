/* ================================================
   ASTUCES WHATSAPP – script.js
   ================================================ */

/* ===== BURGER MENU ===== */
const burger = document.getElementById('burger');
const nav    = document.getElementById('nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  });

  // Fermer le menu au clic sur un lien
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', false);
    });
  });

  // Fermer le menu au clic en dehors
  document.addEventListener('click', e => {
    if (!burger.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', false);
    }
  });
}

/* ===== FAQ ACCORDION ===== */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    const answer = btn.nextElementSibling;

    // Fermer tous les autres
    document.querySelectorAll('.faq-question').forEach(other => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        other.nextElementSibling.classList.remove('open');
      }
    });

    // Toggler l'actuel
    btn.setAttribute('aria-expanded', !isOpen);
    answer.classList.toggle('open', !isOpen);
  });
});

/* ===== FORMULAIRE DE CONTACT ===== */
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    // Validation nom
    const name = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    if (!name.value.trim() || name.value.trim().length < 2) {
      nameError.textContent = 'Veuillez entrer votre nom (au moins 2 caractères).';
      name.style.borderColor = '#dc2626';
      valid = false;
    } else {
      nameError.textContent = '';
      name.style.borderColor = '';
    }

    // Validation email
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      emailError.textContent = 'Veuillez entrer une adresse e-mail valide.';
      email.style.borderColor = '#dc2626';
      valid = false;
    } else {
      emailError.textContent = '';
      email.style.borderColor = '';
    }

    // Validation sujet
    const subject = document.getElementById('subject');
    const subjectError = document.getElementById('subjectError');
    if (!subject.value) {
      subjectError.textContent = 'Veuillez choisir un sujet.';
      subject.style.borderColor = '#dc2626';
      valid = false;
    } else {
      subjectError.textContent = '';
      subject.style.borderColor = '';
    }

    // Validation message
    const message = document.getElementById('message');
    const messageError = document.getElementById('messageError');
    if (!message.value.trim() || message.value.trim().length < 20) {
      messageError.textContent = 'Votre message doit contenir au moins 20 caractères.';
      message.style.borderColor = '#dc2626';
      valid = false;
    } else {
      messageError.textContent = '';
      message.style.borderColor = '';
    }

    if (valid) {
      // Simuler l'envoi (remplacez par votre logique d'envoi réelle)
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Envoi en cours…';
      submitBtn.disabled = true;

      setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
      }, 1200);
    }
  });

  // Réinitialiser la couleur de bordure à la saisie
  contactForm.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.style.borderColor = '';
    });
  });
}

/* ===== SCROLL REVEAL (intersection observer) ===== */
const revealEls = document.querySelectorAll(
  '.card, .tip-item, .feature-card, .steps-list li, .faq-item, .shortcut-row:not(.header-row)'
);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.45s ease ${i * 0.06}s, transform 0.45s ease ${i * 0.06}s`;
    observer.observe(el);
  });
}

/* ===== HEADER OMBRE AU SCROLL ===== */
const siteHeader = document.querySelector('.site-header');
if (siteHeader) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      siteHeader.style.boxShadow = '0 2px 20px rgba(0,0,0,0.10)';
    } else {
      siteHeader.style.boxShadow = 'none';
    }
  }, { passive: true });
}

/* ===== ESPACES PUB – helper Adsterra / Monetag =====
   Pour activer une régie :
   1. Connectez-vous à votre compte Adsterra ou Monetag
   2. Créez une zone publicitaire et copiez le code de balise
   3. Remplacez le <div class="ad-placeholder">…</div> dans chaque
      .ad-zone par le code fourni par la régie
   Zones disponibles :
   - .ad-top   → bannière 728×90 en haut de page
   - .ad-mid   → carré 336×280 au milieu du contenu
   - .ad-bottom → bannière 728×90 en bas de page (footer)
   ===== */
