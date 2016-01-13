"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Layout = require('../../dist/layout/layout.js');

module.exports = (function (_Layout) {
  _inherits(Fullscreen, _Layout);

  function Fullscreen() {
    _classCallCheck(this, Fullscreen);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Fullscreen).call(this));

    _this.layoutName = "Fullscreen";
    return _this;
  }

  return Fullscreen;
})(Layout);