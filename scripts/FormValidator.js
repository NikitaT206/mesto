const obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

class FormValidator {
  constructor(data, form) {
    this.form = form
    // this.formSelector = data.formSelector
    // this.inputSelector = data.inputSelector
    // this.submitButtonSelector = data.submitButtonSelector
    // this.inactiveButtonClass = data.inactiveButtonClass
    // this.inputErrorClass = data.inputErrorClass
    // this.errorClass = data.errorClass
  }

  showInputError() {
    const errorElement = formElement.querySelector(`#${inputSelector.id}-error`)
    this.obj.inputElement.classList.add('popup__input_type_error')
    errorElement.textContent = errorMessage
    errorElement.classList.add('popup__input-error_active')
  }

  hideInputError() {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.remove('popup__input_type_error')
    errorElement.classList.remove('popup__input-error_active')
    errorElement.textContent = ''
  }

  checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage)
    } else {
      hideInputError(formElement, inputElement)
    }
  }

  hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__save-button_inactive')
      buttonElement.setAttribute('disabled', 'disabled')
    }
    else {
      buttonElement.classList.remove('popup__save-button_inactive')
      buttonElement.removeAttribute('disabled', 'disabled')
    }
  }

  setEventListeners(formElement, inputSelector, submitButtonSelector) {
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

  enableValidation({ formSelector, ...config }) {
    const formList = Array.from(document.querySelectorAll(formSelector))
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (event) => {
        event.preventDefault()
      })
      setEventListeners(formElement, config.inputSelector, config.submitButtonSelector)
    })
  }
}