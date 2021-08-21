export class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector
    this._submitButtonSelector = config.submitButtonSelector
    this._inactiveButtonClass = config.inactiveButtonClass
    this._inputErrorClass = config.inputErrorClass
    this._errorClass = config.errorClass
    this._form = document.querySelector(form)
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.add(this._inputErrorClass)
    errorElement.textContent = inputElement.validationMessage
    errorElement.classList.add(this._errorClass)
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`)
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

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass)
      this._buttonElement.setAttribute('disabled', 'disabled')
    }
    else {
      this._buttonElement.classList.remove(this._inactiveButtonClass)
      this._buttonElement.removeAttribute('disabled')
    }
  }

  _setEventListeners() {
    this._buttonElement = this._form.querySelector(this._submitButtonSelector)
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector))
    this._toggleButtonState()
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState()
        this._checkInputValidity(inputElement)
      })
    })
  }

  enableValidation() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault()
    })
    this._setEventListeners()
  }

  resetValidation() {
    this._toggleButtonState()
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
  }
}