export class Card {
    constructor(data, cardSelector, openImgPopup, сonsentPopup, myId, сonsentSabmitBatton, apiDeleteCard, apiLike) {
        this._cardSelector = cardSelector;
        this._data = data;
        this._title = data.name;
        this._image = data.link;
        this._like = data.likes.length;
        this._openImgPopup = openImgPopup;
        this._ownerId = data.owner._id;
        this._myId = myId;
        this._cardId = data._id;
        this._сonsentPopup = сonsentPopup;
        this._сonsentSabmitBatton = сonsentSabmitBatton;
        this._apiDeleteCard = apiDeleteCard;
        this._apiLike = apiLike;
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
        this._apiLike(this._checkingLike(this._data))
            .then(data => {
                this._data.likes = data.likes;
                this._installLike(data);
            })
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

        this._сonsentSabmitBatton.addEventListener('click', this._deleteCardWrapper);



    }

    _deleteCard() {
        this._apiDeleteCard(this._cardId)
            .then(() => {
                this._element.remove();
                this._сonsentSabmitBatton.removeEventListener('click', this._deleteCardWrapper);
            })

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