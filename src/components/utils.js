export const popups = document.querySelectorAll('.popup');
export const imagePopup = document.querySelector('.image-popup');
export const profilePopup = document.querySelector('.profile-popup');
export const cardPopup = document.querySelector('.card-popup');
export const buttonEdit = document.querySelector('.profile__editbtn');
export const buttonsSave = document.querySelectorAll('.form__savebtn');
export const buttonsClose = document.querySelectorAll('.popup__closebtn');
export const buttonAdd = document.querySelector('.profile__addbtn');
export const formSelectorProfile = document.querySelector('.edit-profile');
export const formSelectorPlace = document.querySelector('.edit-place');
export const linkInput = document.querySelector('.form__input_link');
export const nameInput = document.querySelector('.form__input_name');
export const jobInput = document.querySelector('.form__input_job');
export const placeInput = document.querySelector('.form__input_place');
export const userName = document.querySelector('.profile__title');
export const userProffesion = document.querySelector('.profile__subtitle');
export const cardsContainer = document.querySelector('.places');
export const cardsTemplate = document.querySelector('.places-new').content;
export const popupLink = document.querySelector('.image-popup__photolink');
export const popupCaption = document.querySelector('.image-popup__caption');

export function disableButtonSubmit(buttons) {
    buttons.forEach(function(btn) {
        btn.disabled = true;
        btn.classList.add('form__savebtn_inactive');
    })
}