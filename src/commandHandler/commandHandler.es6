let Command = require('./command.js');

class CommandHandler {
  constructor(){
    this.registeredCommands = [];
  }

  registerCommand(cmd){
    if(cmd instanceof Command){
      this.registeredCommands.push(cmd);
      return 'Success';
    }else{
      return 'Only commands of type Command can be registered';
    }
  }

  getCommand(cmdName){
    for(let i = 0; i < this.registeredCommands.length; i++){
      if(this.registeredCommands[i].getName() == cmdName){
        return this.registeredCommands[i];
      }
    }
    return null;
  }

}

module.exports = exports = new CommandHandler();
