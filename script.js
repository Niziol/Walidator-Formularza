const username = document.querySelector('#username');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const sendBtn = document.querySelector('.send');
const clearBtn = document.querySelector('.clear');
const popup = document.querySelector('.popup');
const popupCloseBtn = document.querySelector('.close');

const errorColor = 'tomato';
const warningColor = 'gold';
const goodColor = 'lime';

const showError = (input, msg, color = errorColor) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector('.error-text');
	errorMsg.textContent = msg;
	errorMsg.style.color = color;
	formBox.classList.add('error');
};

const clearError = (input) => {
	input.parentElement.classList.remove('error');
};

const checkIfNotEmptyForm = (inputs) => {
	let flag = true;
	inputs.forEach((input) => {
		if (input.value === '') {
			flag = false;
			showError(input, input.placeholder);
		} else {
			clearError(input);
		}
	});
	return flag;
};

const validateLength = (input, minLength) => {
	let flag = true;
	if (input.value.length < minLength) {
		flag = false;
		const inputName = input.previousElementSibling.innerText.slice(0, -1);
		showError(input, `${inputName} składa się z ${minLength} znaków.`);
	}
	return flag;
};

const validatePassword = (password, password2) => {
	let flag = true;
	if (password.value !== password2.value) {
		flag = false;
		showError(password2, 'Hasła do siebie nie pasują!');
	}
	return flag;
};

const validateEmail = (email) => {
	let flag = true;
	const regEx =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (regEx.test(email.value)) {
		clearError(email);
	} else {
		flag = false;
		showError(email, 'Nieprawidłowy adress Email');
	}
	return flag;
};

const checkForErrors = () => {
	const allFormBoxes = document.querySelectorAll('.form-box');
	let errorCount = 0;

	allFormBoxes.forEach((formBox) => {
		if (formBox.classList.contains('error')) {
			errorCount++;
		}
	});

	return errorCount > 0 ? true : false;
};

const validateForm = () => {
	let errorFound = false;

	checkIfNotEmptyForm([username, password, password2, email]) ||
		(errorFound = true);
	validateLength(username, 3) || (errorFound = true);
	validateLength(password, 6) || (errorFound = true);
	validatePassword(password, password2) || (errorFound = true);
	validateEmail(email) || (errorFound = true);

	return !errorFound;
};

const clearForm = () => {
    [username, password, password2, email].forEach((element) => {
        element.value = '';
        clearError(element);
    });
};

sendBtn.addEventListener('click', (e) => {
	e.preventDefault();
	if (validateForm()) {
		popup.classList.add('show-popup');
	}
});

clearBtn.addEventListener('click', (e) => {
	e.preventDefault();
	clearForm();
});
