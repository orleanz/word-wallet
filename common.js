var DEFAULTS = [ ['ä', ''], ['ö', ''], ['ü', ''], ['Ä', ''], 
  ['Ö', ''], ['Ü',''], ['ß',''], ['ñ', ''], ['12345', 'password'] ];

var WORD_LIST_KEY = "word_wallet_word_list";
var WORD_DICT_KEY = "word_wallet_dict";

function buildWordWalletMenu() {

  chrome.contextMenus.removeAll();

  var dict = {};

  var parent = chrome.contextMenus.create({
      "title": "Word Wallet",
      "contexts": ["all"]
    });

  var words;

  var tmp = localStorage.getItem(WORD_LIST_KEY);

  if (tmp) {
    words = JSON.parse(tmp);
  } else {
    words = DEFAULTS;
  }

  for (var i = 0; i < words.length; i++) {

    var w = words[i][0]; // word
    var s = words[i][1]; // synonyme

    var id = chrome.contextMenus.create(
      {"title": s != "" ? "[" + s + "]" : w, 
      "parentId": parent, 
      "contexts": ["all"]
    });

    dict[id] = words[i][0];

  }

  var idSeparator = chrome.contextMenus.create(
    {"type": "separator",
    "parentId": parent, 
    "contexts": ["all"]
  });

  var idAdder = chrome.contextMenus.create(
    {"title": "add selected text", 
    "parentId": parent, 
    "contexts": ["all"]
  });

  dict[idAdder] = {addWord: true};

  localStorage.setItem(WORD_DICT_KEY, JSON.stringify(dict));

}






