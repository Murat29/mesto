import '../../pages/index.css'
import {
    params,
    selectorUserInfo,
    cardsContainer,
    userNameInput,
    userJobInput,
    сonsentSabmitBatton,
    formAddCard,
    formEditAvatar,
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
})

export { api }
const imgPopup = new PopupWithImage('.popup_type_img');


const instanceСlassSection = new Section(renderer, cardsContainer);

//функция для класса Section
function renderer(item) {
    const instanceСlassСard = new Card(item, '.card-template', imgPopup.handleCardClick.bind(imgPopup), сonsentPopup, myId, сonsentSabmitBatton, apiDeleteCard, apiLike);
    const newCard = instanceСlassСard.generateCard()
    instanceСlassSection.setItemPrepend(newCard);
}

function apiLike(isLike) {
    if (isLike) {
        return api.deleteLike(this._cardId)
            .then(data => data)

    } else {
        return api.putLike(this._cardId)
            .then(data => data)
    }
}

function apiDeleteCard(cardId) {
    return api.deleteCard(cardId)
        .then(() => {
            сonsentPopup.close();
        })
        .catch(err => {
            alert(err);
        });
}

//рендер начальных карточек
api.getCards()
    .then(result => {
        const initialCardsList = result.reverse();
        instanceСlassSection.renderItems(initialCardsList);
    })
    .catch(err => {
        alert(err);
    });

const getInfo = new UserInfo(selectorUserInfo);

let myId;

//первоночальная отрисовка данных пользователя
api.getUser()
    .then((result) => {
        myId = result._id;
        const userInfo = {
            name_user: result.name,
            job_user: result.about,
        }
        getInfo.setUserAvatar(result.avatar);
        getInfo.setUserInfo(userInfo);

    })
    .catch(err => {
        alert(err);
    });

const editPopup = new PopupWithForm('.popup_type_edit', formSubmitHandlerEdit);
document.querySelector('.button_type_edit').addEventListener('click', () => {
    formEditValidator.clearErrors();
    formEditValidator.enabledButton();
    const dataUser = getInfo.getUserInfo();
    userNameInput.value = dataUser.name;
    userJobInput.value = dataUser.job;
    editPopup.open();
});

const addPopup = new PopupWithForm('.popup_type_add', formSubmitHandlerAdd);
document.querySelector('.button_type_add').addEventListener('click', () => {
    formAddCard.reset();
    formAddValidator.clearErrors()
    formAddValidator.disabledButton()
    addPopup.open();
});

const editAvatarPopup = new PopupWithForm('.popup_type_edit-avatar', formSubmitHandlerEditAvatar);
document.querySelector('.profile__avatar-conteiner').addEventListener('click', () => {
    formEditAvatar.reset();
    formEditAvatarValidator.clearErrors()
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


//сабмиты
function formSubmitHandlerEdit(evt, dataUser) {
    renderLoading(true, evt)
    api.editUser(dataUser)
        .then(result => {
            const dataUser = {
                name_user: result.name,
                job_user: result.about,
                avatar_user: result.avatar,
            }
            getInfo.setUserInfo(dataUser);
            editPopup.close();
        })
        .catch(err => {
            alert(err);
        })
        .finally(() => {
            renderLoading(false, evt)
        });
}

function formSubmitHandlerAdd(evt, dataNewCard) {
    renderLoading(true, evt)
    api.createCard(dataNewCard)
        .then((data) => {

            instanceСlassSection.renderItems([data]);
            addPopup.close();
        })
        .catch(err => {
            alert(err);
        })
        .finally(() => {
            renderLoading(false, evt)
        });

}

function formSubmitHandlerEditAvatar(evt, DataAvatar) {
    renderLoading(true, evt)
    api.editAvatar(DataAvatar.avatar_user)
        .then((data) => {
            getInfo.setUserAvatar(data.avatar);
            editAvatarPopup.close();
        })
        .catch(err => {
            alert(err);
        })
        .finally(() => {
            renderLoading(false, evt)
        });
    renderLoading(false, evt)

}

function renderLoading(isLoading, evt) {
    const buttonSabmit = evt.target.querySelector('.button__sabmit')
    if (isLoading) {
        buttonSabmit.textContent = `${buttonSabmit.textContent}...`
    } else {
        buttonSabmit.textContent = buttonSabmit.textContent.slice(0, -3);

    }
}