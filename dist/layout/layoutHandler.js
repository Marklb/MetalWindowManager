'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = require('../config/config.js');
var Layout = require('./layout.js');
var LayoutTile = require('./layoutTile.js');
var mb = require('../mb/mb.js');
var windowHandler = require('../windowHandler/windowHandler.js');
var mwmNative = require('../../mwm_native/build/Release/addon');

var fs = require('fs');

var LayoutHandler = (function () {
  function LayoutHandler() {
    var _this = this;

    _classCallCheck(this, LayoutHandler);

    this.loadedLayouts = [];
    this.layoutTiles = [];
    this.activeLayout = null;
    this.layoutsPath = '../../config/layouts/';

    fs.readdir('config/layouts/', function (err, files) {
      if (err) return;
      files.forEach(function (f) {
        if (mb.endsWith(f, '.js')) {
          var TmpLayoutClass = require(_this.layoutsPath + f);
          var tmpLayout = new TmpLayoutClass();
          _this.loadedLayouts.push(tmpLayout);
        }
      });
    });
  }

  _createClass(LayoutHandler, [{
    key: 'initWindow',
    value: function initWindow(gui, vDesktopNum) {
      var _this2 = this;

      this.win = gui.Window.open('layout/layout.html', {
        position: 'center',
        frame: false,
        toolbar: false
      });
      this.win.moveTo(0, 0);
      this.win.resizeTo(1600, 900);
      this.win.setAlwaysOnTop(true);
      this.win.setTransparent(true);
      this.win.setResizable(false);
      this.win.on('loaded', function () {
        _this2.win.showDevTools();
        // this.win.title = 'Layout | Desktop: '+(vDesktopNum+1);
        console.log('Title: ' + _this2.win.title);
        var winKey = 'Layout-VDesktop:' + (vDesktopNum + 1);
        windowHandler.registerWindow(winKey, _this2.win);
        windowHandler.moveWindowToVirtualDesktop(winKey, vDesktopNum);

        // Add the elements
        _this2.bodyElem = _this2.win.window.document.getElementById('layout-body');

        _this2.settingsContainerElem = _this2.win.window.document.createElement('div');
        _this2.settingsContainerElem.classList.add('settings-container');
        _this2.bodyElem.appendChild(_this2.settingsContainerElem);

        // Create Layouts List
        _this2.layoutsListElem = _this2.win.window.document.createElement('div');
        _this2.layoutsListElem.classList.add('layouts-list');
        _this2.settingsContainerElem.appendChild(_this2.layoutsListElem);

        // Add the layouts
        for (var i = 0; i < _this2.loadedLayouts.length; i++) {
          if (i == _this2.loadedLayouts.length - 1) {
            _this2.addLayoutSelectionTile(_this2.loadedLayouts[i], true);
          } else {
            _this2.addLayoutSelectionTile(_this2.loadedLayouts[i]);
          }
        }

        // Add the active layout display tile
        _this2.activeLayoutContainer = _this2.win.window.document.createElement('div');
        _this2.activeLayoutContainer.classList.add('active-layout-container');
        _this2.bodyElem.appendChild(_this2.activeLayoutContainer);
        _this2.activeLayoutContainer.style.left = '50px';
        _this2.activeLayoutContainer.style.top = '50px';

        // Add the active layout name tile
        _this2.activeLayoutName = _this2.win.window.document.createElement('div');
        _this2.activeLayoutName.classList.add('name-tile');
        _this2.activeLayoutName.innerHTML = 'Layout: ' + _this2.activeLayout.getName() + '  ' + mwmNative.getCurrentVirtualDesktopNumber();
        _this2.activeLayoutContainer.appendChild(_this2.activeLayoutName);

        // Add the layuts list to the active layout display container
        _this2.activeLayoutContainer.appendChild(_this2.layoutsListElem);
      });
    }
  }, {
    key: 'reloadLayouts',
    value: function reloadLayouts(s) {
      // TODO: Implement this
    }
  }, {
    key: 'getLayouts',
    value: function getLayouts() {
      return this.loadedLayouts;
    }
  }, {
    key: 'start',
    value: function start() {
      if (!this.isStarted()) {}
    }
  }, {
    key: 'isStarted',
    value: function isStarted() {
      return this.started;
    }
  }, {
    key: 'stop',
    value: function stop() {}
  }, {
    key: 'addLayoutSelectionTile',
    value: function addLayoutSelectionTile(layout) {
      var isLast = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      // console.log('Adding tile for '+layout.getName());
      var tile = new LayoutTile(this.win, layout);
      this.layoutsListElem.appendChild(tile.getElement());

      if (isLast) {
        tile.setIsLast(true);
      }

      // console.log('Default layout'+config.getConfig().global['default-layout']);
      if (config.getConfig().global['default-layout'] == layout.getName()) {
        this.activeLayout = layout;
        // console.log('Setting default layout to '+this.activeLayout.getName());
      }
    }
  }]);

  return LayoutHandler;
})();

module.exports = exports = new LayoutHandler();