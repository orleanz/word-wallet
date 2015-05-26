var DEFAULT_WORDS = [ ['ä', ''], ['ö', ''], ['ü', ''], ['Ä', ''], 
  ['Ö', ''], ['Ü',''], ['ß',''], ['ñ', ''], ['12345', 'password'] ];

var DEFAULT_USER_NAMES = ['user1', 'user2'];

var MENU_DICT_KEY = "word_wallet_dict";

var WORD_LIST_KEY = "word_wallet_word_list";
var USER_NAMES_KEY = "word_wallet_user_names";
var MASTER_SECRET_KEY = "word_wallet_master_secret";

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
    words = DEFAULT_WORDS;
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

  chrome.contextMenus.create(
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

  chrome.contextMenus.create(
    {"type": "separator",
    "parentId": parent, 
    "contexts": ["all"]
  });

  var idAutoPassParent = chrome.contextMenus.create(
    {"title": "passwords", 
    "parentId": parent, 
    "contexts": ["all"]
  });

  var idAutoPassUniversal = chrome.contextMenus.create(
    {"title": "auto-password", 
    "parentId": idAutoPassParent, 
    "contexts": ["all"]
  });

  dict[idAutoPassUniversal] = {autoPassUniversal: true};

  var userNames;

  tmp = localStorage.getItem(USER_NAMES_KEY);

  if (tmp) {
    userNames = JSON.parse(tmp);
  } else {
    userNames = DEFAULT_USER_NAMES;
  }

  for (var i = 0; i < userNames.length; i++) {

    chrome.contextMenus.create(
      {"type": "separator",
      "parentId": idAutoPassParent, 
      "contexts": ["all"]
    });

    var idAutoPassName = chrome.contextMenus.create(
      {"title":  "paste user: " + userNames[i], 
      "parentId": idAutoPassParent, 
      "contexts": ["all"]
    });

    dict[idAutoPassName] = {autoPassName: true, userName: userNames[i]};

    var idAutoPass = chrome.contextMenus.create(
      {"title":  "past password for: " + userNames[i], 
      "parentId": idAutoPassParent, 
      "contexts": ["all"]
    });

    dict[idAutoPass] = {autoPass: true, userName: userNames[i]};

  }

  localStorage.setItem(MENU_DICT_KEY, JSON.stringify(dict));

}






