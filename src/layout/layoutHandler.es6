let config = require('../config/config.js');
let Layout = require('./layout.js');
let LayoutTile = require('./layoutTile.js');
let mb = require('../mb/mb.js');
let windowHandler = require('../windowHandler/windowHandler.js');
let mwmNative = require('../../mwm_native/build/Release/addon');

let fs = require('fs');

class LayoutHandler {
  constructor(){
    this.loadedLayouts = [];
    this.layoutTiles = [];
    this.activeLayout = null;
    this.wKey = null;
    this.layoutsPath = '../../config/layouts/';

    fs.readdir('config/layouts/', (err, files) => {
      if (err) return;
      files.forEach((f) => {
        if(mb.endsWith(f, '.js')){
          let TmpLayoutClass = require(this.layoutsPath+f);
          let tmpLayout = new TmpLayoutClass();
          this.loadedLayouts.push(tmpLayout);
        }
      });
    });


  }

  initWindow(gui, vDesktopNum){
    this.win = gui.Window.open ('layout/layout.html', {
      position: 'center',
      frame: false,
      toolbar: false
    });
    let scrn = gui.Screen.Init();
    this.win.moveTo(0,0);
    this.win.resizeTo(scrn.screens[0].bounds.width,
                      scrn.screens[0].bounds.height);
    this.win.setAlwaysOnTop(true);
    this.win.setTransparent(true);
    this.win.setResizable(false);
    this.win.on('loaded', () => {
      this.win.showDevTools();
      // this.win.title = 'Layout | Desktop: '+(vDesktopNum+1);
      console.log('Title: '+this.win.title);
      let winKey = 'Layout-VDesktop:'+(vDesktopNum+1);
      this.wKey = winKey;
      windowHandler.registerWindow(winKey, this.win);
      console.log('Switching '+ winKey +' To '+vDesktopNum);
      // TODO: Fix
      // windowHandler.moveWindowToVirtualDesktop(winKey, vDesktopNum);
      console.log('Done Switching '+ winKey +' To '+vDesktopNum);

      // Add the elements
      this.bodyElem = this.win.window.document.getElementById('layout-body');

      this.settingsContainerElem = this.win.window.document.createElement('div');
      this.settingsContainerElem.classList.add('settings-container');
      this.bodyElem.appendChild(this.settingsContainerElem);

      // Create Layouts List
      this.layoutsListElem = this.win.window.document.createElement('div');
      this.layoutsListElem.classList.add('layouts-list');
      this.settingsContainerElem.appendChild(this.layoutsListElem);

      // Add the layouts
      for(let i = 0; i < this.loadedLayouts.length; i++){
        if(i == this.loadedLayouts.length-1){
          this.addLayoutSelectionTile(this.loadedLayouts[i], true);
        }else{
          this.addLayoutSelectionTile(this.loadedLayouts[i]);
        }
      }

      // Add the active layout display tile
      this.activeLayoutContainer = this.win.window.document.createElement('div');
      this.activeLayoutContainer.classList.add('active-layout-container');
      this.bodyElem.appendChild(this.activeLayoutContainer);
      this.activeLayoutContainer.style.left = '50px';
      this.activeLayoutContainer.style.top = '50px';

      // Add the active layout name tile
      this.activeLayoutName = this.win.window.document.createElement('div');
      this.activeLayoutName.classList.add('name-tile');
      this.activeLayoutName.innerHTML = 'Layout: '+this.activeLayout.getName() + '  ' + mwmNative.getCurrentVirtualDesktopNumber();
      this.activeLayoutContainer.appendChild(this.activeLayoutName);

      // Add the layuts list to the active layout display container
      this.activeLayoutContainer.appendChild(this.layoutsListElem);


    });

  }

  reloadLayouts(s){
    // TODO: Implement this
  }

  getLayouts(){
    return this.loadedLayouts;
  }

  start(){
    if(!this.isStarted()){

    }
  }

  isStarted(){
    return this.started;
  }

  stop(){

  }

  addLayoutSelectionTile(layout, isLast=false){
    // console.log('Adding tile for '+layout.getName());
    let tile = new LayoutTile(this.win, layout);
    this.layoutsListElem.appendChild(tile.getElement());

    if(isLast){
      tile.setIsLast(true);
    }

    // console.log('Default layout'+config.getConfig().global['default-layout']);
    if(config.getConfig().global['default-layout'] == layout.getName()){
      this.activeLayout = layout;
      // console.log('Setting default layout to '+this.activeLayout.getName());
    }

  }

  moveActiveLayoutWindowToCurrentDekstop(){
    console.log('Switching');
    // this.win.hide();
    // this.win.show();
    // windowHandler.moveWindowToVirtualDesktop(this.wKey);
    console.log('Done Switching');
  }

}

module.exports = exports = new LayoutHandler();
