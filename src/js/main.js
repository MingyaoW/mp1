const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('is-open');
  });

  navLinks.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
    });
  });
}

const navbar = document.querySelector('.navbar');
const navigationLinks = Array.from(document.querySelectorAll('.nav-link'));
const navigationSections = navigationLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const updateNavbar = () => {
  if (!navbar || navigationSections.length === 0) {
    return;
  }

  navbar.classList.toggle('scrolled', window.scrollY > 50);

  const navbarBottom = navbar.offsetHeight;
  let activeSectionId = navigationSections[0].id;

  navigationSections.forEach((section) => {
    if (section.getBoundingClientRect().top <= navbarBottom + 1) {
      activeSectionId = section.id;
    }
  });

  const isAtPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

  if (isAtPageBottom) {
    activeSectionId = navigationSections[navigationSections.length - 1].id;
  }

  navigationLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${activeSectionId}`);
  });
};

window.addEventListener('scroll', updateNavbar, { passive: true });
window.addEventListener('resize', updateNavbar);
updateNavbar();

const carousel = document.querySelector('.carousel');

if (carousel) {
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const previousButton = carousel.querySelector('.carousel-button-prev');
  const nextButton = carousel.querySelector('.carousel-button-next');
  let activeSlideIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));

  if (activeSlideIndex === -1) {
    activeSlideIndex = 0;
  }

  const showSlide = (index) => {
    activeSlideIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === activeSlideIndex);
    });
  };

  previousButton.addEventListener('click', () => {
    showSlide(activeSlideIndex - 1);
  });

  nextButton.addEventListener('click', () => {
    showSlide(activeSlideIndex + 1);
  });
}

const modals = Array.from(document.querySelectorAll('.modal'));

const closeModal = (modal) => {
  modal.classList.remove('is-open');
  modal.hidden = true;
  document.body.classList.remove('modal-open');
};

document.querySelectorAll('.modal-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const modal = document.getElementById(trigger.dataset.modal);

    if (modal) {
      modal.hidden = false;
      modal.classList.add('is-open');
      document.body.classList.add('modal-open');
    }
  });
});

modals.forEach((modal) => {
  const closeButton = modal.querySelector('.modal-close');

  closeButton.addEventListener('click', () => {
    closeModal(modal);
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    modals.forEach((modal) => {
      if (!modal.hidden) {
        closeModal(modal);
      }
    });
  }
});

