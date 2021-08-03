export class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector
    this._submitButtonSelector = config.submitButtonSelector
    this._inactiveButtonClass = config.inactiveButtonClass
    this._inputErrorClass = config.inputErrorClass
    this._errorClass = config.errorClass
    this._form = form
  }

  _showInputError(inputElement) {
    const errorElement = document.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.add(this._inputErrorClass)
    errorElement.textContent = inputElement.validationMessage
    errorElement.classList.add(this._errorClass)
  }

  _hideInputError(inputElement) {
    const errorElement = document.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.remove(this._inputErrorClass)
    errorElement.textContent = ''
    errorElement.classList.remove(this._errorClass)
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement)
    } else {
      this._hideInputError(inputElement)
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  _toggleButtonState(inputList, buttonElement) {

    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__save-button_inactive')
      buttonElement.setAttribute('disabled', 'disabled')
    }
    else {
      buttonElement.classList.remove('popup__save-button_inactive')
      buttonElement.removeAttribute('disabled')
    }
  }

  _setEventListeners() {
    this._form = document.querySelector(this._form)
    const buttonElement = this._form.querySelector(this._submitButtonSelector)
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector))
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState(inputList, buttonElement, inputElement)
        this._checkInputValidity(inputElement)
      })
    })
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._form))
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (event) => {
        event.preventDefault()
      })
      this._setEventListeners()
    })
  }

}