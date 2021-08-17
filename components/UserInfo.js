export default class UserInfo {
  constructor(userNameElement, userInfoElement) {
    this._userNameElement = userNameElement;
    this._userInfoElement = userInfoElement;
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      job: this._userInfoElement.textContent
    };
  }

  setUserInfo(name, job) {
    this._userNameElement.textContent = name
    this._userInfoElement.textContent = job
  }
}