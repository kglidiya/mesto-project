const editButton = document.querySelector('.profile__editbtn');
const saveButton = document.querySelectorAll('.form__savebtn');
const closeButton = document.querySelectorAll('.popup__closebtn');
const addButton = document.querySelector('.profile__addbtn');
const popupProfile = document.querySelector('.popup');
const popupAddPlace = document.querySelector('.addplace-popup');
const photoPopup = document.querySelector('.photo-popup');


//Открытие попапа профиля
editButton.addEventListener('click', open);
function open() {
  popupProfile.classList.add('popup_opened');
};


//Открытие попапа добавления карточки
addButton.addEventListener('click', function () {
  popupAddPlace.classList.add('popup_opened');
});


//Кнопки закрытия всех попапов
closeButton.forEach(function (btn) {
  btn.addEventListener('click', function close() {
    popupProfile.classList.remove('popup_opened');
    popupAddPlace.classList.remove('popup_opened');
    photoPopup.classList.remove('photo-popup_opened');
  });
});

//Заполение формы профиля
const formElement = document.querySelector('.edit-profile');
function formSubmitHandler(evt) {
  evt.preventDefault();
  const userName = document.querySelector('.profile__title');
  const userProffesion = document.querySelector('.profile__subtitle');
  const nameInput = document.querySelector('.form__input_name');
  const jobInput = document.querySelector('.form__input_job');
  userName.textContent = nameInput.value;
  userProffesion.textContent = jobInput.value;

};
formElement.addEventListener('submit', formSubmitHandler);

//Заполение формы добавления карточки
const formPlace = document.querySelector('.edit-place');
function formSubmitHandler2(evt) {
  evt.preventDefault();
  const userPlace = document.querySelector('.places__title');
  const userLink = document.querySelector('.places__image');
  const placeInput = document.querySelector('.form__input_place');
  const linkInput = document.querySelector('.form__input_link');
  userPlace.textContent = placeInput.value;
  userLink.src = linkInput.value;
};
formPlace.addEventListener('submit', formSubmitHandler2);


//Закрытие попапов после заполнения форм
saveButton.forEach(function (btn) {
  btn.addEventListener('click', function () {
    popupProfile.classList.remove('popup_opened');
    popupAddPlace.classList.remove('popup_opened');
  });
})

//Клонирование template
const places = document.querySelector('.places');
const placesTemplate = document.querySelector('.places-new').content;

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


initialCards.forEach(function (element) {
  const placesElement = placesTemplate.cloneNode(true);

  placesElement.querySelector('.places__title').textContent = element.name;
  placesElement.querySelector('.places__image').src = element.link;

  placesElement.querySelector('.places__likebtn').addEventListener('click', function (btn) {
    btn.target.classList.toggle('places__likebtn_active');
  });

  placesElement.querySelector('.places__deletebtn').addEventListener('click', function (btn) {
    const place = btn.target.closest('.places__container');
    place.remove();
  })
  places.append(placesElement);
});



//Попап просмотра фото
const card = document.querySelectorAll('.places__container');
const photo = document.querySelectorAll('.places__image');

photo.forEach(function open(item) {
  item.addEventListener('click', function () {
    photoPopup.classList.add('photo-popup_opened');
    document.querySelector('.photo-popup__photolink').src = this.src;

    card.forEach(function show(elem) {
      elem.addEventListener('click', function () {
        document.querySelector('.photo-popup__caption').textContent = this.textContent;
      });
    });
  });
});



