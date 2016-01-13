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
      let tmpHwnd = mwmNative.findWindow(
        "+-=-=-=-+NewMetalMarkWindowManagerWindow+-=-=-=-+");
      this.registeredWindows[windowNameKey] = {
        nwWindow: win,
        hwnd: tmpHwnd
      };
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
    if(this.getWindow(windowNameKey)){
      console.log('Moving window with key '+windowNameKey+'.');
      console.log('HWND: '+ this.getWindow(windowNameKey).hwnd);

      return 'Moving window with key '+windowNameKey+'.';
    }else{
      return 'Window with key '+windowNameKey+' does not exists.';
      return -1;
    }
  }

}

module.exports = exports = new WindowHandler();
