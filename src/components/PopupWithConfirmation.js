import Popup from "./Popup.js"

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, { submit }) {
    super(popupSelector)
    this._form = this._popup.querySelector('#deleteCardForm')
    this._submit = submit
    this._submitButton = this._popup.querySelector('.popup__save-button')
    this._initialButtonText = this._submitButton.textContent
  }

  renderLoading(loading) {
    if (loading) {
      this._submitButton.textContent = 'Удаление...'
    }
    else {
      this._submitButton.textContent = this._initialButtonText
    }
  }

  open(data) {
    super.open()
    this._data = data
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (event) => {
      event.preventDefault()
      this._submit(this._data)
    })
  }
}