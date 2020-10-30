import '../../pages/index.css'
import {
    initialCards,
    params,
    selectorUserInfo,
    cardsContainer,
    userNameInput,
    userJobInput
} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';


const imgPopup = new PopupWithImage('.popup_type_img');

//рендер начальных карточек
const defaultCardList = new Section({ data: initialCards, renderer: rendererAppend }, cardsContainer);
defaultCardList.renderItems();

const getInfo = new UserInfo(selectorUserInfo);

const editPopup = new PopupWithForm('.popup_type_edit', formSubmitHandlerEdit);
document.querySelector('.button_type_edit').addEventListener('click', () => {
    formEditValidator.hideInputError();
    formEditValidator.enabledButton();
    const dataUser = getInfo.getUserInfo();
    userNameInput.value = dataUser.name;
    userJobInput.value = dataUser.job;
    editPopup.open();
});

const addPopup = new PopupWithForm('.popup_type_add', formSubmitHandlerAdd);
document.querySelector('.button_type_add').addEventListener('click', () => {
    document.querySelector('.popup_type_add').querySelector('.popup__form').reset();
    formAddValidator.hideInputError();
    formAddValidator.disabledButton()
    addPopup.open();
});

//валидация форм
const formEditValidator = new FormValidator(params.formEditSelector, params);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(params.formAddSelector, params);
formAddValidator.enableValidation();

//функция для класса Section
function rendererAppend(item) {
    const cardElement = rendererCard(item);
    defaultCardList.setItemAppend(cardElement);
}

function rendererPrepend(item) {
    const cardElement = rendererCard(item);
    defaultCardList.setItemPrepend(cardElement);
}

function rendererCard(item) {
    const card = new Card(item, '.card-template', imgPopup.handleCardClick.bind(imgPopup));
    return card.generateCard();
}

//сабмиты
function formSubmitHandlerEdit(dataUser) {
    getInfo.setUserInfo(dataUser);
    editPopup.close();
}

function formSubmitHandlerAdd(dataNewCard) {
    addPopup.close();
    const newCard = new Section({ data: [dataNewCard], renderer: rendererPrepend }, '.cards__container');
    newCard.renderItems();
}