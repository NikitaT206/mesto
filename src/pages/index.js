import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from "../components/PopupWithForm.js"
import UserInfo from '../components/UserInfo.js'
import PopupWithConfirmation from '../components/PopupWithConfirmation.js'
import { Api } from '../components/Api.js'

import {
  initialCards,
  validationConfig,
  profileName,
  profileJob,
  editProfileButton,
  inputName,
  inputJob,
  addNewPlaceButton,
  avatarButton,
  avatar
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

avatarButton.addEventListener('click', function () {
  avatarEditPopupValidation.resetValidation()
  popupAvatar.open()
})

const editPopupValidation = new FormValidator(validationConfig, '#editProfileForm')
const newPlacePopupValidation = new FormValidator(validationConfig, '#addNewPlaceForm')
const avatarEditPopupValidation = new FormValidator(validationConfig, '#newAvatarForm')

avatarEditPopupValidation.enableValidation()
newPlacePopupValidation.enableValidation()
editPopupValidation.enableValidation()

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-27/',
  headers: {
    authorization: '9226f8e1-b342-433e-90bd-aa64e2df547e',
    'Content-Type': 'application/json'
  }
})

let tempCard

const info = new UserInfo(profileName, profileJob, avatar)

api.getUserInfo().then(res => {
  profileJob.textContent = res.about
  profileName.textContent = res.name
  avatar.src = res.avatar
})

api.getInitialCard().then(res => {
  cardList.renderItems(res)
})

const cardList = new Section({
  renderer: (data) => {
    const card = createCard(data)

    const cardElement = card.generateCard()

    cardList.addItem(cardElement)
  }
}, '.places__list')


const createCard = (data) => {
  const card = new Card(
    data,
    '#placeTemplate',
    {
      handleCardClick: (data) => {
        popupImage.open(data.name, data.link)
      },
      like: (data) => {
        api.setLike(data).then((res) => {
          card.setLikeCount(res)
        })
      },
      dislike: (data) => {
        api.deleteLike(data).then((res) => {
          card.setLikeCount(res)
        })
      },
      handleDeleteCardClick: (data) => {
        tempCard = card
        deletePopup.open(data)
      }
    })

  return card
}

const popupEdit = new PopupWithForm('#editProfile',
  {
    submit: (data) => {
      popupEdit.renderLoading(true)
      api.setUserInfo(data)
        .then((res) => {
          info.setUserInfo(res)
        })
        .catch(err => console.log(err)
        )
        .finally(() => popupEdit.renderLoading(false))
    }
  })

popupEdit.setEventListeners()

const popupAdd = new PopupWithForm('#newPlace',
  {
    submit: (data) => {
      popupAdd.renderLoading(true)
      api.createCard(data)
        .then(res => {
          const card = createCard(res)
          const cardElement = card.generateCard()
          cardList.prependItem(cardElement)
        })
        .catch(err => console.log(err)
        )
        .finally(() => popupAdd.renderLoading(false))
    }
  })

popupAdd.setEventListeners()

const deletePopup = new PopupWithConfirmation('#deleteCard', {
  submit: (data) => {
    deletePopup.renderLoading(true)
    api.deleteCard(data)
      .then(() => {
        deletePopup.close()
      })
      .then(() => {
        tempCard.deleteCard()
      })
      .catch(err => console.log(err)
      )
      .finally(() => deletePopup.renderLoading(false))
  }
})

deletePopup.setEventListeners()

const popupAvatar = new PopupWithForm('#newAvatar', {
  submit: (data) => {
    popupAvatar.renderLoading(true)
    api.setAvatar(data)
      .then((res) => {
        info.setUserInfo(res)
      })
      .catch(err => console.log(err)
      )
      .finally(() => {
        popupAvatar.renderLoading(false)
      })
  }
})

popupAvatar.setEventListeners()

const popupImage = new PopupWithImage('#popupImage')

popupImage.setEventListeners()