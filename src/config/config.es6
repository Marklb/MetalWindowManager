let jsonFile = require('jsonfile');

class Config {
  constructor(cb) {
    this.conf = {};
  }

  load(filename, cb){
    // TODO: Change this to a promise instead of using the callback
    jsonFile.readFile(filename, (err, obj) => {
      console.log(obj);
      this.conf = obj;
      if(cb){
        cb();
      }
    })
  }

  getConfig(){
    return this.conf;
  }
}

module.exports = exports = new Config();
