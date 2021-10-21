// for media queries
const viewport = window.innerWidth;

/*
  Header mobile-menu:
*/

if(viewport < 457){
  const menuVisibleClass = 'mobile-menu_visible';

  const mobileMenuButton = document.querySelector('.header__burger');
  const menuElement = document.querySelector('.mobile-menu');
  const linkElements = document.querySelectorAll('.mobile-menu__link');

  mobileMenuButton.addEventListener('click', function(){
    menuElement.classList.toggle(menuVisibleClass);
  });

  linkElements.forEach(link => link.addEventListener('click', () => {
    menuElement.classList.remove(menuVisibleClass);
  }));

}

/*
  Menu:
*/

const showButton = document.querySelector(".menu__button");
const dishesElement = document.querySelector(".dishes")

showButton.addEventListener("click", hideOrShow);

function hideOrShow(e) {
  dishesElement.classList.add("dishes_open")

  showButton.remove();
}

/*
  Form:
*/

const formSelectors = {
  inputSelector: ".own-dish__input",
  submitButtonSelector: ".own-dish__button",
  inactiveButtonClass: "own-dish__button_disabled",
  inputErrorClass: "ownd-dish__input_error",
  errorClass: "own-dish__input-error_visible",
};

const hiddenFormClass = "own-dish__form_hidden";
const hiddenMessageClass = "own-dish__submit-message_hidden";

const messageElement = document.querySelector(".own-dish__submit-message");
const formElement = document.querySelector(".own-dish__form");
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
    price: "35$",
    title: ["Salmon pie", "From Aunt Betty", "Brescia, Italy"],
  },
  {
    price: '52$',
    title: ['Borsch', 'From tetya Natasha', 'Siberia, Russia']
  },{
    price: '40$',
    title: ['Homemade pizza', 'From Grandpa Tony', 'Naples, Italy']
  }
];

const imageAnimateInClass = 'welcome__image_animate-in';
const activeToggleClass = 'welcome__toggle-dot_active';

const priceElement = document.querySelector('.welcome__price-tag');
const imageElements = document.querySelectorAll('.welcome__image');
const titleElements = document.querySelectorAll('.welcome__image-title');
const toggleElements = document.querySelectorAll('.welcome__toggle-dot');

// index of image showing
let index = 0;

// time interval (ms)
const duration = 7000;

// to be able to remove setInterval
let intervalId = undefined;

function switchTitle(title) {
  for (let i = 0; i < 3; i++) titleElements[i].textContent = title[i];
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

function startRotate(initialIndex) {
  unsetImage();
  index = parseInt(initialIndex);
  setImage();
  intervalId = setInterval(iterate, duration);
}

function iterate() {
  unsetImage();
  index === 2 ? (index = 0) : index++;
  setImage();
}

// @media screen and (min-width: 457px)
if(viewport > 457){
  // restart the rotation from selected image
  toggleElements.forEach(toggle => {
    toggle.addEventListener("click", function (e) {
      clearInterval(intervalId);
      startRotate(e.target.getAttribute("data-key"));
    });
  });
}

// initialize rotation
startRotate(0);

/*
  Chefs Gallery:
*/

const cards = document.querySelectorAll(".chefs__card");

const rightButton = document.querySelector(".chefs__arrow_direction_right");
const leftButton = document.querySelector(".chefs__arrow_direction_left");

const views = {
  'min-width-1280px': {
    cardWidth: 285,
    groupSize: 4
  },
  'max-width-1280px': {
    cardWidth: 285,
    groupSize: 3
  },
  'max-width-1000px': {
    cardWidth: 265,
    groupSize: 3
  },
  'max-width-890px': {
    cardWidth: 285,
    groupSize: 2
  },
  'max-width-640px': {
    cardWidth: 265,
    groupSize: 2
  },
  'max-width-600px': undefined
};

const slider = initializeSliderView(viewport);
slider.initialize();

window.onresize = function(){
  const windowWidth = window.innerWidth;

  if(windowWidth <= 600)
    {
      slider.stop();
      return;
    }

  const {cardWidth, groupSize} = getViewParams(windowWidth);
  slider.setNewParams({ elementWidth: cardWidth, amountOfItems: groupSize });
}

function initializeSliderView(viewWidth){
  const {cardWidth, groupSize} = getViewParams(viewWidth);

  return generateSlider(cardWidth, groupSize);
}

function getViewParams(viewWidth){
  if(1280 < viewWidth)
    return views['min-width-1280px'];
  else if(1280 >= viewWidth && viewWidth > 1000)
    return views['max-width-1280px'];
  else if(1000 >= viewWidth && viewWidth > 890)
    return views['max-width-1000px'];
  else if(890 >= viewWidth && viewWidth > 640)
    return views['max-width-890px'];
  else if(640 >= viewWidth && viewWidth > 600)
    return views['max-width-640px'];
  else
    return {
      cardWidth: undefined,
      groupSize: undefined
    };
}

function generateSlider(cardWidth, groupSize) {
  return new Slider(
    cards,
    {
      leftControler: leftButton,
      rightControler: rightButton
    },
    {
      elementWidth: cardWidth,
      initialPosition: 0,
      amountOfItems: groupSize
    });
}