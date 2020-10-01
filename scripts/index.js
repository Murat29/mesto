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

//функция создание карточки
function renderItem(item) {
    const card = cardTemplate.cloneNode(true);
    card.querySelector('.cards__title').textContent = item.name;
    card.querySelector('.cards__image').src = item.link;
    card.querySelector('.cards__image').alt = `Изображение места ${item.name}`;

    //слушатель открытия попапа с увеличенной картинкой
    card.querySelector('.cards__image').addEventListener('click', () => {
        openImgPopup(item);
    });

    //слушатель кнопки лайк
    card.querySelector('.button_type_like').addEventListener('click', (evt) => {
        handleLike(evt);
    });
    //слушатель кнопки удаления карточки
    card.querySelector('.button_type_delete').addEventListener('click', (evt) => {
        deleteCard(evt);
    });

    //добавление карточки
    getCardElement(card);
}

//функция добавление карточки
function getCardElement(card) {
    cardsContainer.prepend(card);
}

//функция лайка
function handleLike(evt) {
    evt.target.classList.toggle('button_active');
}

//функция открытия попапа редактирования
function openEditPopup() {
    inputUserName.value = userName.textContent;
    inputUserJob.value = userJob.textContent;
    openPopup(editPopup);
}

//функция закрытия попапа, кликом на Esc
function ClosePopupEsc(evt) {
    if (evt.key === "Escape") {
        editPopup.classList.remove('popup_is-opened');
        addPopup.classList.remove('popup_is-opened');
        imgPopup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', ClosePopupEsc);
        // document.querySelector('.popup_is-opened').remove('popup_is-opened');
    }
}

//функция открытия попапа добавления карточек
function openAddPopup() {
    inputCardrName.value = '';
    inputCardLink.value = '';
    openPopup(addPopup);
}

//функция открытия попапа c изображением
function openImgPopup(item) {
    increaseImg.src = item.link;
    captionImg.textContent = item.name;
    openPopup(imgPopup);
}

function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', ClosePopupEsc);
}

//функция закрытия попапов
function closePopup(evt) {
    evt.target.closest('.popup').classList.remove('popup_is-opened');
    document.removeEventListener('keydown', ClosePopupEsc);
}

//функция закрытия попапа, кликом на затемненную область
function closePopupByClickOnOverlay(evt) {
    if (evt.target !== evt.currentTarget) {
        return;
    }
    closePopup(evt);
}
//функция удаление карточки
function deleteCard(evt) {
    evt.target.parentNode.remove();
}

//обработчик событий
function setListeners() {
    //открытие попапа редактирования
    document.querySelector('.button_type_edit').addEventListener('click', openEditPopup);
    //открытие попапа добавления карточек
    document.querySelector('.button_type_add').addEventListener('click', openAddPopup);

    //закрытие попапов
    document.querySelectorAll(".button_type_close").forEach((btn) => {
        btn.addEventListener("click", closePopup);
    });
    //закрытие попапов, кликом на затемненную область
    editPopup.addEventListener('click', closePopupByClickOnOverlay);
    addPopup.addEventListener('click', closePopupByClickOnOverlay);
    imgPopup.addEventListener('click', closePopupByClickOnOverlay);
    //отправка форм
    editPopup.addEventListener('submit', formSubmitHandlerEdit);
    addPopup.addEventListener('submit', formSubmitHandlerAdd);
};

// Перезаписывание имени и вида деятельности
function formSubmitHandlerEdit(evt) {
    evt.preventDefault();

    userName.textContent = inputUserName.value;
    userJob.textContent = inputUserJob.value;

    closePopup(evt);
}

// добавление новой карточки
function formSubmitHandlerAdd(evt) {
    evt.preventDefault();
    renderItem({ name: inputCardrName.value, link: inputCardLink.value });
    closePopup(evt);
}

render();