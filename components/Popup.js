export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._closePopupButton = this._popup.querySelector('.popup__close-button')
  }

  open = () => {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)
  }

  close = () => {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.close()
    }
  }

  _handleClickClose = (event) => {
    if (event.target.classList.contains('popup')) {
      this.close()
    }
  }

  setEventListeners() {
    this._closePopupButton.addEventListener('click', this.close)
    this._popup.addEventListener('mousedown', this._handleClickClose)
  }
}