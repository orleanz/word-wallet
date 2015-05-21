chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  var elem = document.activeElement;

  var editable = elem.getAttribute("contenteditable") ? 
    elem.getAttribute("contenteditable").toLowerCase() : 
    "false";

  if (elem.tagName.toLowerCase() == "input") {

    document.activeElement.value += request.word;

  } else if (

      (elem.tagName.toLowerCase() == "div" && editable == "true") || 
      elem.tagName.toLowerCase() == "textarea"

    ) {

    document.activeElement.textContent += request.word;
  
  } else {
  
    alert("Word '" + request.word + "' was put in the clipboard.\n\n" + 
      "You can paste if from there in a usual way, like Control+V");
  
  }

  placeCaretAtEnd(elem);
  
});


function placeCaretAtEnd(el) {
  el.focus();
  if (typeof window.getSelection != "undefined"
        && typeof document.createRange != "undefined") {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
  } else if (typeof document.body.createTextRange != "undefined") {
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
  }
}