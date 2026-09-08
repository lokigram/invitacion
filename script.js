// JavaScript Logic for Wedding Invitation Project

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Countdown Timer Target: Oct 24, 2026 16:00:00
  setInterval(updateCountdown, 1000);
  updateCountdown();
});

// State Variables
let currentCardIndex = 0;
let currentPhotoPage = 0;
const totalCards = 3;

// Envelope Interactive Logic
function openEnvelope() {
  const flap = document.getElementById('envelope-flap');
  const letter = document.getElementById('envelope-letter');
  const seal = document.getElementById('envelope-seal');
  const overlayBlock = document.getElementById('overlay-block');
  const wrapper = document.getElementById('envelope-wrapper');
  const cardsContainer = document.getElementById('cards-container');
  const controlsOverlay = document.getElementById('controls-overlay');

  // 1. Open Flap and Hide Seal
  flap.classList.add('opened');
  seal.classList.add('fade-out');
  overlayBlock.classList.add('fade-out');

  // 2. Slide letter up after flap opens
  setTimeout(() => {
    letter.classList.add('slide-out');
  }, 300);

  // 3. Transition to main cards gallery
  setTimeout(() => {
    wrapper.classList.add('hidden-state');
    cardsContainer.classList.add('visible');
    controlsOverlay.classList.add('visible');
    updateCardPosition();
  }, 900);
}

function returnToEnvelope() {
  const flap = document.getElementById('envelope-flap');
  const letter = document.getElementById('envelope-letter');
  const seal = document.getElementById('envelope-seal');
  const overlayBlock = document.getElementById('overlay-block');
  const wrapper = document.getElementById('envelope-wrapper');
  const cardsContainer = document.getElementById('cards-container');
  const controlsOverlay = document.getElementById('controls-overlay');

  cardsContainer.classList.remove('visible');
  controlsOverlay.classList.remove('visible');
  wrapper.classList.remove('hidden-state');

  setTimeout(() => {
    letter.classList.remove('slide-out');
  }, 300);

  setTimeout(() => {
    flap.classList.remove('opened');
    seal.classList.remove('fade-out');
    overlayBlock.classList.remove('fade-out');
  }, 700);
}

// Card Carousel Logic
function updateCardPosition() {
  const track = document.getElementById('gallery-track');
  const offset = currentCardIndex * -100;
  track.style.transform = `translateX(${offset}%)`;

  // Update Pagination Dots
  const dots = document.querySelectorAll('.pagination-dots .dot');
  dots.forEach((dot, index) => {
    if (index === currentCardIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  // Update Nav Button States
  document.getElementById('btn-prev-card').disabled = currentCardIndex === 0;
  document.getElementById('btn-next-card').disabled = currentCardIndex === totalCards - 1;
}

function goToCard(index) {
  currentCardIndex = index;
  updateCardPosition();
}

function nextCard() {
  if (currentCardIndex < totalCards - 1) {
    currentCardIndex++;
    updateCardPosition();
  }
}

function prevCard() {
  if (currentCardIndex > 0) {
    currentCardIndex--;
    updateCardPosition();
  }
}

// Photo Carousel inside Dress Code
function setPhotoPage(pageIndex) {
  currentPhotoPage = pageIndex;
  const page0 = document.getElementById('photo-page-0');
  const page1 = document.getElementById('photo-page-1');
  const dots = document.querySelectorAll('.photo-dot');

  if (pageIndex === 0) {
    page0.classList.remove('hidden');
    page1.classList.add('hidden');
  } else {
    page0.classList.add('hidden');
    page1.classList.remove('hidden');
  }

  dots.forEach((dot, idx) => {
    if (idx === pageIndex) dot.classList.add('active');
    else dot.classList.remove('active');
  });
}

function nextPhoto() {
  setPhotoPage((currentPhotoPage + 1) % 2);
}

function prevPhoto() {
  setPhotoPage(currentPhotoPage === 0 ? 1 : 0);
}

// Countdown Timer Logic
const targetDate = new Date('September 18, 2026 18:30:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }
}

// RSVP Modal Logic
function openRsvpModal() {
  document.getElementById('rsvp-modal').classList.add('active');
}

function closeRsvpModal() {
  document.getElementById('rsvp-modal').classList.remove('active');
}

function closeRsvpModalOnBackdrop(event) {
  if (event.target.id === 'rsvp-modal') {
    closeRsvpModal();
  }
}

function submitRsvp(e) {
  e.preventDefault();
  closeRsvpModal();

  // Show Toast Notification
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
