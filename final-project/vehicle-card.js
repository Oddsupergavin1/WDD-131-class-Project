// Character card page script - displays the stats card from URL parameters

/**
 * Generates random stats for a vehicle
 * @returns {Object} Object containing randomly generated vehicle stats
 */
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

// CONFETTI ANIMATION - Creates 50 confetti pieces that fall and rotate for 1 second
function createConfetti() {
    const colors = ['#2000a9', '#da5724', '#162026', '#a70000', '#FFD700', '#FF1493'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            opacity: 1;
            transform: rotate(${Math.random() * 360}deg);
            animation: confetti-fall 1s ease-out forwards;
            pointer-events: none;
            z-index: 999;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(function() {
            confetti.remove();
        }, 1000);
    }
}

/**
 * Displays the stats card on the character-card page
 * Reads vehicle name, image, and username from URL parameters
 */
function displayStatsCard() {
    const urlParams = new URLSearchParams(window.location.search);
    const vehicleName = urlParams.get('vehicle');
    const vehicleImage = urlParams.get('image');
    const username = urlParams.get('username') || 'Player';
    
    if (!vehicleName || !vehicleImage) {
        document.getElementById('stats-display').innerHTML = '<p>No vehicle selected. <a href="index.html">Go back</a></p>';
        return;
    }
    
    const stats = generateRandomStats();
    const statsContainer = document.getElementById('stats-display');
    
    statsContainer.innerHTML = `
        <div class="stats-card">
            <h2>${username}</h2>
            <img src="${vehicleImage}" alt="${vehicleName}">
            <h3>${vehicleName}</h3>
            <div class="stats">
                <p><strong>Speed:</strong> ${stats.speed}</p>
                <p><strong>Acceleration:</strong> ${stats.acceleration}</p>
                <p><strong>Handling:</strong> ${stats.handling}</p>
                <p><strong>Durability:</strong> ${stats.durability}</p>
                <p><strong>Weight:</strong> ${stats.weight} lbs</p>
                <p><strong>Horsepower:</strong> ${stats.horsepower} HP</p>
            </div>
        </div>
    `;
    
    createConfetti();
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes confetti-fall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

displayStatsCard();
