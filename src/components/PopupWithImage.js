import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(name, link, popupSelector) {
    super(popupSelector)
    this._popupImage = this._popup.querySelector('.popup__image')
    this._popupImageCaption = this._popup.querySelector('.popup__caption')
    this._name = name
    this._link = link
  }

  open = () => {
    this.setEventListeners()
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)
    this._popupImage.src = this._link
    this._popupImage.alt = this._name
    this._popupImageCaption.textContent = this._name
  }
}