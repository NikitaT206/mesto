export class Card {
  constructor(name, link, cardSelector) {
    this._name = name
    this._link = link
    this._cardSelector = cardSelector
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.place')
      .cloneNode(true)
    return cardElement
  }

  _likeCard() {
    this._element.querySelector('.place__like').classList.toggle('place__like_active')
  }

  _deleteCard() {
    this._element.remove()
  }

  _openImagePopup() {
    const popupImage = document.querySelector('#popupImage')
    const popupBigImage = document.querySelector('.popup__image')
    const popupBigImageCaption = document.querySelector('.popup__caption')

    popupBigImage.src = this._element.querySelector('.place__image').src
    popupBigImage.alt = this._element.querySelector('.place__image').alt
    popupBigImageCaption.textContent = this._element.querySelector('.place__name').textContent

    popupImage.classList.add('popup_opened')
  }

  _setEventListeners() {
    this._element.querySelector('.place__like').addEventListener('click', () => {
      this._likeCard()
    })

    this._element.querySelector('.place__delete-button').addEventListener('click', () => {
      this._deleteCard()
    })

    this._element.querySelector('.place__image-container').addEventListener('click', () => {
      this._openImagePopup()
    })
  }

  generateCard() {
    this._element = this._getTemplate()
    this._setEventListeners()

    this._element.querySelector('.place__image').src = this._link
    this._element.querySelector('.place__name').alt = this._name
    this._element.querySelector('.place__name').textContent = this._name

    return this._element
  }
}