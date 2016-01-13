# X-WINDOWS

This module has the sole purpose of returning the info about x11 windows.

This can be useful if you want to identify which program is running on the screen coords x, y; find a program by its name or window title, etc.


## requirements

Makes use of the `xwininfo` utility.  
Tested on Ubuntu Linux. Please give feedback on other SOs!


## TODO

[ ] what are `one` and `two`?
[ ] what the hell does the `geo2` part mean?
[ ] when `tree` option is falsy, should add parentId attribute to windows


## usage

```javascript
var xWindows = require('x-windows');

xWindows({tree:true});

// RETURNS SOMETHING LIKE:
{
  children: [
    {
      "id": 1231,
      "title": "window title 1",
      "one": "",
      "two": "",
      "size": [200, 150],
      "pos": [0, 0],
      "geo2": [10, 10],
      "children": []
    },
    {
      "id": 1232,
      "title": "window title 2",
      "one": "app2",
      "two": "app2",
      "size": [200, 150],
      "pos": [200, 0],
      "geo2": [10, 10],
      "children": [
        {
          "id": 1233,
          "title": "window title 3",
          "one": "",
          "two": "",
          "size": [400, 200],
          "pos": [200, 0],
          "geo2": [10, 10],
          "children": []
        }
      ]
    }
  ]
}
```
