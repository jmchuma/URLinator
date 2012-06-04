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
				var id = 'this';
				if(tab.windowId != currentWindow.id) {
					id = 'others';
				}

				if(url_list[id].indexOf(tab.url) == -1) {
					url_list[id].push(tab.url);
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

	box.value.split(/\s/).forEach(function(url) {
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

	/*if(document.getElementById('allWindows').checked) {
		box.value = url_list['this'].join('\n')+'\n'+url_list['others'].join('\n');
	} else {
		box.value = url_list['this'].join('\n');
	}/**/
	box.value = filterURLs().join('\n');

	//console.log("text area value:\n%s", box.value);

	if(document.getElementById('clipboard').checked) {
		// select text
		box.select();
		// cut it
		document.execCommand('cut');
	}
}


function filterURLs() {
	var patterns = document.getElementById('filter').value.trim(); // TODO

	if(patterns == '')
		//return null; // no patterns bro!
		return url_list['this'];

	//console.log("Patterns is not empty");

	patterns = patterns.split(/\s/);

	var len = patterns.length;
	//console.log("patterns.lenght is "+len);
	//console.log(patterns);
	patterns = patterns.filter(function(element, index, array){
		//console.log(element+".toLowerCase() != \":all:\" =>"+(element.toLowerCase() != ":all:"));
		return element.toLowerCase() != ":all:";
	});
	//console.log(patterns);

	var unfiltered = url_list['this'];
	if(len != patterns.length) {
		// :all: has been found and removed.
		// let's add URLs from other windows
		//console.log("patterns.lenght is now "+patterns.length);
		//console.log("Adding URLs from other windows");
		len = patterns.lenght;
		unfiltered = unfiltered.concat(url_list['others'].filter(function(element, index, array){
				return unfiltered.indexOf(element) == -1;
			})
		);
	}

	/*patterns = patterns.filter(function(element, index, array){
		return element.toLowerCase() != ":clipboard:";
	});

	var clipboard = len != patterns.length;/**/

	if(patterns.length == 0)
		return unfiltered;

	var filtered = [];
	patterns.forEach(function(pat, pat_index, pat_array){
		unfiltered.filter(function(url, url_index, url_array){
			// only keep the unmatche de iterate on less items
			//console.log("Add "+url+" ? =>"+(url.indexOf(pat) != -1 && filtered.indexOf(url) == -1));
			if(url.indexOf(pat) != -1 && filtered.indexOf(url) == -1) {
				filtered.push(url);
				return false;
			}
			return true;
		});
	});

	return filtered;
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

