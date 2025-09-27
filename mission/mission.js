// mission.js
// Wire the theme <select> to change site theme and swap the logo image.
// This file only contains light/dark theme wiring and logo swapping.
document.addEventListener('DOMContentLoaded', () => {
	// The <select> element the user interacts with to pick a theme.
	// We try an ID first ('theme-select'), then fall back to any <select> on the page.
	const selectElem = document.getElementById('theme-select') || document.querySelector('select');

	// The logo image we will swap when the theme changes. We prefer an image inside <main>.
	const logo = document.querySelector('main img') || document.querySelector('img');

	// Key used to persist the user's theme choice in localStorage.
	const STORAGE_KEY = 'mission-theme-preference';

	if (!selectElem) return console.warn('Theme select not found.');

	// Paths for the light and dark versions of the logo. These are relative
	// to mission/index.html — change to absolute paths (e.g. '/images/...') if needed.
	const LIGHT_LOGO = '../images/byui-logo-blue.webp';
	const DARK_LOGO  = '../images/byui-logo-white.png';
    const PURPLE_LOGO = '../images/byui-logo-white.png';

	/**
	 * applyTheme(value)
	 * - value: 'light' | 'dark' | 'system'
	 * Behavior:
	 *  - If 'dark' or 'light', set a data attribute on <html> (data-theme="dark"/"light").
	 *  - If 'system', remove the attribute so CSS can fall back to prefers-color-scheme.
	 *  - Swap the logo src to the appropriate file if a logo exists.
	 * Why data-theme: Using a data attribute keeps styling in CSS (using variables) and
	 * lets you target theme-specific rules like html[data-theme="dark"] { ... }
	 */
	function applyTheme(value) {
		if (value === 'dark') {
			document.documentElement.setAttribute('data-theme', 'dark');
		} else if (value === 'light') {
			document.documentElement.setAttribute('data-theme', 'light');
        } else if (value === 'purple') {
            document.documentElement.setAttribute('data-theme', 'purple'); 
		} else {
			// 'system' or unknown — remove explicit theme attribute so CSS can honor
			// the user's OS preference (prefers-color-scheme).
			document.documentElement.removeAttribute('data-theme');
		}

		// Swap logo image to match the selected theme. Guard against missing elements.
		if (logo) {
			if (value === 'dark') logo.src = DARK_LOGO;

            else if (value === 'purple') logo.src = PURPLE_LOGO;

			else logo.src = LIGHT_LOGO;
		}
	}

	// ---------- Initialization ----------
	// Load saved preference from localStorage (if available). Default to 'system'.
	let saved = 'system';
	try { saved = localStorage.getItem(STORAGE_KEY) || 'system'; } catch (err) { /* localStorage may be unavailable in private modes */ }

	// Make sure the select reflects the saved value (only when it's a valid choice).
	if (['dark', 'light', 'purple', 'system'].includes(saved)) selectElem.value = saved;

	// Apply the initial theme. If the user chose 'system', detect the current system
	// preference using matchMedia and apply dark/light accordingly for immediate effect.
	applyTheme(saved === 'system' ? (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : saved);

	// ---------- Event: user changed the select ----------
	// Persist the new preference and apply it immediately.
	selectElem.addEventListener('change', (e) => {
		const value = e.target.value;
		try { localStorage.setItem(STORAGE_KEY, value); } catch (err) { /* ignore storage errors */ }
		applyTheme(value);
	});

	// ---------- Respond to system preference changes ----------
	// If the user selected 'system', respond to changes in the OS color scheme
	// (e.g. user switches system-wide theme). We only apply these changes when
	// the saved preference is 'system'.
	const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
	const handleSystem = () => {
		if ((localStorage.getItem(STORAGE_KEY) || 'system') === 'system') {
			applyTheme(mq.matches ? 'dark' : 'light');
		}
	};

	if (mq) {
		if (mq.addEventListener) mq.addEventListener('change', handleSystem);
		else if (mq.addListener) mq.addListener(handleSystem); // older browsers
	}
});
