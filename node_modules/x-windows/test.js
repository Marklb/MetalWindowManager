var xWindows = require('./lib');

//var out = xWindows(); // array of windows
var out = xWindows({tree:true}); // tree of windows

console.log( JSON.stringify(out, null, '  ') );
