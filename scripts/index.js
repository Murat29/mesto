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

const cardTemplate = document.querySelector('#card').content;
const cardsContainer = document.querySelector('.cards__container');
//добавление начальных карточек на страницу
initialCards.forEach((item, index) => {
    item = cardTemplate.cloneNode(true);
    item.querySelector('.cards__title').textContent = initialCards[index].name;
    item.querySelector('.cards__image').src = initialCards[index].link;


    //кнопка лайк
    item.querySelector('.button_type_like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('button_active');
    });
    //кнопка удаления карточек
    const deleteCardButton = item.querySelector('.button_type_delete');
    deleteCardButton.addEventListener('click', function() {
        deleteCardButton.parentElement.remove();
    });



    cardsContainer.append(item);
});

const editPopup = document.querySelector('.popup_type_edit');
const inputUserName = editPopup.querySelector('.popup__input_user-name');
const inputUserJob = editPopup.querySelector('.popup__input_user-job');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
//функция открытия попапа редактирования
const openEditPopup = () => {
    inputUserName.value = userName.textContent;
    inputUserJob.value = userJob.textContent;
    editPopup.classList.add('popup_is-opened');
}

const popupEditOpenButton = document.querySelector('.button_type_edit');
popupEditOpenButton.addEventListener('click', openEditPopup);

const addPopup = document.querySelector('.popup_type_add')
const inputCardrName = addPopup.querySelector('.popup__input_card-name');
const inputCardLink = addPopup.querySelector('.popup__input_card-link');
//функция открытия попапа добавления карточек
const openAddPopup = () => {
    inputCardrName.value = '';
    inputCardLink.value = '';
    addPopup.classList.add('popup_is-opened');
}

const popupAddOpenButton = document.querySelector('.button_type_add');
popupAddOpenButton.addEventListener('click', openAddPopup);


const popupCloseButton = document.querySelectorAll('.button_type_close');
//функции закрытия попапов
const popupEditClose = () => {
    popupCloseButton[0].closest('.popup').classList.remove('popup_is-opened');
}

const popupAddClose = () => {
    popupCloseButton[1].closest('.popup').classList.remove('popup_is-opened');
}

popupCloseButton[0].addEventListener('click', popupEditClose);
popupCloseButton[1].addEventListener('click', popupAddClose);

//функции закрытия попапов, кликом на затемненную область
const popupEditCloseByClickOnOverlay = (event) => {
    if (event.target !== event.currentTarget) {
        return
    }
    popupEditClose(event);
}

const popupAddCloseByClickOnOverlay = (event) => {
    if (event.target !== event.currentTarget) {
        return
    }
    popupAddClose(event);
}

editPopup.addEventListener('click', popupEditCloseByClickOnOverlay);
addPopup.addEventListener('click', popupAddCloseByClickOnOverlay);

// Перезаписывание имени и вида деятельности
const formSubmitHandlerEdit = (evt) => {
    evt.preventDefault();

    userName.textContent = inputUserName.value;
    userJob.textContent = inputUserJob.value;

    popupEditClose();
}

editPopup.addEventListener('submit', formSubmitHandlerEdit);



// добавление новой карточки
const formSubmitHandlerAdd = (evt) => {
    evt.preventDefault();
    const card = cardTemplate.cloneNode(true);
    card.querySelector('.cards__title').textContent = inputCardrName.value;
    card.querySelector('.cards__image').src = inputCardLink.value;



    //кнопка лайк
    card.querySelector('.button_type_like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('button_active');
    });
    //кнопка удаления карточек
    const deleteCardButton = card.querySelector('.button_type_delete');
    deleteCardButton.addEventListener('click', function() {
        deleteCardButton.parentElement.remove();
    });


    cardsContainer.prepend(card);
    popupAddClose();
}

addPopup.addEventListener('submit', formSubmitHandlerAdd);