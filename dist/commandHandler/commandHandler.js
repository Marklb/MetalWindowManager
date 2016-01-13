'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Command = require('./command.js');

var CommandHandler = (function () {
  function CommandHandler() {
    _classCallCheck(this, CommandHandler);

    this.registeredCommands = [];
  }

  _createClass(CommandHandler, [{
    key: 'registerCommand',
    value: function registerCommand(cmd) {
      if (cmd instanceof Command) {
        this.registeredCommands.push(cmd);
        return 'Success';
      } else {
        return 'Only commands of type Command can be registered';
      }
    }
  }, {
    key: 'getCommand',
    value: function getCommand(cmdName) {
      for (var i = 0; i < this.registeredCommands.length; i++) {
        if (this.registeredCommands[i].getName() == cmdName) {
          return this.registeredCommands[i];
        }
      }
      return null;
    }
  }]);

  return CommandHandler;
})();

module.exports = exports = new CommandHandler();