var url_list = new Array();


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
 * Copies URL from clipboard to tabs
 */
function boardToTabs() {
	alert('boardToTabs is not ready yet');
}


/**
 * Copies URL from tabs to clipboard
 */
function tabsToBoard() {
	var box = document.getElementById('urls');

	/*
	chrome.windows.getLastFocused(function(win){
		for(tab in win.tabs) {
			url_list.push(tab.url);
		}
	});
	/**/
	chrome.windows.getAll({populate: true}, function(wins_array){
		wins_array.forEach(function(win) {
			win.tabs.forEach(function(tab) {
				url_list.push(tab.url);
			});
		});
	});

	box.innerHTML = url_list.join('\n');
}

