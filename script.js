// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-glass', 'bg-white/90');
        navbar.classList.remove('bg-white/80', 'border-white/20');
    } else {
        navbar.classList.remove('shadow-glass', 'bg-white/90');
        navbar.classList.add('bg-white/80', 'border-white/20');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Destination Slider Logic
const destinationsContainer = document.getElementById('destinations-container');
const prevBtn = document.getElementById('prev-dest');
const nextBtn = document.getElementById('next-dest');

if (destinationsContainer && prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
        destinationsContainer.scrollBy({ left: 300, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        destinationsContainer.scrollBy({ left: -300, behavior: 'smooth' });
    });
}
