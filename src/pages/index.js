import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from "../components/PopupWithForm.js"
import UserInfo from '../components/UserInfo.js'

import {
  initialCards,
  validationConfig,
  profileName,
  profileJob,
  editProfileButton,
  inputName,
  inputJob,
  addNewPlaceButton
} from '../utils/constants.js'

import './index.css'

addNewPlaceButton.addEventListener('click', function () {
  newPlacePopupValidation.resetValidation()
  popupAdd.open()
})

editProfileButton.addEventListener('click', function () {
  editPopupValidation.resetValidation()
  const { name: name, job: job } = info.getUserInfo()
  inputName.value = name
  inputJob.value = job
  popupEdit.open()
})

const editPopupValidation = new FormValidator(validationConfig, '#editProfileForm')
const newPlacePopupValidation = new FormValidator(validationConfig, '#addNewPlaceForm')

newPlacePopupValidation.enableValidation()
editPopupValidation.enableValidation()

const popupImage = new PopupWithImage('#popupImage')

popupImage.setEventListeners()

const createCard = (name, link) => {
  const card = new Card(
    name,
    link,
    '#placeTemplate',
    {
      handleCardClick: (name, link) => {
        popupImage.open(name, link)
      }
    })
  return card
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item.name, item.link)

    const cardElement = card.generateCard()

    cardList.addItem(cardElement)
  }
}, '.places__list')

cardList.renderItems()

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

      cardList.prependItem(cardElement)
    }
  })

popupAdd.setEventListeners()
