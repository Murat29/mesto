export class Card {
    constructor(data, cardSelector, openImgPopup, api, сonsentPopup, ) {
        this._cardSelector = cardSelector;
        this._data = data;
        this._title = data.name;
        this._image = data.link;
        this._like = data.likes.length;
        this._openImgPopup = openImgPopup;
        this._ownerId = data.owner._id;
        this._myId = 'fb3ae7f26f7cff796656e7e7';
        this._cardId = data._id;
        this._api = api;
        this._сonsentPopup = сonsentPopup;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.cards__card')
            .cloneNode(true);
        return cardElement;
    }

    _installLike(data) {
        this._likeNumber.textContent = data.likes.length;
        if (this._checkingLike(data)) {
            this._element.querySelector('.button_type_like').classList.add('button_active');
        } else {
            this._element.querySelector('.button_type_like').classList.remove('button_active');
        }


    }

    _handleLike() {
        if (this._checkingLike(this._data)) {
            this._api.deleteLike(this._cardId).then(data => {
                this._installLike(data);
                this._data.likes = data.likes;

            })
        } else {
            this._api.putLike(this._cardId).then(data => {
                this._installLike(data);
                this._data.likes = data.likes;
            })

        }
    }

    _checkingLike(data) {
        this._chekLike = false;
        data.likes.forEach(el => {
            if (el._id === this._myId) {
                this._chekLike = true;
            }
        })
        return this._chekLike;
    }

    _sabmitDeleteCard() {

        this._deleteCardWrapper = () => {
            this._deleteCard();
        }

        this.сonsentSabmit = document.querySelector('.popup_type_сonsent').querySelector('.button__sabmit')

        this.сonsentSabmit.addEventListener('click', this._deleteCardWrapper);



    }

    _deleteCard() {
        console.log(this._api);
        this._api.deleteCard(this._cardId);
        this._element.remove();
        this.сonsentSabmit.removeEventListener('click', this._deleteCardWrapper);
        this._сonsentPopup.close();
    }

    _setEventListeners() {
        this._element.querySelector('.cards__image').addEventListener('click', () => {
            this._openImgPopup(this._title, this._image);
        });

        this._element.querySelector('.button_type_like').addEventListener('click', () => {
            this._handleLike();
        });

        if (this._myId === this._ownerId) {
            this._butttonDelete = this._element.querySelector('.button_type_delete');
            this._butttonDelete.addEventListener('click', (evt) => {
                this._сonsentPopup.open();
                this._sabmitDeleteCard();
            });
            this._butttonDelete.classList.add('button_visible');
        }
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.cards__image');
        this._element.querySelector('.cards__title').textContent = this._title;
        this._cardImage.src = this._image;
        this._cardImage.alt = `Изображение места ${this._title}`;
        this._likeNumber = this._element.querySelector('.card__like-number');
        this._installLike(this._data);
        this._setEventListeners();

        return this._element;
    }
}