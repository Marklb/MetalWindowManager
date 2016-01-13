'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var jsonFile = require('jsonfile');

var Config = (function () {
  function Config(cb) {
    _classCallCheck(this, Config);

    this.conf = {};
  }

  _createClass(Config, [{
    key: 'load',
    value: function load(filename, cb) {
      var _this = this;

      // TODO: Change this to a promise instead of using the callback
      jsonFile.readFile(filename, function (err, obj) {
        console.log(obj);
        _this.conf = obj;
        if (cb) {
          cb();
        }
      });
    }
  }, {
    key: 'getConfig',
    value: function getConfig() {
      return this.conf;
    }
  }]);

  return Config;
})();

module.exports = exports = new Config();