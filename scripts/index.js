const data = [
  {
    price: '35$',
    title: ['Salmon pie.', 'From Aunt Betty.' ,'Brescia, Italy.']
  },
  {
    price: '52$',
    title: ['Borsch', 'From tetya Natasha', 'Siberia, Russia']
  },{
    price: '40$',
    title: ['Homemade pizza', 'From Grandpa Tony', 'Naples, Italy']
  }
]
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
  priceElement.textContent = data[index].price;
  switchTitle(data[index].title);
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
