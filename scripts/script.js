function showSection(sectionId) {
	// Hide all sections
	const sections = document.querySelectorAll('section');
	sections.forEach(sec => sec.style.display = 'none');

	// Show the selected section
	document.getElementById(sectionId).style.display = 'grid';
}


document.addEventListener("DOMContentLoaded", function() {
	initValidation("myform");
});
