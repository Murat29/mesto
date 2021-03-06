export class UserInfo {
    constructor(selectorUserInfo) {
        this._name = document.querySelector(selectorUserInfo.nameSelector);
        this._job = document.querySelector(selectorUserInfo.jobSelector);
        this._avatar = document.querySelector(selectorUserInfo.avatarSelector);

    }
    getUserInfo() {
        const userInfo = {
            name: this._name.textContent,
            job: this._job.textContent,
        };
        return userInfo;
    }

    setUserInfo(userInfo) {
        this.userInfo = userInfo;
        this._name.textContent = this.userInfo.name_user;
        this._job.textContent = this.userInfo.job_user;

    }

    getUserAvatar() {
        return this._avatar.src;
    }

    setUserAvatar(userAvatarUrl) {
        this._avatar.src = userAvatarUrl;
    }


}