let mb = require('../mb/mb.js');
let Command = require('../commandHandler/command.js');
let cmdHandler = require('../commandHandler/commandHandler.js');

module.exports =
class MbConsole {
  constructor(){
    this.lineStartText = '';
    this.linesAdded = [];

    this.containerElem = window.document.createElement('div');
    this.containerElem.classList.add('mb-console');

    // Add the output container
    this.outputContainer = window.document.createElement('div');
    this.outputContainer.classList.add('output-container');
    this.containerElem.appendChild(this.outputContainer);

    // Add the output inner container (Holds the text)
    this.outputInnerContainer = window.document.createElement('div');
    this.outputInnerContainer.classList.add('output-inner-container');
    this.outputContainer.appendChild(this.outputInnerContainer);

    // Add the input textbox container
    this.inputTextboxContainer = window.document.createElement('div');
    this.inputTextboxContainer.classList.add('input-container');
    this.containerElem.appendChild(this.inputTextboxContainer);

    // Add the input textbox
    this.inputTextbox = window.document.createElement('input');
    this.inputTextbox.classList.add('input-textbox');
    this.inputTextbox.type = 'text';
    this.inputTextbox.value = this.getLineStartText();
    this.inputTextboxContainer.appendChild(this.inputTextbox);

    // Add events
    // this.inputTextbox.addEventListener('input', (e) => {
    //   console.log("Input event");
    // });
    this.inputTextbox.addEventListener('keypress', (e) => {
      // console.log('Clicker ' + e.ctrlKey + '  ' + e.keyCode + '  ' + e.charCode);
      if(e.keyCode == 8){ // Backspace
        if(this.inputTextbox.value == this.getLineStartText()){
          e.preventDefault();
        }
      }else if(e.keyCode == 13){ // Enter
        if(this.inputTextbox.value.length > this.getLineStartText().length){
          var inputStr = this.inputTextbox.value.substring(this.getLineStartText().length, this.inputTextbox.value.length);
          this.command(inputStr);
        }
      }else if(e.shiftKey && e.keyCode == 36){ // Ctrl+Home
        this.inputTextbox.selectionStart = this.getLineStartText().length;
        e.preventDefault();
      }else if(e.keyCode == 37){ // Left arrow
        if(mb.doGetCaretPosition(window.document, this.inputTextbox) == this.inputTextbox.selectionStart
          && (this.inputTextbox.selectionEnd-this.inputTextbox.selectionStart) > 0
          && !e.shiftKey){
          this.inputTextbox.selectionEnd = this.inputTextbox.selectionStart;
        }
        if(mb.doGetCaretPosition(window.document, this.inputTextbox) <= this.getLineStartText().length){
          e.preventDefault();
        }
      }else if(e.keyCode == 38){ // Up arrow

      }else if(e.keyCode == 39){ // Right arrow

      }else if(e.keyCode == 40){ // Down arrow

      }else if(e.ctrlKey && e.charCode == 97){ // ctrl+a
        this.inputTextbox.selectionStart = this.getLineStartText().length;
        this.inputTextbox.selectionEnd = this.inputTextbox.value.length;
        e.preventDefault();
      }
    });
    this.inputTextbox.addEventListener('click', (e) => {
      // console.log("Clicked inputTextBox");
      // TODO: [Low] Fix carrot position on mouse click
      // TODO: [Medium] Fix not being able to select the lineStartText
      if(mb.doGetCaretPosition(window.document, this.inputTextbox) < this.getLineStartText().length){
        // If this correction happens, try to find a way to fix it
        // so that this doesn't happen. This works to correct the
        // issue, but normally looks weird.
        // console.log("Keyup correction happened!");
        this.inputTextbox.selectionStart = this.getLineStartText().length;
      }
    });
    this.containerElem.addEventListener('click', (e) => {
      if(!mb.getSelectedText()){
        this.inputTextbox.focus();
      }
    });
    this.inputTextbox.addEventListener('keydown', (e) => {
      // console.log('InputBox keydown ' + e.ctrlKey + '  ' + e.keyCode + '  ' + e.charCode);
      // TODO: Add arrow key code
    });
    this.inputTextbox.addEventListener('keyup', (e) => {
      // console.log('InputBox keyup ' + e.ctrlKey + '  ' + e.keyCode + '  ' + e.charCode);
      // TODO: Add arrow key code
    });
  }

  getElement(){
    return this.containerElem;
  }

  getLineStartText(){
    return this.lineStartText;
  }

  command(cmdStr){
    // console.log("Doing Command: "+cmdStr);
    // this.addToLog("Doing Command"+cmdStr);
    let cmd = cmdHandler.getCommand(cmdStr);
    if(cmd){
      this.addToLog("Command: "+cmdStr+" is valid.");
      cmd.exec();
    }else{
      this.addToLog("Command: "+cmdStr+" is not valid.");
    }
    this.inputTextbox.value = this.lineStartText;
    this.outputInnerContainer.scrollTop = this.outputInnerContainer.scrollHeight;
  }

  clearOutput(){
    for(var i = 0; i < linesAdded.length; i++){
      this.linesAdded[i].remove();
    }
  }

  addToLog(msg){
      var newLineElem = window.document.createElement('p');
      newLineElem.classList.add('output-line');
      newLineElem.innerHTML = msg;
      this.outputInnerContainer.appendChild(newLineElem);
      this.linesAdded.push(newLineElem);
  }

}
