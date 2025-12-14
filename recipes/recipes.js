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
                <p class="rating">Rating: ${renderStars(recipe.rating)} </p>
                <p class="description">${recipe.description}</p>
            </div>
        </li>`;
}

	// <span aria-hidden="true" class="icon-star-empty">⭐</span>
	// <span aria-hidden="true" class="icon-star-empty">☆</span>


function renderStars(starRating) {
    const stars = new Array(5).fill('<span aria-hidden="true" class="icon-star-empty">☆</span>');

    // If no rating is provided, or rating <= 0, return empty stars
    if (!starRating || starRating <= 0 ){
        return stars.join("");
    }

    // update stars array based on actual rating
    for (let i=0; i < starRating; i++){
        stars[i] = '<span aria-hidden="true" class="icon-star-empty">⭐</span>';
    }
    return stars.join("");
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

function renderSingleRecipe(recipeList) {
    const container = document.getElementById('recipe-container');
    
    if (!container) {
        console.error('recipe-container not found');
        return;
    }
    const index =  Math.floor(Math.random() * recipeList.length);

    container.innerHTML = recipeTemplate(recipeList[index]);
    
}

// Call renderRecipes with all recipes to display them when page loads
// renderRecipes(recipes);
renderSingleRecipe(recipes);