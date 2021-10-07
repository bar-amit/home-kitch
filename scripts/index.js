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

const showButton = document.querySelector(".menu__button");
const hiddenItems = document.querySelectorAll(".dish__item_hidden");

resendButton.addEventListener("click", toggleForm);

formElement.addEventListener("submit", function (e) {
  e.preventDefault();

  formValidation.resetValidation();
  e.target.reset();
  toggleForm();
});

showButton.addEventListener("click", hideOrShow);

function hideOrShow(e) {
  hiddenItems.forEach(item => {
    item.classList.remove("dish__item_hidden");
  });
  showButton.remove();
}

function toggleForm() {
  formElement.classList.toggle(hiddenFormClass);
  messageElement.classList.toggle(hiddenMessageClass);
}

const formValidation = new Validation(formSelectors, formElement);
formElement.reset();
formValidation.enableValidation();

/*
  Welcome Gallery:
*/

const data = [
  {
    price: "35$",
    title: ["Salmon pie", "From Aunt Betty", "Brescia, Italy"],
  },
  {
    price: "52$",
    title: ["Borsch", "From tetya Natasha", "Siberia, Russia"],
  },
  {
    price: "40$",
    title: ["Homemade pizza", "From Grandpa Tony", "Naples, Italy"],
  },
];
const imageClass = "welcome__image";
const imageAnimateInClass = "welcome__image_animate-in";

const toggleClass = "welcome__toggle-dot";
const activeToggleClass = "welcome__toggle-dot_active";

const priceTagSelector = ".welcome__price-tag";

const imageTitleSelector = ".welcome__image-title";

const priceElement = document.querySelector(priceTagSelector);
const imageElements = document.querySelectorAll(`.${imageClass}`);
const titleElements = document.querySelectorAll(imageTitleSelector);
const toggleElements = document.querySelectorAll(`.${toggleClass}`);

let index = 0;
let intervalId = 0;

function switchTitle(title) {
  for (let i = 0; i < 3; i++) titleElements[i].textContent = title[i];
}

function setImage() {
  imageElements[index].classList.add(imageAnimateInClass);
  toggleElements[index].classList.add(activeToggleClass);
  priceElement.textContent = data[index].price;
  switchTitle(data[index].title);
}

function unsetImage() {
  imageElements[index].classList.remove(imageAnimateInClass);
  toggleElements[index].classList.remove(activeToggleClass);
}

function startRotate(initialIndex) {
  unsetImage();
  index = parseInt(initialIndex);
  setImage();
  intervalId = setInterval(iterate, 7000);
}

function iterate() {
  unsetImage();
  index === 2 ? (index = 0) : index++;
  setImage();
}

toggleElements.forEach(toggle => {
  toggle.addEventListener("click", function (e) {
    clearInterval(intervalId);
    startRotate(e.target.getAttribute("data-key"));
  });
});

startRotate(0);

/*
  Chefs Gallery:
*/

const cards = document.querySelectorAll(".chefs__card");

const rightButton = document.querySelector(".chefs__arrow_direction_right");
const leftButton = document.querySelector(".chefs__arrow_direction_left");

const offset = 285;

let position = 0;

function setArrows() {
  if (position === 0) {
    removeArrowEvent(leftButton, handleLeftArrow);
    rightButton.style.visibility = "visible";
    leftButton.style.visibility = "hidden";
  } else if (position === 2) {
    removeArrowEvent(rightButton, handleRightArrow);
    rightButton.style.visibility = "hidden";
    leftButton.style.visibility = "visible";
  } else {
    removeArrowEvent(leftButton, handleLeftArrow);
    removeArrowEvent(rightButton, handleRightArrow);
    setArrowEvent(leftButton, handleLeftArrow);
    setArrowEvent(rightButton, handleRightArrow);
    rightButton.style.visibility = 'visible';
    leftButton.style.visibility = 'visible';
  }
}

function move(direction) {
  if (direction === "right") {
    position = position > 1 ? 2 : position + 1;
  } else if (direction === "left") {
    position = position < 1 ? 0 : position - 1;
  }
  setPosition();
  setArrows();
}

function setPosition() {
  cards.forEach(card => (card.style.left = `-${position * offset}px`));
}

function handleRightArrow() {
  move("right");
}

function handleLeftArrow() {
  move("left");
}

function setArrowEvent(arrow, handle) {
  arrow.addEventListener("click", handle);
}

function removeArrowEvent(arrow, handle) {
  arrow.addEventListener("click", handle);
}

setPosition();
setArrows();
setArrowEvent(rightButton, handleRightArrow);
