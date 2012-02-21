

function URLsToPasteBoard() {
	var URLs = new Array();
	
	for (var i = 0; i < tabIds.length; i++) {
      chrome.tabs.update(tabIds[i], updateTabData(tabIds[i]));
	  var url = chrome.tabs.get(tabIds[i], getURL);
	  URLs.push(url);
    }
	
	
}

function getURL(Tab tab) {
	return tab.url;
}