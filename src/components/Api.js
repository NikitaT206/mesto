export class Api {
  constructor(options) {
    this._url = options.url
    this._headers = options.headers
  }

  _returnRes(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo() {
    return fetch(this._url + 'users/me', {
      headers: this._headers
    })
      .then(this._returnRes)
  }

  getInitialCard() {
    return fetch(this._url + 'cards', {
      headers: this._headers
    })
      .then(this._returnRes)
  }

  setUserInfo(data) {
    return fetch(this._url + 'users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data['input_name'],
        about: data['input_job']
      })
    })
      .then(this._returnRes)
  }

  createCard(data) {
    return fetch(this._url + 'cards', {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: data['input_place-name'],
        link: data['input_place-link']
      })
    })
      .then(this._returnRes)
  }

  deleteCard(data) {
    return fetch(this._url + `cards/${data._id}`, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(this._returnRes)
  }

  setLike(data) {
    return fetch(this._url + `cards/likes/${data._id}`, {
      headers: this._headers,
      method: 'PUT',
    })
      .then(this._returnRes)
  }

  deleteLike(data) {
    return fetch(this._url + `cards/likes/${data._id}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(this._returnRes)
  }

  setAvatar(data) {
    return fetch(this._url + `users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data['input_avatar-link']
      })
    }
    )
      .then(this._returnRes)
  }

  getInitialData() {
    return Promise.all([this.getUserInfo(), this.getInitialCard()])
  }
}
