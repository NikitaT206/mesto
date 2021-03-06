export class Card {
  constructor(data, cardSelector, userId, { handleCardClick, handleDeleteCardClick, like, dislike }) {
    this._data = data
    this._cardSelector = cardSelector
    this._userId = userId
    this.handleCardClick = handleCardClick
    this.handleDeleteCardClick = handleDeleteCardClick
    this.like = like
    this.dislike = dislike
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.place')
      .cloneNode(true)
    return cardElement
  }

  likeCard() {
    this._likeButton.classList.add('place__like_active')
  }

  dislikeCard() {
    this._likeButton.classList.remove('place__like_active')
  }

  _setLike(data) {
    this.like(data)
  }

  _deleteLike(data) {
    this.dislike(data)
  }

  deleteCard() {
    this._element.remove()
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      if (!this._likeButton.classList.contains('place__like_active')) {
        this._setLike(this._data)
      }
      else {
        this._deleteLike(this._data)
      }
    })

    this._deleteButton.addEventListener('click',
      () => {
        this.handleDeleteCardClick(this._data)
      }
    )

    this._element.querySelector('.place__image-container').addEventListener('click', () => {
      this.handleCardClick(this._data)
    })
  }

  setLikeCount(data) {
    this._likeCounter.textContent = data.likes.length
  }

  _checkLikes() {
    this._data.likes.forEach((like) => {
      if (like._id === this._userId) { //надо как-то засунуть сюда Id
        this.likeCard();
      }
    })
  }

  _checkMyCards() {
    if (this._data.owner._id !== this._userId) {
      this._deleteButton.remove()
    }
  }

  generateCard() {
    this._element = this._getTemplate()
    this._likeCounter = this._element.querySelector('.place__like-counter')
    this._likeButton = this._element.querySelector('.place__like')
    this._deleteButton = this._element.querySelector('.place__delete-button')
    this._element.querySelector('.place__image').src = this._data.link
    this._element.querySelector('.place__image').alt = this._data.name
    this._element.querySelector('.place__name').textContent = this._data.name
    this.setLikeCount(this._data)
    this._checkLikes()
    this._checkMyCards()
    this._setEventListeners()
    return this._element
  }
}