const properties = [
    { image: 'images/home1.jpg', title: 'Cozy Cottage', price: 120, location: 'Asheville, NC' },
    { image: 'images/home2.jpg', title: 'Beachfront Escape', price: 200, location: 'Malibu, CA' },
    { image: 'images/home3.jpg', title: 'Modern Loft', price: 150, location: 'Brooklyn, NY' },
    { image: 'images/home4.jpg', title: 'Luxury Villa', price: 300, location: 'Miami, FL' },
    { image: 'images/home5.jpg', title: 'Mountain Retreat', price: 180, location: 'Denver, CO' },
    { image: 'images/home6.jpg', title: 'Urban Apartment', price: 130, location: 'Chicago, IL' },
    { image: 'images/home7.jpg', title: 'Quiet Countryside', price: 110, location: 'Lexington, KY' },
    { image: 'images/home8.jpg', title: 'Seaside Bungalow', price: 190, location: 'Santa Cruz, CA' },
    { image: 'images/home9.jpg', title: 'Classic Cabin', price: 140, location: 'Lake Tahoe, NV' },
    { image: 'images/home10.jpg', title: 'Elegant Townhouse', price: 250, location: 'Georgetown, DC' },
    { image: 'images/home11.jpg', title: 'Rustic Farmhouse', price: 160, location: 'Lancaster, PA' },
    { image: 'images/home12.jpg', title: 'Beach House', price: 220, location: 'Destin, FL' },
    { image: 'images/home13.jpg', title: 'Hillside Haven', price: 170, location: 'Sedona, AZ' },
    { image: 'images/home14.jpg', title: 'Skyline Penthouse', price: 400, location: 'Manhattan, NY' },
    { image: 'images/home15.jpg', title: 'Lakeside Retreat', price: 175, location: 'Lake Placid, NY' },
    { image: 'images/home16.jpg', title: 'Tropical Paradise', price: 280, location: 'Maui, HI' },
    { image: 'images/home17.jpg', title: 'Forest Lodge', price: 150, location: 'Bend, OR' },
    { image: 'images/home18.jpg', title: 'Ski Chalet', price: 200, location: 'Park City, UT' },
    { image: 'images/home19.jpg', title: 'Desert Getaway', price: 135, location: 'Palm Springs, CA' },
    { image: 'images/home20.jpg', title: 'Suburban Home', price: 145, location: 'Plano, TX' },
    { image: 'images/home21.jpg', title: 'Bohemian Loft', price: 195, location: 'Austin, TX' }
];

document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded and running");

    // Check if homeCards exists before calling loadHomes
    if (document.getElementById("homeCards")) {
        loadHomes();
    } else {
        console.log("homeCards not found, skipping loadHomes()");
    }

    // Check if listingsContainer exists before calling loadListings
    if (document.getElementById("listingsContainer")) {
        loadListings();
    } else {
        console.log("listingsContainer not found, skipping loadListings()");
    }

    // Search form listener
    const searchForm = document.getElementById("searchForm");
    if (searchForm) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const query = document.getElementById("searchInput").value.toLowerCase();
            window.location.href = `listings.html?search=${query}`;
        });
    }

    // Filter and Sort event listeners
    if (document.getElementById("filterInput")) {
        document.getElementById("filterInput").addEventListener("input", loadListings);
    }

    if (document.getElementById("sortSelect")) {
        document.getElementById("sortSelect").addEventListener("change", loadListings);
    }
});

function loadHomes() {
    const homeCards = document.getElementById("homeCards");
    homeCards.innerHTML = "";
    properties.slice(0, 3).forEach(property => {
        homeCards.innerHTML += `
            <div class="col-md-4">
                <a href="schedule_booking.html?property=${encodeURIComponent(property.title)}" class="card-link" style="text-decoration: none; color: inherit;">
                    <div class="card">
                        <img src="${property.image}" class="card-img-top" alt="${property.title}">
                        <div class="card-body">
                            <h5 class="card-title">${property.title}</h5>
                            <p class="card-location">${property.location}</p>
                            <p class="card-price">$${property.price}/night</p>
                        </div>
                    </div>
                </a>
            </div>`;
    });
}

function loadListings() {
    const listingsContainer = document.getElementById("listingsContainer");
    if (!listingsContainer) return;
    listingsContainer.innerHTML = "";
    let filteredProperties = [...properties];

    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search");
    if (searchQuery) {
        filteredProperties = filteredProperties.filter(p => p.title.toLowerCase().includes(searchQuery));
    }

    const filterText = document.getElementById("filterInput").value.toLowerCase();
    if (filterText) {
        filteredProperties = filteredProperties.filter(p => p.title.toLowerCase().includes(filterText));
    }

    const sortValue = document.getElementById("sortSelect").value;
    if (sortValue === "priceLow") {
        filteredProperties.sort((a, b) => a.price - b.price);
    } else if (sortValue === "priceHigh") {
        filteredProperties.sort((a, b) => b.price - a.price);
    }

    filteredProperties.forEach(property => {
        listingsContainer.innerHTML += `
            <div class="col-md-4 mb-4">
                <a href="schedule_booking.html?property=${encodeURIComponent(property.title)}" class="card-link" style="text-decoration: none; color: inherit;">
                    <div class="card">
                        <img src="${property.image}" class="card-img-top" alt="${property.title}">
                        <div class="card-body">
                            <h5 class="card-title">${property.title}</h5>
                            <p class="card-location">${property.location}</p>
                            <p class="card-price">$${property.price}/night</p>
                        </div>
                    </div>
                </a>
            </div>`;
    });
}