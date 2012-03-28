/*
 * Copyright (c) 2012 Jose María Chumo Mata. All rights reserved.
 * Use of this source code is governed by a 3-clause BSD license that can be
 * found in the LICENSE file.
 */


/**
 * Store the list of URLs
 */
var url_list = {'this':[], 'others':[]};
// TODO: another array to get the URLs?
//var urls_in


/**
 * Translate text in the popup interface
 */
function i18nalize() {
	var objects = document.getElementsByTagName('*');

	for(var i = 0; i < objects.length; i++) {
		// to understand this see HTML5 custom attributes
		if(objects[i].dataset && objects[i].dataset.i18nId) {
			objects[i].innerText = chrome.i18n.getMessage(objects[i].dataset.i18nId);
		}
	}

	document.getElementById('filter').placeholder = chrome.i18n.getMessage('filterPlaceholder');
	document.getElementById('urls').placeholder = chrome.i18n.getMessage('textareaPlaceholder');
}


/**
 * Populate the lists containing the URLs from tabs
 */
function URLsFromTabs() {
	chrome.windows.getCurrent(function(currentWindow) {
		chrome.tabs.query({}, function(tabs) {
			tabs.forEach(function(tab) {
				if(tab.windowId == currentWindow.id) {
					url_list['this'].push(tab.url);
				} else {
					url_list['others'].push(tab.url);
				}
			});
		});
	});
}


/**
 * Copies URL from clipboard to tabs
 */
function boardToTabs() {
	var box = document.getElementById('urls');

	if(document.getElementById('clipboard').checked) {
		// clear content just in case?
		box.value = '';
		// WARNING: according to https://developer.mozilla.org/en/DOM/HTMLTextAreaElement
		//			the focus method is obselete.
		// TODO: seek another way to focus on the textarea.
		box.focus();
		//box.autofocus = true;
		document.execCommand('paste');
	}

	box.value.split('\n').forEach(function(url) {
		url = url.trim();
		if(url != "") {
			// check it it contains the URL schema
			if(url.search('^[a-zA-Z]+://') == -1) {
				url = "http://www.google.com/#q="+url;
			}
			chrome.tabs.create({'url': url.trim(), 'active': false});
		}
	});

	box.value = '';
}


/**
 * Copies URL from tabs to clipboard
 */
function tabsToBoard() {
	var box = document.getElementById('urls');
	var filter = document.getElementById('filter'); // TODO

	//console.log("url_list has %d elements", url_list.length);

	if(document.getElementById('allWindows').checked) {
		box.value = url_list['this'].join('\n')+'\n'+url_list['others'].join('\n');
	} else {
		box.value = url_list['this'].join('\n');
	}

	//console.log("text area value:\n%s", box.value);

	if(document.getElementById('clipboard').checked) {
		// select text
		box.select();
		// cut it
		document.execCommand('cut');
	}
}


/**
 * Add an event listener for the onload event y the HTML.
 */
document.addEventListener('DOMContentLoaded', function() {
	/* Since all this is asyncrhonous is better to do it here.
	 * This way the URL list will be ready if needed.
	 */
	URLsFromTabs();

	i18nalize();
	document.getElementById('open').addEventListener('click', boardToTabs);
	document.getElementById('copy').addEventListener('click', tabsToBoard);
});

