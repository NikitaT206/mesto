// показывает ошибки в инпутах 

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add('popup__input_type_error')
  errorElement.textContent = errorMessage
  errorElement.classList.add('popup__input-error_active')
};

// скрывает ошибки в инпутах

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove('popup__input_type_error')
  errorElement.classList.remove('popup__input-error_active')
  errorElement.textContent = ''
}

// проверяет валидацию формы и показывает ошибки

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement)
  }
}

// some проходит по массиву инпутов и возвращает true когда один из инпутов не валиден

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

// делает кнопку неактивной если hasInvalidInput вернул true

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save-button_inactive')
    buttonElement.setAttribute('disabled', 'disabled')
  }
  else {
    buttonElement.classList.remove('popup__save-button_inactive')
    buttonElement.removeAttribute('disabled', 'disabled')
  }
}


function setEventListeners(formElement, inputSelector, submitButtonSelector) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector))
  const buttonElement = formElement.querySelector(submitButtonSelector)
  toggleButtonState(inputList, buttonElement)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement)
      checkInputValidity(formElement, inputElement)
    })
  })
}


function enableValidation({ formSelector, ...config }) {
  const formList = Array.from(document.querySelectorAll(formSelector))
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault()
    })
    setEventListeners(formElement, config.inputSelector, config.submitButtonSelector)
  })
}

enableValidation(
  {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }
)