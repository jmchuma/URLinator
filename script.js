/**
 * Store the list of URLs
 */
var url_list = new Array();


/**
 * Initialize things in the HTML popup:
 *	- Translate interface
 */
function i18nalize() {
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
	//alert('boardToTabs is not ready yet');
	var box = document.getElementById('urls');
	// WARNING: according to https://developer.mozilla.org/en/DOM/HTMLTextAreaElement
	//			the focus method is obselete.
	// TODO: search another way to focus on the textarea.
	box.focus();
	document.execCommand('paste');
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
	// get the URLs from the tabs
	chrome.windows.getAll({populate: true}, function(wins_array){
		wins_array.forEach(function(win) {
			win.tabs.forEach(function(tab) {
				url_list.push(tab.url);
			});
		});
	});

	// the previous call is asynchonous so well wait till it's done
	//while(url_list.length  == 0){}

	console.log("url_list has %d elements", url_list.length);
	box.value = url_list.join('\n');
	console.log("text area value:\n%s", box.value);
	// select the text to reduce steps?
	//box.select();
	// put it directly in the clipboard?
	//document.execCommand('cut');
}

/**
 *
 */
document.addEventListener('DOMContentLoaded', function() {
	i18nalize();
	document.getElementById('open').addEventListener('click', boardToTabs);
	document.getElementById('copy').addEventListener('click', tabsToBoard);
});

