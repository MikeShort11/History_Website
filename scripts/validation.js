let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
let emailRegex = /[\w]*@[\w]*.{1}(com|gov|edu|io|net){1}/;
let zipCodeRegex = /(?<zip1>\d{5})([-]?(?<zip2>\d{4}))?(?<ERROR>.+)?/

const stateAbbreviations = [
	'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
	'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
	'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
	'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
	'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
];

let form = null;
let successMsg = null;

function initValidation(formId, successId) {
	form = document.getElementById(formId);
	successMsg = document.getElementById(successId);

	let inputs = document.querySelectorAll("input");
	for (let input of inputs) {
		input.addEventListener("change", inputChanged);
	}
	form.addEventListener("submit", submitForm);
}

function inputChanged(ev) {
	let el = ev.currentTarget;
	validateForm();
	/*NOTE: we use 'was-validated' class so that you show the error indications only for the single field rather than the whole form at once*/
	el.classList.add('was-validated');
}

function submitForm(ev) {
	console.log("in submit");
	let form = ev.currentTarget;
	//if you don't preventDefault and stopPropagation
	//the default form action would be to redirect to the url in the 'action' attribute of the form
	//https://wp.zybooks.com/form-viewer.php
	ev.preventDefault(); //for now so we don't redirect
	ev.stopPropagation();

	validateForm();

	//DOM checkValidity function tells you current status of form according to html5
	if (!form.checkValidity()) {
		// Form is invalid - add validation class to show errors
		form.classList.add('was-validated');
	} else {
		// TODO - hide form and show success Message
		form.style.display = 'none';
		successMsg.style.display = 'block';
	}
}

function validateForm() {
	checkRequired("first-name", "First Name is Required");
	checkRequired("last-name", "Last Name is Required");
	checkRequired("address", "Address is Required");
	checkRequired("city", "City is Required");

	if (checkRequired("state", "State is Required")) {
		validateState("state", "Not a valid State, enter two digit code e.g., UT");
	}

	if (checkRequired("email", "Email Address is required")) {
		checkFormat("email", "email format is bad", emailRegex);
	}
	if (checkRequired("zip", "Zip Code is Required")) {
		checkFormat("zip", `malformed zip-code, please use either "#####", or "#####-#### format.`, zipCodeRegex);
	}
	if (checkRequired("phone", "Phone is required")) {
		checkFormat("phone", "phone format is bad", phoneRegex);
	}
	checkRequired("newspaper", "you must select at least one!");
}

function validateState(id, msg) {
	let el = document.getElementById(id);
	let valid = false;

	let value = el.value.trim().toUpperCase();

	valid = stateAbbreviations.includes(value);
	setElementValidity(id, valid, msg);
	return valid;
}

function checkFormat(id, msg, regex) {
	//this function applies a regex to determine if element is valid
	let el = document.getElementById(id);
	let value = el.value;
	let valid = regex.test(value);

	setElementValidity(id, valid, msg);
	return valid;
}

function checkRequired(id, message) {
	let el = document.getElementById(id);
	let valid = false;
	let type = el.type;

	switch (type) {
		case 'text':
		case 'password':
		case 'email':
			valid = el.value.trim() !== '';
			break;

		case 'checkbox':
		case 'radio':
			//Validate whether any of the checkboxes are checked. set 'valid' to true if checked
			//remember that the 'name' field is shared by all of them so you can get the element's name, then
			//use a querySelectorAll to get the radio/check elements to validate.
			//if any of the elements is 'checked', return true.
			let name = el.name;
			let elements = document.querySelectorAll(`input[name="${name}"]`);
			for (let element of elements) {
				if (element.checked) {
					valid = true;
					break;
				}
			}
			break;
	}

	setElementValidity(id, valid, message);
	return valid;
}

function setElementValidity(id, valid, message) {
	let el = document.getElementById(id);
	let errorDiv = el.parentElement.querySelector('.errorMsg');

	if (valid) {
		el.setCustomValidity('');
		if (errorDiv) {
			errorDiv.textContent = '';
		}
	} else {
		el.setCustomValidity(message);
		if (errorDiv) {
			errorDiv.textContent = message;
		}
	}
}
