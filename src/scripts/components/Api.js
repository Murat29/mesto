export class Api {
    constructor(config) {
        this.headers = config.headers;
        this.url = config.url;
    }

    getUser() {
        return fetch(`${this.url}/users/me`, {
                headers: this.headers
            }).then(this._getResponseData)
            .catch(err => {
                alert(err);
            })
    }

    editUser(dataUser) {
        return fetch(`${this.url}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({ name: dataUser.name_user, about: dataUser.job_user })
        }).then(this._getResponseData)

    }

    getCards() {
        return fetch(`${this.url}/cards`, {
                headers: this.headers
            }).then(this._getResponseData)
            .catch(err => {
                alert(err);
            })
    }

    createCard(dataCard) {
        return fetch(`${this.url}/cards`, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({ name: dataCard.name, link: dataCard.link })
            }).then(this._getResponseData)
            .catch(err => {
                alert(err);
            })
    }

    deleteCard(id) {
        return fetch(`${this.url}/cards/${id}`, {
                method: "DELETE",
                headers: this.headers,
            }).then(this._getResponseData)
            .catch(err => {
                alert(err);
            })
    }

    putLike(id) {
        return fetch(`${this.url}/cards/likes/${id}`, {
                method: "PUT",
                headers: this.headers,
            }).then(this._getResponseData)
            .catch(err => {
                alert(err);
            })
    }

    deleteLike(id) {
        return fetch(`${this.url}/cards/likes/${id}`, {
                method: "DELETE",
                headers: this.headers,
            }).then(this._getResponseData)
            .catch(err => {
                alert(err);
            })
    }

    editAvatar(avatarUrl) {
        return fetch(`${this.url}/users/me/avatar`, {
                method: "PATCH",
                headers: this.headers,
                body: JSON.stringify({ avatar: avatarUrl })
            }).then(this._getResponseData)
            .catch(err => {
                alert(err);
            })
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
}