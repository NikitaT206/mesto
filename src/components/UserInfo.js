import { avatar } from "../utils/constants"

export default class UserInfo {
  constructor(userNameElement, userInfoElement, userAvatarElement) {
    this._userNameElement = userNameElement
    this._userInfoElement = userInfoElement
    this._userAvatarElement = userAvatarElement
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      job: this._userInfoElement.textContent
    }
  }

  setUserInfo(data) {
    this._userNameElement.textContent = data.name
    this._userInfoElement.textContent = data.about
    this._userAvatarElement.src = data.avatar
  }
}