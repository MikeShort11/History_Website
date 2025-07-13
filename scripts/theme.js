const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
	const existingTheme = document.getElementById('theme-style');

	if (existingTheme) {
		// Theme is currently applied; remove it
		existingTheme.remove();
	} else {
		const themeLink = document.createElement('link');
		themeLink.rel = 'stylesheet';
		themeLink.href = '../styles/dyslexia.css';
		themeLink.id = 'theme-style';
		document.head.appendChild(themeLink);
	}
});

