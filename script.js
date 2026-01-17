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
    const isClosed = mobileMenu.classList.contains('opacity-0');

    if (isClosed) {
        // Open
        mobileMenu.classList.remove('opacity-0', '-translate-y-5', 'invisible', 'pointer-events-none');
        mobileMenu.classList.add('opacity-100', 'translate-y-0', 'visible', 'pointer-events-auto');
    } else {
        // Close
        mobileMenu.classList.add('opacity-0', '-translate-y-5', 'invisible', 'pointer-events-none');
        mobileMenu.classList.remove('opacity-100', 'translate-y-0', 'visible', 'pointer-events-auto');
    }
});

// Close mobile menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        // Close
        mobileMenu.classList.add('opacity-0', '-translate-y-5', 'invisible', 'pointer-events-none');
        mobileMenu.classList.remove('opacity-100', 'translate-y-0', 'visible', 'pointer-events-auto');
    });
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
const btnSearchHotels = document.getElementById('btn-search-hotels');
const btnSearchCars = document.getElementById('btn-search-cars');

const searchResultsSection = document.getElementById('search-results-section');
const resultsContainer = document.getElementById('results-container');

const loadingSpinner = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg> Searching...`;

const showResults = (cardsHTML) => {
    searchResultsSection.classList.remove('hidden');
    resultsContainer.innerHTML = cardsHTML;
    searchResultsSection.scrollIntoView({ behavior: 'smooth' });
};

// Generic Search Handler
const handleSearch = (btn, type) => {
    if (!btn) return;

    btn.addEventListener('click', () => {
        const originalContent = btn.innerHTML;
        btn.innerHTML = loadingSpinner;
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.disabled = false;

            let html = '';

            if (type === 'flight') {
                const mockFlights = [
                    { time: '08:30', landing: '11:45', duration: '3h 15m', price: 450, type: 'Direct' },
                    { time: '14:15', landing: '17:30', duration: '3h 15m', price: 520, type: 'Direct' },
                    { time: '18:45', landing: '23:10', duration: '4h 25m', price: 380, type: '1 Stop' },
                ];
                html = mockFlights.map(flight => `
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition-all group">
                         <div class="flex items-center gap-6 w-full md:w-auto">
                            <div class="flex flex-col items-center">
                                <span class="text-2xl font-bold text-slate-800">${flight.time}</span>
                                <span class="text-xs text-slate-400">Departure</span>
                            </div>
                            <div class="flex flex-col items-center px-4 w-32">
                                <span class="text-xs text-slate-400 mb-1">${flight.duration}</span>
                                <div class="w-full h-[2px] bg-slate-200 relative group-hover:bg-brand-blue/30 transition-colors">
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
                                 <div class="text-xs text-slate-400">Economy from</div>
                                 <div class="text-2xl font-bold text-brand-blue">$${flight.price}</div>
                            </div>
                            <button class="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-brand-blue transition-colors shadow-lg">Select</button>
                        </div>
                    </div>
                `).join('');

            } else if (type === 'hotel') {
                const mockHotels = [
                    { name: 'Grand Hyatt Mogadishu', stars: 5, price: 180, img: 'assets/hotel_1.jpg', loc: 'Mogadishu, Somalia' },
                    { name: 'Ocean View Resort', stars: 4, price: 120, img: 'assets/hotel_2.jpg', loc: 'Mogadishu, Somalia' },
                    { name: 'City Center Pearl', stars: 3, price: 85, img: 'assets/dubai.jpg', loc: 'Mogadishu, Somalia' } // reusing dubai as backup
                ];
                html = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">` +
                    mockHotels.map(hotel => `
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all group">
                         <div class="h-48 overflow-hidden relative">
                            <img src="${hotel.img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                             <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-slate-800 flex items-center gap-1">
                                <svg class="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg> 
                                ${hotel.stars}.0
                            </div>
                        </div>
                        <div class="p-6">
                            <div class="text-xs text-slate-400 mb-1">${hotel.loc}</div>
                            <h3 class="font-bold text-slate-900 text-lg mb-4 line-clamp-1">${hotel.name}</h3>
                            <div class="flex items-center justify-between">
                                 <div>
                                    <span class="text-2xl font-bold text-brand-blue">$${hotel.price}</span>
                                    <span class="text-xs text-slate-400">/ night</span>
                                 </div>
                                 <button class="px-4 py-2 bg-slate-900 text-white text-sm rounded-lg font-medium hover:bg-brand-blue transition-colors">Book Now</button>
                            </div>
                        </div>
                    </div>
                `).join('') + `</div>`;

            } else if (type === 'car') {
                const mockCars = [
                    { name: 'Range Rover Sport', type: 'Luxury SUV', price: 150, img: 'assets/car_luxury.jpg' },
                    { name: 'Toyota Land Cruiser', type: 'Off-road SUV', price: 120, img: 'assets/car_suv.jpg' },
                    { name: 'Hyundai Elantra', type: 'Sedan', price: 45, img: 'assets/rio.jpg' } // fallback logic if generic
                ];
                html = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">` +
                    mockCars.map(car => `
                     <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all group">
                         <div class="h-48 overflow-hidden relative">
                            <img src="${car.img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                             <div class="absolute top-4 left-4 bg-brand-blue text-white px-3 py-1 rounded-full text-xs font-bold">
                                Free Cancelation
                            </div>
                        </div>
                        <div class="p-6">
                            <div class="text-xs text-slate-400 mb-1">Unlimited Mileage</div>
                            <h3 class="font-bold text-slate-900 text-lg mb-4">${car.name}</h3>
                            <div class="flex items-center justify-between">
                                 <div>
                                    <span class="text-2xl font-bold text-brand-blue">$${car.price}</span>
                                    <span class="text-xs text-slate-400">/ day</span>
                                 </div>
                                 <button class="px-4 py-2 bg-slate-900 text-white text-sm rounded-lg font-medium hover:bg-brand-blue transition-colors">Rent Now</button>
                            </div>
                        </div>
                    </div>
                `).join('') + `</div>`;
            }

            showResults(html);

        }, 1500);
    });
};

handleSearch(btnSearch, 'flight');
handleSearch(btnSearchHotels, 'hotel');
handleSearch(btnSearchCars, 'car');

// Custom Dropdown Logic (Fixed Position Portal)
document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
    const btn = dropdown.querySelector('.dropdown-btn');
    const menuTemplate = dropdown.querySelector('.dropdown-menu');
    const valueSpan = dropdown.querySelector('.selected-value');
    const arrow = btn.querySelector('svg');

    // Remove the original menu from the DOM layout to prevent issues, we will clone it
    // Actually, we can just keep it hidden and clone content

    let activeDropdownMenu = null;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();

        // If this dropdown is already open (checked by checking if we have an active one mapped to this)
        if (btn.classList.contains('active')) {
            closeActiveDropdown();
            return;
        }

        closeActiveDropdown(); // Close any other

        // Open this one
        btn.classList.add('active');
        arrow.classList.add('rotate-180');

        // Create Portal Menu
        const rect = btn.getBoundingClientRect();
        const menu = document.createElement('div');
        menu.className = menuTemplate.className;
        // Force fixed positioning and visibility
        menu.classList.remove('absolute', 'top-full', 'left-0', 'mt-3', 'opacity-0', 'invisible', 'translate-y-2');
        menu.classList.add('fixed', 'opacity-100', 'visible', 'translate-y-0', 'z-[9999]');

        // Position it
        menu.style.top = `${rect.bottom + 12}px`;
        menu.style.left = `${rect.left}px`;
        menu.style.minWidth = `${rect.width}px`;

        // Copy Items
        menu.innerHTML = menuTemplate.innerHTML;

        // Add Item Listeners to the Portal Menu
        const items = menu.querySelectorAll('.dropdown-item');
        items.forEach(item => {
            item.addEventListener('click', (ev) => {
                ev.stopPropagation();
                valueSpan.textContent = item.textContent;
                closeActiveDropdown();
            });
        });

        document.body.appendChild(menu);
        activeDropdownMenu = menu;

        // Allow clicking inside menu without closing
        menu.addEventListener('click', (ev) => ev.stopPropagation());
    });

    function closeActiveDropdown() {
        if (activeDropdownMenu) {
            activeDropdownMenu.remove();
            activeDropdownMenu = null;
        }
        document.querySelectorAll('.dropdown-btn.active').forEach(b => {
            b.classList.remove('active');
            const a = b.querySelector('svg');
            if (a) a.classList.remove('rotate-180');
        });
    }

    // Close on click outside
    document.addEventListener('click', (e) => {
        closeActiveDropdown();
    });

    // Close on scroll (simple fix to avoid floating menus)
    document.addEventListener('scroll', () => {
        closeActiveDropdown();
    }, true);
});
