'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = (function () {
  function layoutTiles(win, layout) {
    _classCallCheck(this, layoutTiles);

    this.win = win;
    this.layout = layout;

    this.containerElem = this.win.window.document.createElement('div');
    this.containerElem.classList.add('layout-selection-tile');
    // this.layoutsListElem.appendChild(this.containerElem);

    // Add layout title to the tile
    this.tileTitle = this.win.window.document.createElement('p');
    this.tileTitle.innerHTML = this.layout.getName();
    this.containerElem.appendChild(this.tileTitle);

    this.getElement().layoutObj = this;
  }

  _createClass(layoutTiles, [{
    key: 'getElement',
    value: function getElement() {
      return this.containerElem;
    }
  }, {
    key: 'setIsLast',
    value: function setIsLast(b) {
      this.containerElem.classList.add('last');
    }
  }]);

  return layoutTiles;
})();