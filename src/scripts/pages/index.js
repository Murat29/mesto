import '../../pages/index.css'
import {
    params,
    selectorUserInfo,
    cardsContainer,
    userNameInput,
    userJobInput
} from '../utils/constants.js';
import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Popup } from '../components/Popup';

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-17',
    headers: {
        authorization: '923b3475-66ff-48a8-819e-62accc3d5c64',
        'Content-Type': 'application/json'
    }
});

const imgPopup = new PopupWithImage('.popup_type_img');

//рендер начальных карточек
api.getCards().then(initialCards => {
    const defaultCardList = new Section({ data: initialCards, renderer: rendererAppend }, cardsContainer);
    defaultCardList.renderItems();

    //функция для класса Section
    function rendererAppend(item) {
        const cardElement = rendererCard(item);
        defaultCardList.setItemAppend(cardElement);
    }
});

const getInfo = new UserInfo(selectorUserInfo);


api.getUser().then((result) => {
    const userInfo = {
        name_user: result.name,
        job_user: result.about,
    }
    getInfo.setUserAvatar(result.avatar);
    getInfo.setUserInfo(userInfo);

});

const editPopup = new PopupWithForm('.popup_type_edit', formSubmitHandlerEdit);
document.querySelector('.button_type_edit').addEventListener('click', () => {
    formEditValidator.hideInputError(document.querySelector('#popup__input_user-name'));
    formEditValidator.hideInputError(document.querySelector('#popup__input_user-job'));
    formEditValidator.enabledButton();
    const dataUser = getInfo.getUserInfo();
    userNameInput.value = dataUser.name;
    userJobInput.value = dataUser.job;
    editPopup.open();
});

const addPopup = new PopupWithForm('.popup_type_add', formSubmitHandlerAdd);
document.querySelector('.button_type_add').addEventListener('click', () => {
    document.querySelector('.popup_type_add').querySelector('.popup__form').reset();
    formAddValidator.hideInputError(document.querySelector('#popup__input_card-name'));
    formAddValidator.hideInputError(document.querySelector('#popup__input_card-link'));
    formAddValidator.disabledButton()
    addPopup.open();
});

const editAvatarPopup = new PopupWithForm('.popup_type_edit-avatar', formSubmitHandlerEditAvatar);
document.querySelector('.profile__avatar-conteiner').addEventListener('click', () => {
    document.querySelector('.popup_type_edit-avatar').querySelector('.popup__form').reset();
    formEditAvatarValidator.hideInputError(document.querySelector('#popup__input_user-avatar'));
    formEditAvatarValidator.disabledButton()
    editAvatarPopup.open();
});

const сonsentPopup = new Popup('.popup_type_сonsent');


//валидация форм
const formEditValidator = new FormValidator(params.formEditSelector, params);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(params.formAddSelector, params);
formAddValidator.enableValidation();

const formEditAvatarValidator = new FormValidator(params.formEditAvatarSelector, params);
formEditAvatarValidator.enableValidation();




//функция для rendererPrepend и rendererAppend
function rendererCard(item) {
    const card = new Card(item, '.card-template', imgPopup.handleCardClick.bind(imgPopup), api, сonsentPopup);
    return card.generateCard();
}

//сабмиты
function formSubmitHandlerEdit(evt, dataUser) {
    renderLoading(true, evt)
    api.editUser(dataUser).then(result => {
        const dataUser = {
            name_user: result.name,
            job_user: result.about,
            avatar_user: result.avatar,
        }
        getInfo.setUserInfo(dataUser);
    })
    renderLoading(false, evt)
    editPopup.close();
}

function formSubmitHandlerAdd(evt, dataNewCard) {
    renderLoading(true, evt)
    api.createCard(dataNewCard).then((data) => {

        const newCard = new Section({ data: [data], renderer: rendererPrepend }, cardsContainer);
        //функция для класса Section
        function rendererPrepend(item) {
            const cardElement = rendererCard(item);
            newCard.setItemPrepend(cardElement);
        }

        newCard.renderItems();
    });
    renderLoading(false, evt)
    addPopup.close();
}

function formSubmitHandlerEditAvatar(evt, DataAvatar) {
    renderLoading(true, evt)
    api.editAvatar(DataAvatar.avatar_user).then((data) => {
        getInfo.setUserAvatar(data.avatar);
    });
    renderLoading(false, evt)
    editAvatarPopup.close();
}

function renderLoading(isLoading, evt) {
    const buttonSabmit = evt.target.querySelector('.button__sabmit')
    if (isLoading) {
        buttonSabmit.textContent = `${buttonSabmit.textContent}...`
    } else {
        buttonSabmit.textContent = buttonSabmit.textContent.slice(0, -3);

    }
}