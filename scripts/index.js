/*
  Form:
*/

const formSelectors = {
  inputSelector: ".own-dish__input",
  submitButtonSelector: ".own-dish__button",
  inactiveButtonClass: "own-dish__button_disabled",
  inputErrorClass: "ownd-dish__input_error",
  errorClass: "own-dish__input-error_visible"
}

const hiddenFormClass = 'own-dish__form_hidden';
const hiddenMessageClass = 'own-dish__submit-message_hidden';

const messageElement = document.querySelector('.own-dish__submit-message');
const formElement = document.querySelector('.own-dish__form');
const resendButton = document.querySelector('.own-dish__button[type="button"]');

// this will reload the form after submission
resendButton.addEventListener('click', toggleForm);

// form submition will prompt a succes message
formElement.addEventListener('submit', function(e) {
  e.preventDefault();

  formValidation.resetValidation();
  e.target.reset();
  toggleForm();
});

// toggles between the form and the sumbit message
function toggleForm() {
  formElement.classList.toggle(hiddenFormClass);
  messageElement.classList.toggle(hiddenMessageClass);
}

// setting form validation
const formValidation = new Validation(formSelectors, formElement);
formElement.reset();
formValidation.enableValidation();

/*
  Welcome Gallery:
*/

const imageData = [
  {
    price: '35$',
    title: ['Salmon pie', 'From Aunt Betty' ,'Brescia, Italy']
  },
  {
    price: '52$',
    title: ['Borsch', 'From tetya Natasha', 'Siberia, Russia']
  },{
    price: '40$',
    title: ['Homemade pizza', 'From Grandpa Tony', 'Naples, Italy']
  }
];

const imageClass = 'welcome__image';
const imageAnimateInClass = 'welcome__image_animate-in';

const toggleClass = 'welcome__toggle-dot';
const activeToggleClass = 'welcome__toggle-dot_active';

const priceTagSelector = '.welcome__price-tag'

const imageTitleSelector = '.welcome__image-title'

const priceElement = document.querySelector(priceTagSelector);
const imageElements = document.querySelectorAll(`.${imageClass}`);
const titleElements = document.querySelectorAll(imageTitleSelector);
const toggleElements = document.querySelectorAll(`.${toggleClass}`);

let index = 0;
let intervalId = 0;

function switchTitle(title) {
  for(let i=0; i<3; i++)
    titleElements[i].textContent = title[i];
}

function setImage() {
  imageElements[index].classList.add(imageAnimateInClass);
  toggleElements[index].classList.add(activeToggleClass);
  priceElement.textContent = imageData[index].price;
  switchTitle(imageData[index].title);
}

function unsetImage() {
  imageElements[index].classList.remove(imageAnimateInClass);
  toggleElements[index].classList.remove(activeToggleClass);
}

function startRotate(initialIndex){
  unsetImage();
  index = parseInt(initialIndex);
  setImage();
  intervalId = setInterval(iterate, 7000);
}

function iterate() {
  unsetImage();
  index===2 ? index=0 : index++;
  setImage();
}

toggleElements.forEach(toggle => {
  toggle.addEventListener('click', function(e) {
    clearInterval(intervalId);
    startRotate(e.target.getAttribute('data-key'));
  });
});

startRotate(0);


/*
  Chefs Gallery:
*/

const cards = document.querySelectorAll('.chefs__card');

const rightButton = document.querySelector('.chefs__arrow_direction_right');
const leftButton = document.querySelector('.chefs__arrow_direction_left');

const cardWidth = 285;

const slider = new Slider(
  cards,
  {
    leftControler: leftButton,
    rightControler: rightButton
  },
  {
    elementWidth: cardWidth,
    initialPosition: 0,
    amountOfItems: 4
  });

slider.initialize();
