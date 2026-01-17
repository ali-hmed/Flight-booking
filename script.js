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

// Search & Manage Booking Tabs
// Search Tabs Logic (Flights, Hotels, Cars)
const tabs = {
    flights: document.getElementById('tab-flights'),
    hotels: document.getElementById('tab-hotels'),
    cars: document.getElementById('tab-cars')
};

const forms = {
    flights: document.getElementById('flight-search-form'),
    hotels: document.getElementById('hotel-search-form'),
    cars: document.getElementById('car-search-form')
};

function setActiveTab(activeType) {
    // Reset all tabs
    Object.values(tabs).forEach(tab => {
        if (tab) {
            tab.classList.remove('bg-white', 'text-slate-900', 'font-bold');
            tab.classList.add('text-white/70', 'hover:text-white', 'font-medium');
        }
    });

    // Hide all forms
    Object.values(forms).forEach(form => {
        if (form) form.classList.add('hidden');
    });

    // Activate selected
    if (tabs[activeType] && forms[activeType]) {
        tabs[activeType].classList.add('bg-white', 'text-brand-blue', 'font-bold');
        tabs[activeType].classList.remove('text-white/70', 'hover:text-white', 'font-medium');
        forms[activeType].classList.remove('hidden');
    }
}

// Event Listeners
if (tabs.flights) tabs.flights.addEventListener('click', () => setActiveTab('flights'));
if (tabs.hotels) tabs.hotels.addEventListener('click', () => setActiveTab('hotels'));
if (tabs.cars) tabs.cars.addEventListener('click', () => setActiveTab('cars'));

// Hero Background Slider
const heroSection = document.getElementById('hero-section');
const heroImages = [
    'assets/hero_bg_new.jpg',
    'assets/hero_bg_2.jpg',
    'assets/hero_bg_3.jpg'
];
let currentHeroIndex = 0;

if (heroSection) {
    // Preload images
    heroImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    setInterval(() => {
        currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
        heroSection.style.backgroundImage = `url('${heroImages[currentHeroIndex]}')`;
    }, 5000);
}

// City Search Autocomplete
const airports = [
    { name: "Mogadishu", code: "MGQ", country: "Somalia" },
    { name: "Hargeisa", code: "HGA", country: "Somalia" },
    { name: "Garowe", code: "GGR", country: "Somalia" },
    { name: "Bosaso", code: "BSA", country: "Somalia" },
    { name: "Nairobi", code: "NBO", country: "Kenya" },
    { name: "Dubai", code: "DXB", country: "UAE" },
    { name: "Jeddah", code: "JED", country: "Saudi Arabia" },
    { name: "Istanbul", code: "IST", country: "Turkey" },
    { name: "London", code: "LHR", country: "UK" },
    { name: "Minneapolis", code: "MSP", country: "USA" },
    { name: "Djibouti", code: "JIB", country: "Djibouti" },
    { name: "Addis Ababa", code: "ADD", country: "Ethiopia" }
];

function setupAutocomplete(inputId, listId) {
    const input = document.getElementById(inputId);
    const list = document.getElementById(listId);

    if (!input || !list) return;

    // Helper to render the list
    const renderList = (items) => {
        list.innerHTML = '';
        if (items.length > 0) {
            // Fix stacking context: raise parent z-index
            input.parentElement.classList.add('z-50');
            list.classList.remove('hidden');

            items.forEach(airport => {
                const li = document.createElement('li');
                li.className = "px-4 py-3 hover:bg-slate-50 cursor-pointer flex justify-between items-center transition-colors border-b border-slate-50 last:border-0";
                li.innerHTML = `
                    <div>
                        <div class="font-bold text-slate-800">${airport.name}</div>
                        <div class="text-xs text-slate-400">${airport.country}</div>
                    </div>
                    <div class="text-sm font-bold text-brand-blue bg-blue-50 px-2 py-1 rounded">${airport.code}</div>
                `;
                li.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent document click from closing immediately
                    input.value = `${airport.name} (${airport.code})`;
                    closeList();
                });
                list.appendChild(li);
            });
        } else {
            closeList();
        }
    };

    const closeList = () => {
        list.classList.add('hidden');
        input.parentElement.classList.remove('z-50');
    };

    input.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();

        const filtered = airports.filter(airport =>
            airport.name.toLowerCase().includes(value) ||
            airport.code.toLowerCase().includes(value) ||
            airport.country.toLowerCase().includes(value)
        );
        renderList(filtered);
    });

    // Show all suggestions on focus/click
    input.addEventListener('focus', () => {
        // If empty or has value, show relevant (or all if user just clicked)
        const value = input.value.toLowerCase();
        if (value.trim() === "") {
            renderList(airports);
        } else {
            // If there's already filtered text, show filtered matches again
            const filtered = airports.filter(airport =>
                airport.name.toLowerCase().includes(value) ||
                airport.code.toLowerCase().includes(value) ||
                airport.country.toLowerCase().includes(value)
            );
            renderList(filtered.length ? filtered : airports);
        }
    });

    // Hide when clicking outside
    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !list.contains(e.target)) {
            closeList();
        }
    });
}

setupAutocomplete('input-from', 'suggestions-from');
setupAutocomplete('input-to', 'suggestions-to');

// Flight Search Logic
const btnSearch = document.getElementById('btn-search-flights');
const searchResultsSection = document.getElementById('search-results-section');
const resultsContainer = document.getElementById('results-container');

if (btnSearch && searchResultsSection && resultsContainer) {
    btnSearch.addEventListener('click', () => {
        const fromVal = document.getElementById('input-from').value;
        const toVal = document.getElementById('input-to').value;

        // Simple validation
        if (!fromVal || !toVal) {
            alert("Please select both a departure and arrival city.");
            return;
        }

        // Loading State
        const originalBtnContent = btnSearch.innerHTML;
        btnSearch.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg> Searching...`;
        btnSearch.disabled = true;

        // Simulate API delay
        setTimeout(() => {
            // Restore Button
            btnSearch.innerHTML = originalBtnContent;
            btnSearch.disabled = false;

            // Show Results
            searchResultsSection.classList.remove('hidden');
            resultsContainer.innerHTML = ''; // Clear previous

            // Extract City Names
            const fromCity = fromVal.split('(')[0].trim();
            const toCity = toVal.split('(')[0].trim();

            // Mock Data Generation
            const mockFlights = [
                { time: '08:30', landing: '11:45', duration: '3h 15m', price: 450, type: 'Direct' },
                { time: '14:15', landing: '17:30', duration: '3h 15m', price: 520, type: 'Direct' },
                { time: '18:45', landing: '23:10', duration: '4h 25m', price: 380, type: '1 Stop' },
            ];

            mockFlights.forEach(flight => {
                const card = document.createElement('div');
                card.className = "bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition-shadow";
                card.innerHTML = `
                    <div class="flex items-center gap-6 w-full md:w-auto">
                        <div class="flex flex-col items-center">
                            <span class="text-2xl font-bold text-slate-800">${flight.time}</span>
                            <span class="text-xs text-slate-400">Departure</span>
                        </div>
                        <div class="flex flex-col items-center px-4 w-32">
                            <span class="text-xs text-slate-400 mb-1">${flight.duration}</span>
                            <div class="w-full h-[2px] bg-slate-200 relative">
                                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full ring-2 ring-white ${flight.type === 'Direct' ? 'bg-brand-blue' : 'bg-orange-400'}"></div>
                            </div>
                            <span class="text-xs text-slate-500 mt-1">${flight.type}</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <span class="text-2xl font-bold text-slate-800">${flight.landing}</span>
                            <span class="text-xs text-slate-400">Arrival</span>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between w-full md:w-auto gap-8 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                        <div class="text-right">
                             <div class="text-xs text-slate-400">Economy starting from</div>
                             <div class="text-2xl font-bold text-brand-blue">$${flight.price}</div>
                        </div>
                        <button class="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-brand-blue transition-colors shadow-lg">
                            Select
                        </button>
                    </div>
                `;
                resultsContainer.appendChild(card);
            });

            // Smooth scroll to results
            searchResultsSection.scrollIntoView({ behavior: 'smooth' });

        }, 1500);
    });
}
