const popup = document.querySelector('.popup')
const popupOpenButton = document.querySelector('.button_type_edit')
const popupCloseButton = popup.querySelector('.button_type_close')
const inputContainer = document.querySelector('.popup__input-container')
const popupSaveButton = popup.querySelector('.button_type_save')


const popupToggle = (event) => {
    popup.classList.toggle('popup_is-opened')
}

const popupCloseByClickOnOverlay = (event) => {
    if (event.target !== event.currentTarget) {
        return
    }
    popupToggle(event)
}

const nameInput = inputContainer.querySelector('.js-input-name')
const jobInput = inputContainer.querySelector('.js-input-metier')

const name = document.querySelector('.profile__name')
const job = document.querySelector('.profile__metier')

let nameValue = name.textContent
let jobValue = job.textContent

nameInput.value = nameValue
jobInput.value = jobValue


const formSubmitHandler = (evt) => {
    evt.preventDefault();

    nameValue = nameInput.value
    jobValue = jobInput.value

    name.textContent = nameValue
    job.textContent = jobValue
    popupToggle()
}
inputContainer.addEventListener('submit', formSubmitHandler)



popupOpenButton.addEventListener('click', popupToggle, false)
popupCloseButton.addEventListener('click', popupToggle, false)
popup.addEventListener('click', popupCloseByClickOnOverlay)
popupSaveButton.addEventListener('click', formSubmitHandler)