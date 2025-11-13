// Character data
const character = {
    name: "Engi Whisperer",
    image: "images/engi-whisperer.png",
    type: "Flying Energy Soldier",
    health: 100,
    level: 1
};

function characterCard() {
    return `
        <li class="card">
            <div class="image">
                <img src="${character.image}" alt="${character.name}">
            </div>
            <div class="name">
                <h1>${character.name}</h1>
            </div>
            <div class="info">
                <p>Type: ${character.type}</p>
                <p>Health: <span id="health">${character.health}</span></p>
                <p>Level: <span id="level">${character.level}</span></p>
            </div>
            <div class="buttons">
                <button id="attackedBtn">Attacked</button>
                <button id="levelBtn">Level Up</button>
            </div>
        </li>`;
}

function attachEvents() {
    document.querySelector("#attackedBtn").addEventListener("click", attacked);
    document.querySelector("#levelBtn").addEventListener("click", levelUp);
}

function renderCharacterCard() {
    document.querySelector("#character-card").innerHTML = characterCard();
    attachEvents();
}

function attacked() {
    character.health = character.health - 20;
    if (character.health < 0) {
        character.health = 0;
        alert("Character Died!");
    }
    renderCharacterCard();
}

function levelUp() {
    if(character.health <= 0) return;
    character.level = character.level + 1;
    character.health = Math.min(character.health + 15, 500);
    renderCharacterCard();
}

document.addEventListener("DOMContentLoaded", function() {
    renderCharacterCard();
 });