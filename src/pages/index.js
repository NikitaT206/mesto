import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from "../components/PopupWithForm.js"
import UserInfo from '../components/UserInfo.js';
import './index.css'

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

const validationConfig =
{
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const cards = document.querySelector('.places__list')
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')
const editProfileButton = document.querySelector('.profile__edit-button')
const popupEditProfile = document.querySelector('#editProfile')
const inputName = popupEditProfile.querySelector('#input_name')
const inputJob = popupEditProfile.querySelector('#input_job')
const addNewPlaceButton = document.querySelector('.profile__add-button')
const popupAddCard = document.querySelector('#newPlace')

addNewPlaceButton.addEventListener('click', function () {
  newPlacePopupValidation.toggleSubmitButton(popupAddCard)
  newPlacePopupValidation.hideErrors(popupAddCard)
  popupAdd.open()
})

editProfileButton.addEventListener('click', function () {
  const { name: name, job: job } = info.getUserInfo()
  inputName.value = name
  inputJob.value = job
  editPopupValidation.toggleSubmitButton(popupEditProfile)
  editPopupValidation.hideErrors(popupEditProfile)
  popupEdit.open()
})

const editPopupValidation = new FormValidator(validationConfig, '#editProfileForm')
const newPlacePopupValidation = new FormValidator(validationConfig, '#addNewPlaceForm')

newPlacePopupValidation.enableValidation()
editPopupValidation.enableValidation()

const createCard = (name, link) => {
  const card = new Card(
    name,
    link,
    '#placeTemplate',
    {
      handleCardClick: (name, link) => {
        const popupImage = new PopupWithImage(name, link, '#popupImage')

        popupImage.open()
      }
    })
  return card
}

const initialCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item.name, item.link)

    const cardElement = card.generateCard()

    initialCardList.addItem(cardElement)
  }
}, '.places__list')

initialCardList.renderItems()

const info = new UserInfo(profileName, profileJob)

const popupEdit = new PopupWithForm('#editProfile',
  {
    submit: (data) => {

      info.setUserInfo(data['input_name'], data['input_job'])

    }
  })

popupEdit.setEventListeners()

const popupAdd = new PopupWithForm('#newPlace',
  {
    submit: (data) => {
      const newCard = createCard(data['input_place-name'], data['input_place-link'])

      const cardElement = newCard.generateCard()

      cards.prepend(cardElement)
    }
  })

popupAdd.setEventListeners()
