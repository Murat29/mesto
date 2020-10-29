export class UserInfo {
    constructor(selectorUserInfo) {
        this._name = document.querySelector(selectorUserInfo.nameSelector);
        this._job = document.querySelector(selectorUserInfo.jobSelector);

    }
    getUserInfo() {
        const userInfo = {
            name: this._name.textContent,
            job: this._job.textContent
        };
        return userInfo;
    }

    setUserInfo(userInfo) {
        this._name.textContent = userInfo.name_user;
        this._job.textContent = userInfo.job_user;
    }


}