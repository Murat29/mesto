//массив начальных карточек
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

const cardTemplate = document.querySelector('.card-template').content;
const cardsContainer = document.querySelector('.cards__container');



const editPopup = document.querySelector('.popup_type_edit');
const inputUserName = editPopup.querySelector('.popup__input_user-name');
const inputUserJob = editPopup.querySelector('.popup__input_user-job');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');

const addPopup = document.querySelector('.popup_type_add')
const inputCardrName = addPopup.querySelector('.popup__input_card-name');
const inputCardLink = addPopup.querySelector('.popup__input_card-link');

const imgPopup = document.querySelector('.popup_type_img')
const increaseImg = imgPopup.querySelector('.popup__img')
const captionImg = imgPopup.querySelector('.popup__img-caption')
    //добавление начальных карточек на страницу
function render() {
    initialCards.forEach(renderItem);
    setListeners();

};
render();

function renderItem(item, index) {
    item = cardTemplate.cloneNode(true);
    item.querySelector('.cards__title').textContent = initialCards[index].name;
    item.querySelector('.cards__image').src = initialCards[index].link;
    cardsContainer.append(item);
}
//функция лайка
function handleLike(evt) {
    evt.target.classList.toggle('button_active');
}

//функция открытия попапа редактирования
function openEditPopup() {
    inputUserName.value = userName.textContent;
    inputUserJob.value = userJob.textContent;
    editPopup.classList.add('popup_is-opened');
}

//функция открытия попапа добавления карточек
function openAddPopup() {
    inputCardrName.value = '';
    inputCardLink.value = '';
    addPopup.classList.add('popup_is-opened');
}

//функция открытия попапа c изображением
function openImgPopup(evt) {
    increaseImg.src = evt.target.src;
    captionImg.textContent = evt.target.nextElementSibling.nextElementSibling.firstElementChild.textContent;
    imgPopup.classList.add('popup_is-opened');
}

//функция закрытия попапов
function popupClose(evt) {
    evt.target.closest('.popup').classList.remove('popup_is-opened');

}

//функция закрытия попапа, кликом на затемненную область
function popupCloseByClickOnOverlay(evt) {
    if (evt.target !== evt.currentTarget) {
        return
    }
    popupClose(evt);
}

function deleteCard(evt) {
    evt.target.parentNode.remove();
}

//обработчик событий
function setListeners() {
    //удаление начальных карточек
    cardsContainer.querySelectorAll(".button_type_delete").forEach((btn) => {
        btn.addEventListener("click", deleteCard);
    });
    //лайк на начальные карточки
    document.querySelectorAll(".button_type_like").forEach((btn) => {
        btn.addEventListener("click", handleLike);
    });
    //открытие попапа редактирования
    document.querySelector('.button_type_edit').addEventListener('click', openEditPopup);
    //открытие попапа добавления карточек
    document.querySelector('.button_type_add').addEventListener('click', openAddPopup);
    //открытие попапа с изображением
    document.querySelectorAll(".cards__image").forEach((btn) => {
        btn.addEventListener("click", openImgPopup);
    });
    //закрытие попапов
    document.querySelectorAll(".button_type_close").forEach((btn) => {
        btn.addEventListener("click", popupClose);
    });
    //закрытие попапов, кликом на затемненную область
    editPopup.addEventListener('click', popupCloseByClickOnOverlay);
    addPopup.addEventListener('click', popupCloseByClickOnOverlay);
    imgPopup.addEventListener('click', popupCloseByClickOnOverlay);
    //отправка форм
    editPopup.addEventListener('submit', formSubmitHandlerEdit);
    addPopup.addEventListener('submit', formSubmitHandlerAdd);
};

// Перезаписывание имени и вида деятельности
function formSubmitHandlerEdit(evt) {
    evt.preventDefault();

    userName.textContent = inputUserName.value;
    userJob.textContent = inputUserJob.value;

    popupClose(evt);
}

// добавление новой карточки
function formSubmitHandlerAdd(evt) {
    evt.preventDefault();
    const card = cardTemplate.cloneNode(true);
    card.querySelector('.cards__title').textContent = inputCardrName.value;
    card.querySelector('.cards__image').src = inputCardLink.value;

    //лайк на динамические карточки
    card.querySelectorAll(".button_type_like").forEach((btn) => {
        btn.addEventListener("click", handleLike);
    });
    //удаление динамических карточек
    card.querySelectorAll(".button_type_delete").forEach((btn) => {
        btn.addEventListener("click", deleteCard);
    });
    card.querySelectorAll(".cards__image").forEach((btn) => {
        btn.addEventListener("click", openImgPopup);
    });


    cardsContainer.prepend(card);
    popupClose(evt);
}