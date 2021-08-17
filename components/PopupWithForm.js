import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submit }) {
    super(popupSelector)
    this._form = this._popup.querySelector('.popup__form');
    this._submit = submit;
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
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose)
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