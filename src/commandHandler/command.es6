module.exports =
class Command {
  constructor(cmdName, cmdFunc) {
    this.cmdName = cmdName;
    this.cmdFunc = cmdFunc;
  }

  getName(){
    return this.cmdName;
  }

  get exec(){
    return this.cmdFunc;
  }
}
