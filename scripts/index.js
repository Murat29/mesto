const popup = document.querySelector('.popup');
const form = popup.querySelector('.popup__form');
const popupOpenButton = document.querySelector('.button_type_edit');
const popupCloseButton = popup.querySelector('.button_type_close');
const popupSaveButton = form.querySelector('.button_type_save');

const nameInput = form.querySelector('.popup__input_name');
const jobInput = form.querySelector('.popup__input_metier');

const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__metier');

// Закрытие попапа
const popupClose = () => {
    popup.classList.remove('popup_is-opened');
}

// Открытие попапа, с добавлением в текста в input'ы 
const popupOpen = () => {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    popup.classList.add('popup_is-opened');
}

// Закрытие попапа, кликом на затемненную область
const popupCloseByClickOnOverlay = (event) => {
    if (event.target !== event.currentTarget) {
        return
    }
    popupClose(event);
}


// Перезаписывание имени и вида деятельности
const formSubmitHandler = (evt) => {
    evt.preventDefault();

    name.textContent = nameInput.value;
    job.textContent = jobInput.value;

    popupClose();

}

form.addEventListener('submit', formSubmitHandler);
popupOpenButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
popup.addEventListener('click', popupCloseByClickOnOverlay);