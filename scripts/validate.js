function showInputError(formElement, inputElement, errorMessage, params) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(params.errorClass);
    inputElement.classList.add(params.inputErrorClass);

};

function hideInputError(formElement, inputElement, params) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(params.errorClass);
    inputElement.classList.remove(params.inputErrorClass);

};

function checkInputValidity(formElement, inputElement) {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        showInputError(formElement, inputElement, errorMessage, params);
    } else {
        hideInputError(formElement, inputElement, params);
    }
};

function toggleButtonState(inputList, buttonElement, params) {

    if (checkFormValidity(inputList)) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(params.inactiveButtonClass);
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(params.inactiveButtonClass);
    }
};

function checkFormValidity(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
}

function setEventListeners(formElement, params) {
    const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
    const buttonElement = formElement.querySelector(params.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, params);
            toggleButtonState(inputList, buttonElement, params);
        })
    });

    toggleButtonState(inputList, buttonElement, params);
};

function enableValidation(params) {
    const formList = Array.from(document.querySelectorAll(params.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement, params);
    });
};

params = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button',
    inactiveButtonClass: 'button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

enableValidation(params);