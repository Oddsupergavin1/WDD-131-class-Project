// file to shuffle through vehichles and maps, allow custom name, and display selections on separate page

// Import the vehicles array from vehicles.mjs
import vehicles from './vehicles.mjs';

// cardTemplate() - converts a vehicle object to HTML
function cardTemplate(vehicle) {
        const imagePath = (vehicle.image || '').replace('.images/', 'images/').replace('./images/', 'images/');
        const name = vehicle.name || '';
        const description = vehicle.description || vehicle.Description || '';
        return `
                <div class="card">
                        <img src="${imagePath}" alt="${name}" aria-label="${name} image">
                        <h3>${name}</h3>
                        <p>${description}</p>
                </div>
        `;
}



// renderCard() - renders multiple vehicle cards (used by renderAllVehicles)
function renderCard(character) {
    const container = document.getElementById('vehicle-card');

    if(!container) {
        console.error('vehicle-card not found')
        return;
    }

    const html = character.map(cardTemplate).join('');

    container.innerHTML = html;
}    

// renderVehicle() - renders a single random vehicle card
function renderVehicle(character) {
    const container = document.getElementById('vehicle-card');
    
    if (!container) {
        console.error('vehicle-card not found');
        return;
    }
    const index =  Math.floor(Math.random() * character.length);

    container.innerHTML = cardTemplate(character[index]);
    
}


// renderAllVehicles() - renders all vehicles + calls addImageClickListeners() to make them clickable
function renderAllVehicles(character) {
    const container = document.getElementById('vehicle-card');
    
    if (!container) {
        console.error('vehicle-card not found');
        return;
    }

    const html = character.map(cardTemplate).join('');
    container.innerHTML = html;
    
    addImageClickListeners();
}


// addImageClickListeners() - adds click events to cards, extracts vehicle data, calls generateStatsCard()
function addImageClickListeners() {
    const cards = document.querySelectorAll('#vehicle-card .card');
    
    cards.forEach(function(card) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const vehicleName = this.querySelector('h3').textContent;
            const vehicleImage = this.querySelector('img').src;
            generateStatsCard(vehicleName, vehicleImage);
        });
    });
}


// generateRandomStats() - creates random stats for a vehicle
function generateRandomStats() {
    return {
        speed: Math.floor(Math.random() * 100) + 1,
        acceleration: Math.floor(Math.random() * 100) + 1,
        handling: Math.floor(Math.random() * 100) + 1,
        durability: Math.floor(Math.random() * 100) + 1,
        weight: Math.floor(Math.random() * 5000) + 500,
        horsepower: Math.floor(Math.random() * 1000) + 50
    };
}


// generateStatsCard() - collects username + vehicle data, navigates to vehicle-card.html with URL params
function generateStatsCard(vehicleName, vehicleImage) {
    const username = document.getElementById('username-input').value || 'Player';
    
    const params = new URLSearchParams({
        vehicle: vehicleName,
        image: vehicleImage,
        username: username
    });
    
    window.location.href = `vehicle-card.html?${params.toString()}`;
}


// INITIALIZATION: renderAllVehicles() displays all vehicles on page load
renderAllVehicles(vehicles);