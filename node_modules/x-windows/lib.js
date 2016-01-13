var child_process = require('child_process');


var rgx = /([ ]*)0x([0-9a-f]+) (.+)  ([0-9x\+\-]+)  ([0-9x\+\-]+)/;
var rgx2 = /"([^"]*)"/;
var rgx3 = /([0-9]+)x([0-9]+)\+([\-0-9]+)\+([\-0-9]+)/;
var rgx4 = /\+([\-0-9]+)\+([\-0-9]+)/;


var pI = function(n) { return parseInt(n, 10); };


var parseCore = function(s) {
    var parts = s.split(": (");
    var p2 = parts[1].substring(0, parts[1].length-1);

    var title = rgx2.exec(parts[0]);
    title = title ? title[1] : '';

    var one = '';
    var two = '';
    var m = rgx2.exec(p2);
    if (m) {
        one = m[1];
        p2 = p2.substr(one.length + 3, 100000);
        m = rgx2.exec(p2);
        if (m) {
            two = m[1];
        }
    }

    return {
        title: title,
        one:   one,
        two:   two
    };
};


var parseGeo = function(s, mode2) {
    var m = (mode2 ? rgx4 : rgx3).exec(s);

    if (mode2) {
        return [
            pI( m[1] ), pI( m[2] )
        ]
    }
    return [
        [pI( m[1] ), pI( m[2] )],
        [pI( m[3] ), pI( m[4] )]
    ]
};


var parseLine = function(l) {
    var m = rgx.exec(l);
    if (m) {
        var names = parseCore(m[3]);
        var geo1 = parseGeo(m[4]);
        return {
            indent: m[1].length,
            id:     parseInt(m[2], 16),
            title:  names.title,
            one:    names.one,
            two:    names.two,
            size:   geo1[0],
            pos:    geo1[1],
            geo2:   parseGeo(m[5], true)
        };
    }
};


var xWindows = function(opts) {
    opts = opts || {};

    var lines = child_process.execSync ('xwininfo -root -tree').toString().split('\n');

    lines = lines.map(parseLine);
    lines = lines.filter(function(n) { return n; });

    lines.forEach(function(l) {
        l.indent = (l.indent - 5) / 3 + 1;
    });

    if (!(opts.tree)) {
        return lines;
    }

    var topNode = {children:[]};
    var lastNodeByIndent = [topNode];
    lines.forEach(function(l) {
        var ind = l.indent;
        delete l.indent;
        l.children = [];

        var lastInd = lastNodeByIndent.length - 1;
        var subBag;

        if (ind > lastInd) {
            lastNodeByIndent.push(l);
            subBag = lastNodeByIndent[lastInd].children;
        }
        else if (ind === lastInd) {
            subBag = lastNodeByIndent[ind].children;
        }
        else {
            lastNodeByIndent.splice(ind + 1, 100);
            subBag = lastNodeByIndent[ind].children;
        }
        subBag.push(l);
    });

    return topNode;
};


module.exports = xWindows;
