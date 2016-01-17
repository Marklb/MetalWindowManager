let MbConsole = require('./mb-console/mb-console.js');
let Command = require('./commandHandler/command.js');
let cmdHandler = require('./commandHandler/commandHandler.js');
let config = require('./config/config.js');
let layoutHandler = require('./layout/layoutHandler.js');
let windowHandler = require('./windowHandler/windowHandler.js');
let mwmNative = require('../mwm_native/build/Release/addon');

// TODO: Add Hotkey such as CTRL+Arrows to move windows
//       Maybe even add a way to increse how many pixels it shifts

let gui = require('nw.gui');

let mwmConsole = null;

let main = function(){
  console.log(config.getConfig());
  let win = gui.Window.get();
  win.showDevTools();
  windowHandler.registerWindow('console-window', win);

  win.moveTo(100,100);
  win.resizeTo(800,400);

  let bodyElement = window.document.body;
  mwmConsole = new MbConsole();
  bodyElement.appendChild(mwmConsole.getElement());
  win.show();
  win.on('close', beforeClose);

  // Register some basic commands
  loadBasicConsoleCommands();

  layoutHandler.initWindow(gui, 0);


}

onload = function() {
  // config.get(main);
  config.load('./config/default_conf.json', main);
  // IDEA: Check if requiring the json would be better than json parsing module
}

let beforeClose = function(){
  // alert('Closing');


  gui.App.quit();
}

function loadBasicConsoleCommands(){
  let resizeConsoleCmd = new Command('resizeConsoleCmd', () => {
    let win = windowHandler.getWindow('console-window');
    win.resizeTo(800, 500);
  });
  cmdHandler.registerCommand(resizeConsoleCmd);
  let killAllConsoleCmd = new Command('killAllConsoleCmd', () => {
    beforeClose();
  });
  cmdHandler.registerCommand(killAllConsoleCmd);
  let quitConsoleCmd = new Command('quit', () => {
    beforeClose();
  });
  cmdHandler.registerCommand(quitConsoleCmd);
  let moveLayoutConsoleCmd = new Command('switchDesktop', () => {
    layoutHandler.moveActiveLayoutWindowToCurrentDekstop();
  });
  cmdHandler.registerCommand(moveLayoutConsoleCmd);
}
