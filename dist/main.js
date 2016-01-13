'use strict';

var MbConsole = require('./mb-console/mb-console.js');
var Command = require('./commandHandler/command.js');
var cmdHandler = require('./commandHandler/commandHandler.js');
var config = require('./config/config.js');
var layoutHandler = require('./layout/layoutHandler.js');
var windowHandler = require('./windowHandler/windowHandler.js');
var mwmNative = require('../mwm_native/build/Release/addon');

// TODO: Add Hotkey such as CTRL+Arrows to move windows
//       Maybe even add a way to increse how many pixels it shifts

var gui = require('nw.gui');

var mwmConsole = null;

var main = function main() {
  console.log(config.getConfig());
  var win = gui.Window.get();
  win.showDevTools();
  windowHandler.registerWindow('console-window', win);

  win.moveTo(100, 100);
  win.resizeTo(800, 400);

  var bodyElement = window.document.body;
  mwmConsole = new MbConsole();
  bodyElement.appendChild(mwmConsole.getElement());
  win.show();
  win.on('close', beforeClose);

  // Register some basic commands
  loadBasicConsoleCommands();

  layoutHandler.initWindow(gui, 0);
};

onload = function () {
  // config.get(main);
  config.load('./config/default_conf.json', main);
  // IDEA: Check if requiring the json would be better than json parsing module
};

var beforeClose = function beforeClose() {
  // alert('Closing');

  gui.App.quit();
};

function loadBasicConsoleCommands() {
  var resizeConsoleCmd = new Command('resizeConsoleCmd', function () {
    var win = windowHandler.getWindow('console-window');
    win.resizeTo(800, 500);
  });
  cmdHandler.registerCommand(resizeConsoleCmd);
  var killAllConsoleCmd = new Command('killAllConsoleCmd', function () {
    beforeClose();
  });
  cmdHandler.registerCommand(killAllConsoleCmd);
  var quitConsoleCmd = new Command('quit', function () {
    beforeClose();
  });
  cmdHandler.registerCommand(quitConsoleCmd);
}