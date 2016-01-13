'use strict';

/*
** Returns the caret (cursor) position of the specified text field.
** Return value range is 0-oField.value.length.
*/
module.exports.doGetCaretPosition = function (doc, oField) {
  // Initialize
  var iCaretPos = 0;
  // IE Support
  if (doc.selection) {
    // Set focus on the element
    oField.focus();
    // To get cursor position, get empty selection range
    var oSel = doc.selection.createRange();
    // Move selection start to 0 position
    oSel.moveStart('character', -oField.value.length);
    // The caret position is selection length
    iCaretPos = oSel.text.length;
  }
  // Firefox support
  else if (oField.selectionStart || oField.selectionStart == '0') iCaretPos = oField.selectionStart;
  // Return results
  return iCaretPos;
};

module.exports.fixWhich = function (e) {
  if (!e.which && e.button) {
    if (e.button & 1) e.which = 1; // Left
    else if (e.button & 4) e.which = 2; // Middle
      else if (e.button & 2) e.which = 3; // Right
  }
};

module.exports.getSelectedText = function () {
  var text = "";
  if (typeof window.getSelection != "undefined") {
    text = window.getSelection().toString();
  } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
    text = document.selection.createRange().text;
  }
  return text;
};

module.exports.endsWith = function (str, strEnding) {
  if (str.length < strEnding.length) {
    return false;
  }
  if (str.substring(str.length - strEnding.length, str.length) == strEnding) {
    return true;
  }
  return false;
};