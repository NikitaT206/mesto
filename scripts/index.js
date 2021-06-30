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


addNewPlaceButton.addEventListener('click', function () {
  openPopup(popupAddCard)
})

editProfileButton.addEventListener('click', function () {
  openPopup(popupEditProfile)
})

addNewCardForm.addEventListener('submit', createNewCard)

closePopupButtons.forEach(btn => btn.addEventListener('click', function () {
  closePopup(popupAddCard)
  closePopup(popupEditProfile)
  closePopup(popupImage)
}))

popupEditProfileForm.addEventListener('submit', function (event) {
  event.preventDefault()
  profileName.textContent = inputName.value
  profileJob.textContent = inputJob.value
  closePopup(popupEditProfile)
})

// функция 

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

  card.querySelector('.place__delete-button').addEventListener('click', (event) => {
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

function addCard() {
  initialCards.forEach(card => {
    cards.append(createCard(card.name, card.link))
  })
}

addCard()

function createNewCard(event) {
  event.preventDefault()
  cards.append(createCard(inputNewCardName.value, inputNewCardLink.value))
  closePopup(popupAddCard)
  addNewPlaceForm.reset()
}

function openPopup(popup) {
  popup.classList.add('popup_opened')
  inputName.value = profileName.textContent
  inputJob.value = profileJob.textContent
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
  addNewPlaceForm.reset()
}












