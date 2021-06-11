let profileEditButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let popupCloseButton = document.querySelector('.popup__close-button')
let inputJob = document.querySelector('.input-job')
let inputName = document.querySelector('.input-name')
let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__job')
let popupForm = document.querySelector('.popup__form')

inputName.value = profileName.textContent
inputJob.value = profileJob.textContent


function formSubmitHandler(evt) {
  evt.preventDefault()

  if (!inputName.value || !inputJob.value) {
    console.log('Оба поля должны быть заполнены')
  }
  else {
    profileName.textContent = inputName.value
    profileJob.textContent = inputJob.value
    popup.classList.remove('popup_opened')
  }
}

popupForm.addEventListener('submit', formSubmitHandler)

profileEditButton.addEventListener('click', function () {
  popup.classList.add('popup_opened')
})

popupCloseButton.addEventListener('click', function () {
  inputName.value = profileName.textContent
  inputJob.value = profileJob.textContent
  popup.classList.remove('popup_opened')
})
