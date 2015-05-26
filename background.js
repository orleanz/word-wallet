chrome.contextMenus.onClicked.addListener(function(args) {

  var dict = JSON.parse( localStorage.getItem(MENU_DICT_KEY) );

  var id = args.menuItemId;

  if (dict[id]) {

    if (dict[id].addWord) {
      
      if (args.selectionText) {

        var tmpList = localStorage.getItem(WORD_LIST_KEY);
        var words = tmpList ? JSON.parse(tmpList) : DEFAULTS;
        words.push([args.selectionText, ""]);
        localStorage.setItem(WORD_LIST_KEY, JSON.stringify(words));
        buildWordWalletMenu();  

      }

    } else if (dict[id].autoPass) {

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { 
          autoPass: 1, 
          userName: dict[id].userName, 
          secret: localStorage.getItem(MASTER_SECRET_KEY)
        });
      });

    } else if (dict[id].autoPassName) {

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { 
          autoPassName: 1, 
          userName: dict[id].userName, 
          secret: localStorage.getItem(MASTER_SECRET_KEY)
        });
      });

    } else if (dict[id].autoPassUniversal) {
      
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {autoPassUniversal: 1, secret: localStorage.getItem(MASTER_SECRET_KEY)});
      });

    } else {

      var tmp = document.createElement("input");
      tmp.type = "text";
      tmp.value = dict[id];
      document.activeElement.appendChild(tmp);

      tmp.select();
      document.execCommand('copy');

      document.activeElement.removeChild(tmp);

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {word: dict[id]});
      });

    }

  } else {

    console.log("entry not found for menu id: " + id);
  
  }

});


chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({
        'url': chrome.extension.getURL('settings.html')
    }, function(tab) {

    });
});

///////////////////////////////////////////////////////////////////////////

buildWordWalletMenu();





