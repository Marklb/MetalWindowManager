let mwmNative = require('../../mwm_native/build/Release/addon');

class WindowHandler {
  constructor(){
    this.registeredWindows = {};
  }

  registerWindow(windowNameKey, win){
    // TODO: Change returns to error numbers
    // IDEA: Create a list of error numbers to use across full app.
    //        Each number would have a corresponding description message.
    if(this.registeredWindows[windowNameKey]){
      return 'Window with key '+windowNameKey+' already exists.';
    }else{
      this.registeredWindows[windowNameKey] = win;
      console.log('Registered Window: '+ windowNameKey);
      return 'Success';
    }
  }

  getWindow(windowNameKey){
    if(this.registeredWindows[windowNameKey]){
      return this.registeredWindows[windowNameKey];
    }else{
      return null;
    }
  }

  moveWindowToVirtualDesktop(windowNameKey, vDesktopNum){
    // console.log('Requested to move: '+ windowNameKey);
    if(this.registeredWindows[windowNameKey]){
      console.log('Moving window with key '+windowNameKey+'.');
      let win = this.registeredWindows[windowNameKey];
      console.log('Finding window with title: '+win.title);
      let hwnd = mwmNative.findWindow(win.title);
      console.log('HWND: '+ hwnd);

      return 'Moving window with key '+windowNameKey+'.';
    }else{
      return 'Window with key '+windowNameKey+' does not exists.';
      return -1;
    }
  }

}

module.exports = exports = new WindowHandler();
