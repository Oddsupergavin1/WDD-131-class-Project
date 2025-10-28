// No need for DOMContentLoaded if using defer

// Create and style the theme switch button
const themeButton = document.createElement('button');
themeButton.textContent = 'Switch Theme';
themeButton.style.position = 'fixed';
themeButton.style.top = '20px';
themeButton.style.left = '20px';
themeButton.style.zIndex = '1000';
themeButton.style.padding = '8px 12px';
themeButton.style.background = '#ffffffff';
themeButton.style.color = '#000000e3';
themeButton.style.border = 'solid 1px black';
themeButton.style.borderRadius = '4px';
themeButton.style.cursor = 'pointer';
document.body.appendChild(themeButton);

// Define theme logos
const LIGHT_LOGO = '../images/byui-logo-blue.webp';
const DARK_LOGO  = '../images/byui-logo-white.png';
const PURPLE_LOGO = '../images/byui-logo-white.png';

// Try to find a logo image
const logo = document.querySelector('main img') || document.querySelector('img');

// Track current theme
let currentTheme = 'light';

// Function to apply a theme
function applyTheme(value) {
    document.documentElement.setAttribute('data-theme', value);
    if (logo) {
        logo.src = (value === 'dark' || value === 'purple') ? DARK_LOGO : LIGHT_LOGO;
    }
    currentTheme = value;
	themeButton.innerText = `${value.charAt(0).toUpperCase() + value.slice(1)} Mode`;
	
	currentTheme = value;
}


// Cycle through themes on button click
themeButton.addEventListener('click', () => {
    const nextTheme = currentTheme === 'light' ? 'dark' : currentTheme === 'dark' ? 'purple' : 'light';
    applyTheme(nextTheme);
	themeButton.innerText 
});

// Apply system theme on load
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(prefersDark ? 'dark' : 'light');
