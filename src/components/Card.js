export class Card {
  constructor(name, link, cardSelector, { handleCardClick }) {
    this._name = name
    this._link = link
    this._cardSelector = cardSelector
    this.handleCardClick = handleCardClick
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

  _setEventListeners() {
    this._element.querySelector('.place__like').addEventListener('click', () => {
      this._likeCard()
    })

    this._element.querySelector('.place__delete-button').addEventListener('click', () => {
      this._deleteCard()
    })

    this._element.querySelector('.place__image-container').addEventListener('click', () => {
      this.handleCardClick(this._name, this._link)
    })
  }

  generateCard() {
    this._element = this._getTemplate()
    this._setEventListeners()

    this._element.querySelector('.place__image').src = this._link
    this._element.querySelector('.place__image').alt = this._name
    this._element.querySelector('.place__name').textContent = this._name

    return this._element
  }
}