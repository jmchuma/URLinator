/**
 * Use for not implemented things
 */
function toDo() {
	alert("Sorry, this is not yet implemented");
}

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
	var URLs = new Array();

	for(var i = 0; i < tabIds.length; i++) {
		chrome.tabs.update(tabIds[i], updateTabData(tabIds[i]));
		var url = chrome.tabs.get(tabIds[i], getURL);
		URLs.push(url);
	}
}

/**
 *
 */
function getURL(tab) {
	return tab.url;
}
