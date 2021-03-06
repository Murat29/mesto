import { Popup } from '../components/Popup.js';

export class PopupWithForm extends Popup {
    constructor(cardSelector, submitForm) {
        super(cardSelector);
        this._popup = document.querySelector(cardSelector);
        this._submitForm = submitForm;
    }

    close() {
        this._popup.querySelector('.popup__form').reset();
        this._popup.removeEventListener("submit", this.sabmitHandler);
        super.close();
    }


    _getInputValues() {
        this._dataNewCard = {};
        this._popup.querySelectorAll('.popup__input').forEach((item) => {
            this._dataNewCard[item.name] = item.value;
        })
        return this._dataNewCard;
    }

    setEventListeners() {
        this.sabmitHandler = (evt) => {
            this._submitForm(evt, this._getInputValues());
        }
        this._popup.addEventListener("submit", this.sabmitHandler);

        super.setEventListeners();
    }
}