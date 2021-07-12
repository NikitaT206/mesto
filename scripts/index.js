const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];

const cards = document.querySelector('.places__list')
const cardTemplate = document.querySelector('#placeTemplate').content

// элементы профиля

const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')

// элементы редактирования профиля

const editProfileButton = document.querySelector('.profile__edit-button')
const popupEditProfile = document.querySelector('#editProfile')
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form')
const inputName = popupEditProfile.querySelector('#input_name')
const inputJob = popupEditProfile.querySelector('#input_job')

// элементы добавления новой карточки

const addNewPlaceButton = document.querySelector('.profile__add-button')
const popupAddCard = document.querySelector('#newPlace')
const addNewCardForm = document.querySelector('#addNewPlaceForm')
const inputNewCardName = document.querySelector('#input_place-name')
const inputNewCardLink = document.querySelector('#input_place-link')

// элементы попапа с картинками

const popupImage = document.querySelector('#popupImage')
const popupBigImage = document.querySelector('.popup__image')
const popupBigImageCaption = document.querySelector('.popup__caption')

const closePopupButtons = document.querySelectorAll('.popup__close-button')
const popups = document.querySelectorAll('.popup')

// слушатели событий

addNewPlaceButton.addEventListener('click', function () {
  addNewPlaceForm.reset()
  openPopup(popupAddCard)
})

addNewCardForm.addEventListener('submit', createNewCard)

editProfileButton.addEventListener('click', function () {
  inputName.value = profileName.textContent
  inputJob.value = profileJob.textContent
  openPopup(popupEditProfile)
})

popupEditProfileForm.addEventListener('submit', function (event) {
  event.preventDefault()
  profileName.textContent = inputName.value
  profileJob.textContent = inputJob.value
  closePopup(popupEditProfile)
})

closePopupButtons.forEach(btn => btn.addEventListener('click', function () {
  const popup = btn.closest('.popup')
  closePopup(popup)
}))

popups.forEach(cover => {
  cover.addEventListener('mousedown', function (event) {
    closePopup(event.target)
  })
})

// функция создания карточки

function createCard(name, link) {

  const card = cardTemplate.querySelector('.place').cloneNode(true)
  const placeImage = card.querySelector('.place__image')
  const placeName = card.querySelector('.place__name')

  placeImage.src = link
  placeImage.alt = name
  placeName.textContent = name

  const cardLike = card.querySelector('.place__like')

  cardLike.addEventListener('click', (event) => {
    cardLike.classList.toggle('place__like_active')
  })

  card.querySelector('.place__delete-button').addEventListener('click', () => {
    card.remove()
  })

  card.querySelector('.place__image-container').addEventListener('click', (event) => {
    popupBigImage.src = placeImage.src
    popupBigImage.alt = placeImage.alt
    popupBigImageCaption.textContent = placeName.textContent

    openPopup(popupImage)
  })

  return card
}

// функция добавления начальных карточек на страницу

function renderInitialCards() {
  initialCards.forEach(card => {
    cards.append(createCard(card.name, card.link))
  })
}

renderInitialCards()

// функция добавления новой карточки

function createNewCard(event) {
  event.preventDefault()
  cards.prepend(createCard(inputNewCardName.value, inputNewCardLink.value))
  closePopup(popupAddCard)
}

// функция открытия попапа

function openPopup(popup) {
  popup.classList.add('popup_opened')
  hidePopupError(popup)
  toggleSubmitButton(popup)
  document.addEventListener('keydown', closePopupEscapeButton)
}

// если value у инпута пустой делает кнопку не активной

function toggleSubmitButton(popup) {
  const popupInputs = popup.querySelectorAll('.popup__input')
  const popupSubmitButton = popup.querySelector('.popup__save-button')

  popupInputs.forEach((input) => {
    if (!input.value) {
      popupSubmitButton.classList.add('popup__save-button_inactive')
      popupSubmitButton.setAttribute('disabled', 'disabled')
    }
    else {
      popupSubmitButton.classList.remove('popup__save-button_inactive')
      popupSubmitButton.removeAttribute('disabled', 'disabled')
    }
  })
}

// если у попапа есть инпуты скрывает ошибки валидации

function hidePopupError(popup) {
  const popupInput = popup.querySelector('.popup__input')

  if (popup.contains(popupInput)) {
    const popupInputs = popup.querySelectorAll('.popup__input')
    const popupInputErrors = popup.querySelectorAll('.popup__input-error')

    popupInputs.forEach((input) => {
      input.classList.remove('popup__input_type_error')
    })
    popupInputErrors.forEach((error) => {
      error.classList.remove('popup__input-error_active')
    })
  }
}

// функция закрытия попапа

function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupEscapeButton)
}

// закрытие попапа на клавишу Escape

function closePopupEscapeButton(event) {
  if (event.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened')
    closePopup(popupActive)
  }
}
