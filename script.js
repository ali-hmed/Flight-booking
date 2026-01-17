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
const tabFlights = document.getElementById('tab-flights');
const tabManage = document.getElementById('tab-manage');
const formFlights = document.getElementById('flight-search-form');
const formManage = document.getElementById('manage-booking-form');

if (tabFlights && tabManage && formFlights && formManage) {
    tabFlights.addEventListener('click', () => {
        // Activate Flights
        tabFlights.classList.add('text-brand-blue', 'border-brand-blue');
        tabFlights.classList.remove('text-slate-500', 'border-transparent'); // ensure no transparent border overrides if added later

        tabManage.classList.remove('text-brand-blue', 'border-brand-blue', 'border-b-2');
        tabManage.classList.add('text-slate-500');

        formFlights.classList.remove('hidden');
        formManage.classList.add('hidden');
    });

    tabManage.addEventListener('click', () => {
        // Activate Manage
        tabManage.classList.add('text-brand-blue', 'border-brand-blue', 'border-b-2');
        tabManage.classList.remove('text-slate-500');

        tabFlights.classList.remove('text-brand-blue', 'border-brand-blue');
        tabFlights.classList.add('text-slate-500');

        formManage.classList.remove('hidden');
        formFlights.classList.add('hidden');
    });
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
