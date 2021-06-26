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
  }
];



const ul = document.querySelector('.places__list')
const editProfileButton = document.querySelector('.profile__edit-button')
const addNewPlaceButton = document.querySelector('.profile__add-button')
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')
const cardTemplate = document.querySelector('#placeTemplate').content

const inputNewCardName = document.querySelector('#input_place-name')
const inputNewCardLink = document.querySelector('#input_place-link')

const popupImage = document.querySelector('.popup__image')
const popupCaption = document.querySelector('.popup__caption')


addNewPlaceButton.addEventListener('click', openAddNewPlacePopup)
editProfileButton.addEventListener('click', openEditProfilePopup)
document.querySelector('#newPlaceForm').addEventListener('submit', createNewCard)

function createInitialCard(name, link) {

  const card = cardTemplate.querySelector('.place').cloneNode(true)

  card.querySelector('.place__image').src = link
  card.querySelector('.place__image').alt = name
  card.querySelector('.place__name').textContent = name

  card.querySelector('.place__like').addEventListener('click', function (event) {
    card.querySelector('.place__like').classList.toggle('place__like_active')
  })

  card.querySelector('.place__delete-button').addEventListener('click', function (event) {
    card.remove()
  })

  card.querySelector('.place__image-container').addEventListener('click', function (event) {

    const popupImage = document.querySelector('#image')

    closePopup()

    popupImage.querySelector('.popup__image').src = card.querySelector('.place__image').src
    popupImage.querySelector('.popup__image').alt = card.querySelector('.place__image').alt
    popupImage.querySelector('.popup__caption').textContent = card.querySelector('.place__name').textContent

    popupImage.classList.add('popup_opened')
  })

  ul.append(card)
}

initialCards.map(card => createInitialCard(card.name, card.link))

function createNewCard(event) {
  event.preventDefault()
  createInitialCard(inputNewCardName.value, inputNewCardLink.value)
  event.target.closest('.popup').classList.remove('popup_opened')
  document.querySelector('#newPlaceForm').reset()
}


function openEditProfilePopup() {
  const popupEditProfile = document.querySelector('#editProfile')

  popupEditProfile.querySelector('#input_name').value = profileName.textContent
  popupEditProfile.querySelector('#input_job').value = profileJob.textContent

  closePopup()

  popupEditProfile.querySelector('.popup__form').addEventListener('submit', function (event) {
    event.preventDefault()
    profileName.textContent = popupEditProfile.querySelector('#input_name').value
    profileJob.textContent = popupEditProfile.querySelector('#input_job').value
    popupEditProfile.classList.remove('popup_opened')
  })

  popupEditProfile.classList.add('popup_opened')
}

function closePopup() {
  const closePopupButton = document.querySelectorAll('.popup__close-button')
  closePopupButton.forEach(btn => btn.addEventListener('click', function () {
    btn.closest('.popup').classList.remove('popup_opened')
  }))
}

function openAddNewPlacePopup() {
  const addNewPlacePopup = document.querySelector('#newPlace')

  closePopup()

  addNewPlacePopup.classList.add('popup_opened')
}







