class Slider {
  constructor(elements, { leftControler, rightControler }, { elementWidth, initialPosition, amountOfItems }) {
    this._elements = elements;
    this._left = leftControler;
    this._right = rightControler;
    this._step = elementWidth;
    this._position = initialPosition;
    this._groupSize = amountOfItems;
  }
  initialize = () => {
    this._setEventListeners();
    this._move();
    // if: leftmost position
    if(this._position === 0){
      this._hideController(this._left);
    }
    // if: rightmost position
    else if(this._position + this._groupSize === this._elements.length){
      this._hideController(this._right);
    }
  }
  _move = () => {
    this._elements.forEach(elm => elm.style.left = `-${this._position * this._step}px`)
  }
  _showController(controller) {
    controller.style.visibility = 'visible';
  }
  _hideController(controller) {
    controller.style.visibility = 'hidden';
  }
  _handleLeft = () => {
    this._position--;
    // if: leftmost position
    if(this._position === 0){
      this._hideController(this._left);
    }
    else if(this._position + this._groupSize === this._elements.length - 1){
      this._showController(this._right);
    }
    this._move();
  }
  _handleRight = () => {
    this._position++;
    // if: rightmost position
    if(this._position + this._groupSize === this._elements.length){
      this._hideController(this._right);
    }
    else if(this._position === 1){
      this._showController(this._left);
    }
    this._move();
  }
  _setEventListeners = () => {
    this._left.addEventListener('click', this._handleLeft);
    this._right.addEventListener('click', this._handleRight);
  }
}
