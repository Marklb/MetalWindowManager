'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mwmNative = require('../../mwm_native/build/Release/addon');

var WindowHandler = (function () {
  function WindowHandler() {
    _classCallCheck(this, WindowHandler);

    this.registeredWindows = {};
  }

  _createClass(WindowHandler, [{
    key: 'registerWindow',
    value: function registerWindow(windowNameKey, win) {
      // TODO: Change returns to error numbers
      // IDEA: Create a list of error numbers to use across full app.
      //        Each number would have a corresponding description message.
      if (this.registeredWindows[windowNameKey]) {
        return 'Window with key ' + windowNameKey + ' already exists.';
      } else {
        var tmpHwnd = mwmNative.findWindow("+-=-=-=-+NewMetalMarkWindowManagerWindow+-=-=-=-+");
        this.registeredWindows[windowNameKey] = {
          nwWindow: win,
          hwnd: tmpHwnd
        };
        console.log('Registered Window: ' + windowNameKey);
        return 'Success';
      }
    }
  }, {
    key: 'getWindow',
    value: function getWindow(windowNameKey) {
      if (this.registeredWindows[windowNameKey]) {
        return this.registeredWindows[windowNameKey];
      } else {
        return null;
      }
    }
  }, {
    key: 'moveWindowToVirtualDesktop',
    value: function moveWindowToVirtualDesktop(windowNameKey, vDesktopNum) {
      // console.log('Requested to move: '+ windowNameKey);
      if (this.getWindow(windowNameKey)) {
        console.log('Moving window with key ' + windowNameKey + '.');
        console.log('HWND: ' + this.getWindow(windowNameKey).hwnd);

        return 'Moving window with key ' + windowNameKey + '.';
      } else {
        return 'Window with key ' + windowNameKey + ' does not exists.';
        return -1;
      }
    }
  }]);

  return WindowHandler;
})();

module.exports = exports = new WindowHandler();