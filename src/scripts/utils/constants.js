//параметры для валидации
export const params = {
    formSelector: '.popup__form',
    formEditSelector: '.popup__form-edit',
    formAddSelector: '.popup__form-add',
    formEditAvatarSelector: '.popup__form-edit-avatar',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button',
    inactiveButtonClass: 'button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

export const selectorUserInfo = {
    nameSelector: '.profile__name',
    jobSelector: '.profile__job',
    avatarSelector: '.profile__avatar',
}

export const cardsContainer = document.querySelector('.cards__container');
export const userNameInput = document.querySelector('#popup__input_user-name');
export const userJobInput = document.querySelector('#popup__input_user-job');