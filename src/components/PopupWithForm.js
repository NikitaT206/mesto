import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submit }) {
    super(popupSelector)
    this._form = this._popup.querySelector('.popup__form')
    this._submitButton = this._popup.querySelector('.popup__save-button')
    this._initialButtonText = this._submitButton.textContent
    this._submit = submit
  }

  renderLoading(loading) {
    if (loading) {
      this._submitButton.textContent = 'Сохранение...'
    }
    else {
      this._submitButton.textContent = this._initialButtonText
    }
  }

  _getInputValues = () => {
    const inputList = Array.from(this._form.querySelectorAll('.popup__input'))
    const data = {}
    inputList.forEach((input) => {
      data[input.name] = input.value
    })
    return data
  }

  close = () => {
    super.close()
    this._form.reset()
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submit(this._getInputValues())
      this.close()
    });

  }
}