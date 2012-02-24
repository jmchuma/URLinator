/**
 * Initialize things in the HTML popup:
 *	- Translate interface
 */
function init() {
	var objects = document.getElementsByTagName('*');

	for(var i = 0; i < objects.length; i++) {
		// to understand this see HTML5 custom attributes
		if(objects[i].dataset && objects[i].dataset.i18nId) {
			objects[i].innerHTML = chrome.i18n.getMessage(objects[i].dataset.i18nId);
		}
	}
}


/**
 *
 */
function URLsToPasteBoard() {
	/*
	var URLs = new Array();

	for(var i = 0; i < tabIds.length; i++) {
		chrome.tabs.update(tabIds[i], updateTabData(tabIds[i]));
		var url = chrome.tabs.get(tabIds[i], getURL);
		URLs.push(url);
	}
	*/
}

/**
 *
 */
function getURL(tab) {
	return tab.url;
}

/**
 *
 */
function countWindowTabs(win) {
	return win.tabs.length;
}

/**
 * Copies from clipboard to tabs
 */
function boardToTabs() {
	alert('boardToTabs is not ready yet');
}

/**
 * Copies from tabs to clipboard
 */
function tabsToBoard() {
	//alert('tabsToBoard is not ready yet');
	
	var box = document.getElementById('urls');
	box.innerHTML = 'tabsToBoard is not ready yet';
	//var urls = new Array();

	/*
	for(var i = 0; i < tabIds.length; i++) {
		chrome.tabs.update(tabIds[i], updateTabData(tabIds[i]));
		var url = chrome.tabs.get(tabIds[i], getURL);
		urls.push(url);
	}
	*/

	//var numTabs = chrome.windows.getCurrent(countWindowTabs);

	/*
	for(var i = 0; i < 3; i++) {
		chrome.tabs.update(tabIds[i], updateTabData(tabIds[i]));
		var url = chrome.tabs.get(tabIds[i], getURL);
		urls.push(url);
	}

	alert(urls.join('\n'));
	*/

	//var textbox = document.getElementById('urls');
	//textbox.innerHTML =  urls.join('\n');
}

