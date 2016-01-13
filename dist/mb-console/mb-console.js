'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mb = require('../mb/mb.js');
var Command = require('../commandHandler/command.js');
var cmdHandler = require('../commandHandler/commandHandler.js');

module.exports = (function () {
  function MbConsole() {
    var _this = this;

    _classCallCheck(this, MbConsole);

    this.lineStartText = '';
    this.linesAdded = [];

    window.document.title = "MB Console";

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
    this.inputTextbox.addEventListener('keypress', function (e) {
      // console.log('Clicker ' + e.ctrlKey + '  ' + e.keyCode + '  ' + e.charCode);
      if (e.keyCode == 8) {
        // Backspace
        if (_this.inputTextbox.value == _this.getLineStartText()) {
          e.preventDefault();
        }
      } else if (e.keyCode == 13) {
        // Enter
        if (_this.inputTextbox.value.length > _this.getLineStartText().length) {
          var inputStr = _this.inputTextbox.value.substring(_this.getLineStartText().length, _this.inputTextbox.value.length);
          _this.command(inputStr);
        }
      } else if (e.shiftKey && e.keyCode == 36) {
        // Ctrl+Home
        _this.inputTextbox.selectionStart = _this.getLineStartText().length;
        e.preventDefault();
      } else if (e.keyCode == 37) {
        // Left arrow
        if (mb.doGetCaretPosition(window.document, _this.inputTextbox) == _this.inputTextbox.selectionStart && _this.inputTextbox.selectionEnd - _this.inputTextbox.selectionStart > 0 && !e.shiftKey) {
          _this.inputTextbox.selectionEnd = _this.inputTextbox.selectionStart;
        }
        if (mb.doGetCaretPosition(window.document, _this.inputTextbox) <= _this.getLineStartText().length) {
          e.preventDefault();
        }
      } else if (e.keyCode == 38) {// Up arrow

      } else if (e.keyCode == 39) {// Right arrow

        } else if (e.keyCode == 40) {// Down arrow

          } else if (e.ctrlKey && e.charCode == 97) {
              // ctrl+a
              _this.inputTextbox.selectionStart = _this.getLineStartText().length;
              _this.inputTextbox.selectionEnd = _this.inputTextbox.value.length;
              e.preventDefault();
            }
    });
    this.inputTextbox.addEventListener('click', function (e) {
      // console.log("Clicked inputTextBox");
      // TODO: [Low] Fix carrot position on mouse click
      // TODO: [Medium] Fix not being able to select the lineStartText
      if (mb.doGetCaretPosition(window.document, _this.inputTextbox) < _this.getLineStartText().length) {
        // If this correction happens, try to find a way to fix it
        // so that this doesn't happen. This works to correct the
        // issue, but normally looks weird.
        // console.log("Keyup correction happened!");
        _this.inputTextbox.selectionStart = _this.getLineStartText().length;
      }
    });
    this.containerElem.addEventListener('click', function (e) {
      if (!mb.getSelectedText()) {
        _this.inputTextbox.focus();
      }
    });
    this.inputTextbox.addEventListener('keydown', function (e) {
      // console.log('InputBox keydown ' + e.ctrlKey + '  ' + e.keyCode + '  ' + e.charCode);
      // TODO: Add arrow key code
    });
    this.inputTextbox.addEventListener('keyup', function (e) {
      // console.log('InputBox keyup ' + e.ctrlKey + '  ' + e.keyCode + '  ' + e.charCode);
      // TODO: Add arrow key code
    });
  }

  _createClass(MbConsole, [{
    key: 'getElement',
    value: function getElement() {
      return this.containerElem;
    }
  }, {
    key: 'getLineStartText',
    value: function getLineStartText() {
      return this.lineStartText;
    }
  }, {
    key: 'command',
    value: function command(cmdStr) {
      // console.log("Doing Command: "+cmdStr);
      // this.addToLog("Doing Command"+cmdStr);
      var cmd = cmdHandler.getCommand(cmdStr);
      if (cmd) {
        this.addToLog("Command: " + cmdStr + " is valid.");
        cmd.exec();
      } else {
        this.addToLog("Command: " + cmdStr + " is not valid.");
      }
      this.inputTextbox.value = this.lineStartText;
      this.outputInnerContainer.scrollTop = this.outputInnerContainer.scrollHeight;
    }
  }, {
    key: 'clearOutput',
    value: function clearOutput() {
      for (var i = 0; i < linesAdded.length; i++) {
        this.linesAdded[i].remove();
      }
    }
  }, {
    key: 'addToLog',
    value: function addToLog(msg) {
      var newLineElem = window.document.createElement('p');
      newLineElem.classList.add('output-line');
      newLineElem.innerHTML = msg;
      this.outputInnerContainer.appendChild(newLineElem);
      this.linesAdded.push(newLineElem);
    }
  }]);

  return MbConsole;
})();