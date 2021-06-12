let profileEditButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let popupCloseButton = document.querySelector('.popup__close-button')
let inputJob = document.querySelector('#inputJob')
let inputName = document.querySelector('#inputName')
let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__job')
let popupForm = document.querySelector('.popup__form')


function openPopup() {
  inputName.value = profileName.textContent
  inputJob.value = profileJob.textContent
  popup.classList.add('popup_opened')
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

function submitPopupForm(evt) {
  evt.preventDefault()
  profileName.textContent = inputName.value
  profileJob.textContent = inputJob.value
  closePopup()
}


profileEditButton.addEventListener('click', openPopup)
popupCloseButton.addEventListener('click', closePopup)
popupForm.addEventListener('submit', submitPopupForm)

