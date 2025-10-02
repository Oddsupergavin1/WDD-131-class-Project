document.addEventListener('DOMContentLoaded', () => {
	const selectElem = document.getElementById('theme-select') || document.querySelector('select');

	const logo = document.querySelector('main img') || document.querySelector('img');

	const STORAGE_KEY = 'mission-theme-preference';

	if (!selectElem) return console.warn('Theme select not found.');

	const LIGHT_LOGO = '../images/byui-logo-blue.webp';
	const DARK_LOGO  = '../images/byui-logo-white.png';
	const PURPLE_LOGO = '../images/byui-logo-white.png';

	function applyTheme(value) {
		if (value === 'dark') {
			document.documentElement.setAttribute('data-theme', 'dark');
		} else if (value === 'light') {
			document.documentElement.setAttribute('data-theme', 'light');
		} else if (value === 'purple') {
			document.documentElement.setAttribute('data-theme', 'purple'); 
		} else {
			document.documentElement.removeAttribute('data-theme');
		}

		if (logo) {
			if (value === 'dark') logo.src = DARK_LOGO;
			else if (value === 'purple') logo.src = PURPLE_LOGO;
			else logo.src = LIGHT_LOGO;
		}
	}

	let saved = 'system';
	try { saved = localStorage.getItem(STORAGE_KEY) || 'system'; } catch (err) { }

	if (['dark', 'light', 'purple', 'system'].includes(saved)) selectElem.value = saved;

	applyTheme(saved === 'system' ? (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : saved);

	selectElem.addEventListener('change', (e) => {
		const value = e.target.value;
		try { localStorage.setItem(STORAGE_KEY, value); } catch (err) { }
		applyTheme(value);
	});

	const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
	const handleSystem = () => {
		if ((localStorage.getItem(STORAGE_KEY) || 'system') === 'system') {
			applyTheme(mq.matches ? 'dark' : 'light');
		}
	};

	if (mq) {
		if (mq.addEventListener) mq.addEventListener('change', handleSystem);
		else if (mq.addListener) mq.addListener(handleSystem);
	}
});
