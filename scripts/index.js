import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

//начальные карточки
const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//параметры для валидации
const params = {
    formSelector: '.popup__form',
    formEditSelector: '.popup__form-edit',
    formAddSelector: '.popup__form-add',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button',
    inactiveButtonClass: 'button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

const cardsContainer = document.querySelector('.cards__container');

const editPopup = document.querySelector('.popup_type_edit');
const inputUserName = editPopup.querySelector('#popup__input_user-name');
const inputUserJob = editPopup.querySelector('#popup__input_user-job');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');

const addPopup = document.querySelector('.popup_type_add');
const addForm = addPopup.querySelector('.popup__form-add');
const inputCardrName = addPopup.querySelector('#popup__input_card-name');
const inputCardLink = addPopup.querySelector('#popup__input_card-link');

const imgPopup = document.querySelector('.popup_type_img');
const increaseImg = imgPopup.querySelector('.popup__img');
const captionImg = imgPopup.querySelector('.popup__img-caption');


//добавление начальных карточек на страницу
function render() {
    initialCards.forEach(renderItem);
    setListeners();
};





//функция добавление карточки
function renderItem(item) {
    const card = new Card(item, '.card-template');
    const cardElement = card.generateCard();
    cardsContainer.prepend(cardElement);
}

//функция открытия попапа редактирования
function openEditPopup() {
    inputUserName.value = userName.textContent;
    inputUserJob.value = userJob.textContent;
    openPopup(editPopup);
}

//функция открытия попапа с увеличенной картинкой
export function openImgPopup(title, link) {
    captionImg.textContent = title;
    increaseImg.src = link;
    openPopup(imgPopup);
}

//функция закрытия попапа, кликом на Esc
function closePopupEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    }
}

//функция открытия попапа добавления карточек
function openAddPopup() {
    addForm.reset();
    openPopup(addPopup);
}



//функция открытия попапов
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keyup', closePopupEsc);
}

//функция закрытия попапов
function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keyup', closePopupEsc);
}


//обработчик событий
function setListeners() {
    //открытие попапа редактирования
    document.querySelector('.button_type_edit').addEventListener('click', openEditPopup);
    //открытие попапа добавления карточек
    document.querySelector('.button_type_add').addEventListener('click', openAddPopup);

    //закрытие попапов кликом на крестик и оверлей
    editPopup.addEventListener("click", (evt) => {
        if (evt.target.classList.contains('popup_type_edit') || evt.target.classList.contains('button__image')) {
            closePopup(editPopup)
        }
    });
    addPopup.addEventListener("click", (evt) => {
        if (evt.target.classList.contains('popup_type_add') || evt.target.classList.contains('button__image')) {
            closePopup(addPopup)
        }
    });
    imgPopup.addEventListener("click", (evt) => {
        if (evt.target.classList.contains('popup_type_img') || evt.target.classList.contains('button__image')) {
            closePopup(imgPopup)
        }
    });

    //отправка форм
    editPopup.addEventListener('submit', formSubmitHandlerEdit);
    addPopup.addEventListener('submit', formSubmitHandlerAdd);
};

// Перезаписывание имени и вида деятельности
function formSubmitHandlerEdit(evt) {
    evt.preventDefault();

    userName.textContent = inputUserName.value;
    userJob.textContent = inputUserJob.value;

    closePopup(editPopup);
}

// добавление новой карточки
function formSubmitHandlerAdd(evt) {
    evt.preventDefault();
    renderItem({ name: inputCardrName.value, link: inputCardLink.value });
    closePopup(addPopup);
}

render();

const formEditValidator = new FormValidator(params.formEditSelector, params, openImgPopup);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(params.formAddSelector, params, openImgPopup);
formAddValidator.enableValidation();