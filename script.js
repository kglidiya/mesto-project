const imagePopup = document.querySelector('.image-popup');
const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
const buttonEdit = document.querySelector('.profile__editbtn');
const buttonsSave = document.querySelectorAll('.form__savebtn');
const buttonsClose = document.querySelectorAll('.popup__closebtn');
const buttonAdd = document.querySelector('.profile__addbtn');
const formElementProfile = document.querySelector('.edit-profile');
const formElementPlace = document.querySelector('.edit-place');
const linkInput = document.querySelector('.form__input_link');
const nameInput = document.querySelector('.form__input_name');
const jobInput = document.querySelector('.form__input_job');
const placeInput = document.querySelector('.form__input_place');
const userName = document.querySelector('.profile__title');
const userProffesion = document.querySelector('.profile__subtitle');
const cardsContainer = document.querySelector('.places');
const cardsTemplate = document.querySelector('.places-new').content;
const popupLink = document.querySelector('.image-popup__photolink');
const popupCaption = document.querySelector('.image-popup__caption');

//Открытие попапов

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

buttonEdit.addEventListener('click', function () {
  nameInput.value = userName.textContent;
  jobInput.value = userProffesion.textContent;
  openPopup(profilePopup)
});

buttonAdd.addEventListener('click', () => openPopup(cardPopup));

//Попап с фото открывается отдельно, т.к. там идет привязка к ссылке на фото 


//Закрытие всех попапов

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

buttonsClose.forEach(function (btn) {
  btn.addEventListener('click', function (event) {
    closePopup(event.target.closest('.popup'))
  })
})


//Заполение формы профиля

function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userProffesion.textContent = jobInput.value;
  closePopup(profilePopup);
};
formElementProfile.addEventListener('submit', formSubmitHandler);gi

//Клонирование template

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Создание карточки

function creatCard(caption, image) {
  const placesElement = cardsTemplate.cloneNode(true);
  placesElement.querySelector('.places__title').textContent = caption;
  placesElement.querySelector('.places__image').src = image;
  const cardOpen = placesElement.querySelector('.places__image');
  cardOpen.alt = caption;

  //Добавление кнопок лайка и удаления карточки
  placesElement.querySelector('.places__likebtn').addEventListener('click', function (btn) {
    btn.target.classList.toggle('places__likebtn_active');
  });

  placesElement.querySelector('.places__deletebtn').addEventListener('click', function (btn) {
    const placeContainer = btn.target.closest('.places__container');
    placeContainer.remove();
  });

  //Открытие попапа с карточкой

  cardOpen.addEventListener('click', function openCard() {
    openPopup(imagePopup);
    popupLink.src = this.src;
    popupLink.alt = caption;
    popupCaption.textContent = caption;

  });

  return placesElement;
};


//Добавление карточки из массива

initialCards.forEach(function (item) {
  const card = creatCard(item.name, item.link);
  cardsContainer.append(card);
});

//Добавление карточки из формы

function renderCard(evt) {
  evt.preventDefault();
  cardsContainer.prepend(creatCard(placeInput.value, linkInput.value));
  closePopup(cardPopup);
  placeInput.value = '';
  linkInput.value = '';
};

formElementPlace.addEventListener('submit', renderCard);
