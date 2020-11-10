export class FormValidator {
    constructor(formSelector, params) {
        this._formSelector = formSelector;
        this._formElement = document.querySelector(formSelector);
        this._inputSelector = params.inputSelector;
        this._submitButtonSelector = params.submitButtonSelector;
        this._inactiveButtonClass = params.inactiveButtonClass;
        this._inputErrorClass = params.inputErrorClass;
        this._errorClass = params.errorClass;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
        inputElement.classList.add(this._inputErrorClass);

    }

    clearErrors() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });

    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
        inputElement.classList.remove(this._inputErrorClass);
    }

    _checkInputValidity(inputElement) {
        const isInputNotValid = !inputElement.validity.valid;

        if (isInputNotValid) {
            const errorMessage = inputElement.validationMessage;
            this._showInputError(inputElement, errorMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _toggleButtonState() {

        if (this._checkFormValidity(this._inputList)) {
            this.disabledButton();
        } else {
            this.enabledButton()
        }
    }

    enabledButton() {
        this._buttonElement.removeAttribute('disabled');
        this._buttonElement.classList.remove(this._inactiveButtonClass);
    }

    disabledButton() {
        this._buttonElement.setAttribute('disabled', true);
        this._buttonElement.classList.add(this._inactiveButtonClass);
    }

    _checkFormValidity(inputList) {
        return inputList.some(inputElement => !inputElement.validity.valid);
    }

    _setEventListeners() {
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            })
        });

        this._toggleButtonState();
    }

    enableValidation() {

        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.disabledButton();
        });

        this._setEventListeners(this._formElement);

    }
}