// Import the recipes array from recipes.mjs file
import recipes from './recipes.mjs';

// Function that takes a single recipe object and returns HTML string
function recipeTemplate(recipe) {
    // Fix the image path: change './images/' to 'images/images/' to match folder structure
    const imagePath = recipe.image.replace('./images/', 'images/images/');
    
    // Return HTML template literal (string) for one recipe card
    return `
        <li class="recipe">
            <img src="${imagePath}" alt="${recipe.name}">
            <div class="recipe-info">
                <h2>${recipe.name}</h2>
                <p class="rating">Rating: ${recipe.rating} /p>
                <p class="description">${recipe.description}</p>
            </div>
        </li>`;
}

function renderStars(starRating) {
    // number of stars per rating
    for (let i=0; i < starRating; i++){
        // apply rating to recipe # of times 
        recipe.rating
    }

}

// Function that takes an array of recipes and displays them on the page
function renderRecipes(recipeList) {
    // Get the ul element with id 'recipe-container' from the HTML
    const container = document.getElementById('recipe-container');
    
    // If container doesn't exist, log error and exit function
    if (!container) {
        console.error('recipe-container not found');
        return;
    }
    
    // Convert each recipe to HTML using map, then join all HTML strings together
    const html = recipeList.map(recipeTemplate).join('');
    
    // Insert all the recipe HTML into the container
    container.innerHTML = html;
}

// Call renderRecipes with all recipes to display them when page loads
renderRecipes(recipes);
