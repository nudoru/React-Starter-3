/*
.Card {
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 8px 50px -20px rgba(14, 21, 47, 0.4);
  display: block;
  font-family: "neutra", sans-serif;
  margin: 0 auto;
  position: relative;
  text-align: center;
  width: 100%;
  z-index: 1; }
  .Card > .Card-content:first-child,
  .Card > .Card-contentWrap:first-child,
  .Card > .Card-image:first-child, .Card-layers > .Card-content:first-child,
  .Card-layers > .Card-contentWrap:first-child,
  .Card-layers > .Card-image:first-child {
    border-top-left-radius: 2px;
    border-top-right-radius: 2px; }
  .Card > .Card-content:last-child,
  .Card > .Card-contentWrap:last-child,
  .Card > .Card-image:last-child, .Card-layers > .Card-content:last-child,
  .Card-layers > .Card-contentWrap:last-child,
  .Card-layers > .Card-image:last-child {
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px; }
  .Card p:first-of-type {
    margin-top: 0; }
  .Card .Form {
    margin-bottom: 1em;
    margin-top: 1em;
    width: 100%; }
  .Card .Media {
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    -ms-flex-pack: end;
        justify-content: flex-end; }
    .Card .Media-body {
      -ms-flex-preferred-size: 10rem;
          flex-basis: 10rem; }
    .Card .Media-image button:only-child, .Card .Media-image .Button:only-child, .Card .Media-image .Form-checkboxLarge + .Form-label:only-child {
      margin-top: 1em; }
  .Card-alert {
    margin-top: calc(-2.54237vw + 4.25847rem); }
    .Card-alert > button, .Card-alert > .Button, .Card-alert > .Form-checkboxLarge + .Form-label {
      bottom: 0;
      font-family: "anivers", "neutra", sans-serif;
      left: 50%;
      position: absolute;
      transform: translateX(-50%); }
  .Card-container {
    border-radius: 2px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-positive: 1;
        flex-grow: 1;
    position: relative;
    transform-style: preserve-3d;
    transition: all 0.2s ease-out; }
    .Card-container.is-over .Card-shadow {
      box-shadow: 0 25px 75px rgba(14, 21, 47, 0.5); }
  .Card-content {
    line-height: 1.4;
    padding: 12.5%; }
    .Card-content > .Card-image {
      margin-top: 16.666%; }
  .Card-contentWrap {
    -ms-flex-positive: 1;
        flex-grow: 1; }
  .Card-hover .Card-title:hover, .Card-hover .Card-title:focus {
    outline: none;
    color: #2f8eb4 !important; }
  .Card-icon {
    background-color: currentColor;
    border-radius: 99em;
    display: inline-block;
    font-size: calc(1.69492vw + 4.03602rem);
    height: 1em;
    line-height: 1;
    margin-top: -0.5em;
    padding: 0.25em;
    width: 1em; }
    .Card-icon--stripped {
      background-color: #fff;
      margin-top: 0; }
    .Card-icon > .Icon {
      color: #fff;
      height: 0.5em; }
  .Card-image,
  .Card-image > img {
    display: block;
    min-height: 1px;
    width: 100%; }
  div.Card-image {
    background: center / cover; }
  .Card-layers {
    background: #fff;
    border-radius: 2px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
        flex-direction: column;
    -ms-flex-positive: 1;
        flex-grow: 1;
    position: relative;
    width: 100%; }
  .Card-shadow {
    bottom: 1.25rem;
    box-shadow: 0 8px 50px rgba(14, 21, 47, 0.4);
    left: 1.25rem;
    position: absolute;
    right: 1.25rem;
    top: 1.25rem;
    transition: all 0.2s ease-out; }
  .Card-shine {
    border-radius: 2px;
    bottom: 0;
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0; }
  .Card-title {
    color: #35312a;
    font-family: inherit;
    font-size: calc(0.60254vw + 0.93512rem);
    font-weight: 900;
    line-height: 1;
    margin-bottom: 0.4em;
    text-transform: uppercase; }
    .Card-image + .Card-title {
      margin-top: 1em; }
  .Card-type {
    margin-bottom: -12.5%;
    text-transform: uppercase; }
    .Card-type > span {
      display: block;
      font-size: calc(0.1322vw + 0.75106rem);
      font-weight: 700;
      margin: 0.5em; }
  .Card--hasCircleImage {
    box-shadow: none;
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 16.25rem; }
    .Card--hasCircleImage .Card-image {
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      margin: auto;
      max-width: 50vw; }
    .Card--hasCircleImage .Card-title.Card-title {
      font-weight: 700;
      text-transform: none; }
  @media only screen and (max-width: 47.9375em) {
    .Card--hasCircleImage .Card-image {
      max-width: 40vw; } }
  @media only screen and (min-width: 64em) {
    .Card .Media-image .Icon--circleArrowRight {
      width: 30px; } }

.Calendar-title {
  padding: 40px 0;
  text-align: center; }
  .Calendar-title h1 {
    color: #3bb1e1;
    font-size: calc(1.50678vw + 1.08739rem) !important; }
    .Calendar-title h1 em {
      color: #777;
      display: block;
      font-size: 0.5em;
      font-style: normal;
      font-weight: normal; }

.Calendar-eventTrack {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
      flex-direction: column;
  -ms-flex-positive: 1;
      flex-grow: 1;
  transform: translateZ(0); }

.Calendar-closed {
  clear: both;
  padding: 50px 0;
  text-align: center;
  -ms-flex-order: 1;
      order: 1; }
  .Calendar-closed .Icon {
    margin-right: 5px;
    vertical-align: middle; }
  .Calendar-closed strong {
    color: #000;
    display: inline-block;
    font-weight: 900;
    margin-left: 25px;
* */


var Card = function () {
  function Card(node) {
    _classCallCheck(this, Card);

    this.node = node;
    var layerElems = node.children;

    if (layerElems.length <= 0) {
      return;
    }

    this.shine = (0, _createElement2.default)('div', { className: 'Card-shine' });
    this.layers = Array.prototype.slice.call(layerElems);

    node.appendChild(this.container = (0, _createElement2.default)('div', { className: 'Card-container' }, (0, _createElement2.default)('div', { className: 'Card-shadow' }), (0, _createElement2.default)('div', { className: 'Card-layers' }, this.layers), this.shine));

    (0, _legoEvents.on)(node, {
      mouseenter: this.processEnter.bind(this),
      mousemove: this.processMovement.bind(this),
      mouseleave: this.processExit.bind(this)
    });
  }

  _createClass(Card, [{
    key: 'processEnter',
    value: function processEnter() {
      var bdst = window.pageYOffset;
      var bdsl = window.pageXOffset;
      var offset = this.node.getBoundingClientRect();

      this.offsetLeft = offset.left + bdsl;
      this.offsetTop = offset.top + bdst;
      this.width = this.node.clientWidth;
      this.height = this.node.clientHeight;

      this.container.classList.add('is-over');
    }
  }, {
    key: 'processMovement',
    value: function processMovement(e) {
      var pageX = supportsTouch ? e.touches[0].pageX : e.pageX;
      var pageY = supportsTouch ? e.touches[0].pageY : e.pageY;
      var offsetX = 0.5 - (pageX - this.offsetLeft) / this.width; // cursor position X
      var offsetY = 0.5 - (pageY - this.offsetTop) / this.height; // cursor position Y
      var dx = pageX - this.offsetLeft - this.width / 2; // @w/2 = center of container
      var dy = pageY - this.offsetTop - this.height / 2; // @h/2 = center of container

      var xRotate = -offsetY * maxRotation * 2; // rotation for container X
      var yRotate = offsetX * maxRotation * 2; // rotation for container Y
      var imgCSS = 'rotateX(' + xRotate + 'deg) rotateY(' + yRotate + 'deg)'; // img transform

      if (this.container.classList.contains('is-over')) {
        imgCSS += ' scale3d(1.07,1.07,1.07)';
      }

      // get angle between 0-360
      var arad = Math.atan2(dy, dx); // angle between cursor and center of container in RAD
      var angle = arad * 180 / Math.PI - 90; // convert rad in degrees
      if (angle < 0) {
        angle = angle + 360;
      }

      this.container.style.transform = imgCSS;
      this.shine.style.background = 'linear-gradient(' + angle + 'deg, rgba(255, 255, 255, ' + (pageY - this.offsetTop) / this.height * 0.4 + ') 0%,rgba(255, 255, 255, 0) 80%)';
      this.shine.style.transform = 'translateX(' + (offsetX * this.layers.length - 0.1) + 'px) translateY(' + (offsetY * this.layers.length - 0.1) + 'px)';
    }
  }, {
    key: 'processExit',
    value: function processExit() {
      this.container.classList.remove('is-over');
      this.container.style.transform = '';
      this.shine.style.cssText = '';

      for (var ly = 0; ly < this.layers.length; ly++) {
        this.layers[ly].style.transform = '';
      }
    }
  }]);

  return Card;
}();

exports.default = Card;


Card.getInstance = (0, _getInstance2.default)('_card', Card);