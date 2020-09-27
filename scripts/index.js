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

const cardTemplate = document.querySelector('.card-template').content;
const cardsContainer = document.querySelector('.cards__container');

const editPopup = document.querySelector('.popup_type_edit');
const inputUserName = editPopup.querySelector('#popup__input_user-name');
const inputUserJob = editPopup.querySelector('#popup__input_user-job');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');

const addPopup = document.querySelector('.popup_type_add')
const inputCardrName = addPopup.querySelector('#popup__input_card-name');
const inputCardLink = addPopup.querySelector('#popup__input_card-link');

const imgPopup = document.querySelector('.popup_type_img')
const increaseImg = imgPopup.querySelector('.popup__img')
const captionImg = imgPopup.querySelector('.popup__img-caption')


//добавление начальных карточек на страницу
function render() {
    initialCards.forEach(renderItem);
    setListeners();
};

//добавление новой карточки
function renderItem(item) {
    const card = cardTemplate.cloneNode(true);
    card.querySelector('.cards__title').textContent = item.name;
    card.querySelector('.cards__image').src = item.link;
    cardsContainer.prepend(card);
}

//функция лайка
function handleLike(evt) {
    evt.classList.toggle('button_active');
}

//функция открытия попапа редактирования
function openEditPopup() {
    inputUserName.value = userName.textContent;
    inputUserJob.value = userJob.textContent;
    editPopup.classList.add('popup_is-opened');
    document.addEventListener('keydown', popupCloseEsc);
}

//функция закрытия попапа, кликом на Esc
function popupCloseEsc(evt) {
    if (evt.key === "Escape") {
        editPopup.classList.remove('popup_is-opened');
        addPopup.classList.remove('popup_is-opened');
        imgPopup.classList.remove('popup_is-opened');
    }
}

//функция открытия попапа добавления карточек
function openAddPopup() {
    inputCardrName.value = '';
    inputCardLink.value = '';
    addPopup.classList.add('popup_is-opened');
    document.addEventListener('keydown', popupCloseEsc);
}

//функция открытия попапа c изображением
function openImgPopup(evt) {
    increaseImg.src = evt.src;
    captionImg.textContent = evt.nextElementSibling.nextElementSibling.firstElementChild.textContent;
    imgPopup.classList.add('popup_is-opened');
    document.addEventListener('keydown', popupCloseEsc);
}

//функция закрытия попапов
function popupClose(evt) {
    evt.target.closest('.popup').classList.remove('popup_is-opened');
    document.removeEventListener('keydown', popupCloseEsc);
}

//функция закрытия попапа, кликом на затемненную область
function popupCloseByClickOnOverlay(evt) {
    if (evt.target !== evt.currentTarget) {
        return;
    }
    popupClose(evt);
}
//функция удаление карточки
function deleteCard(evt) {
    evt.parentNode.remove();
}

//обработчик событий
function setListeners() {
    //открытие попапа редактирования
    document.querySelector('.button_type_edit').addEventListener('click', openEditPopup);
    //открытие попапа добавления карточек
    document.querySelector('.button_type_add').addEventListener('click', openAddPopup);

    //закрытие попапов
    document.querySelectorAll(".button_type_close").forEach((btn) => {
        btn.addEventListener("click", popupClose);
    });
    //закрытие попапов, кликом на затемненную область
    editPopup.addEventListener('click', popupCloseByClickOnOverlay);
    addPopup.addEventListener('click', popupCloseByClickOnOverlay);
    imgPopup.addEventListener('click', popupCloseByClickOnOverlay);
    //события на карточках
    cardsContainer.addEventListener('click', (evt) => {
        //лайк
        if (evt.target.classList.contains('button_type_like')) {
            handleLike(evt.target);
        }
        //удаление карточки
        if (evt.target.classList.contains('button_type_delete')) {
            deleteCard(evt.target);
        }
        //открытие попапа с увеличенной картинкой
        if (evt.target.classList.contains('cards__image')) {
            openImgPopup(evt.target);
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

    popupClose(evt);
}

// добавление новой карточки
function formSubmitHandlerAdd(evt) {
    evt.preventDefault();
    renderItem({ name: inputCardrName.value, link: inputCardLink.value });
    popupClose(evt);
}

render();