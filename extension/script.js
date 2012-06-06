/*
 * Copyright (c) 2012 Jose María Chumo Mata. All rights reserved.
 * Use of this source code is governed by a 3-clause BSD license that can be
 * found in the LICENSE file.
 */


/**
 * Store the list of URLs
 */
var url_list = {'this':[], 'others':[]};


/**
 * Join the two URL list into one:
 */
function joinURLLists() {
	var ans = url_list['this'];

	// don't add dupes
	ans = ans.concat(url_list['others'].filter(function(elem, index, array) {
				return ans.indexOf(elem) == -1;
			})
		);

	return ans;

}


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

	box.value = filterURLs().join('\n');

	if(document.getElementById('clipboard').checked) {
		// select text
		box.select();
		// cut it
		document.execCommand('cut');
	}
}


function filterURLs() {
	var patterns = document.getElementById('filter').value.trim(); // TODO

	if(patterns == '') { // no patterns bro!
		if(document.getElementById('allWindows').checked)
			return joinURLLists();
		else
			return url_list['this'];
	}

	patterns = patterns.split(/\s/);

	var len = patterns.length;
	patterns = patterns.filter(function(elem, index, array) {
		return elem.toLowerCase() != ":all:";
	});

	var unfiltered = url_list['this'];
	// TODO choose one
	// if :all: has been removed or the checkbox y checked
	if(len != patterns.length || document.getElementById('allWindows').checked) {
		document.getElementById('allWindows').checked = true; // in case it's not set
		len = patterns.lenght;
		unfiltered = joinURLLists();
	}

	patterns = patterns.filter(function(elem, index, array) {
		return elem.toLowerCase() != ":clipboard:";
	});

	// TODO choose one (boxes or patterns)
	if(!document.getElementById('clipboard').checked) {
		document.getElementById('clipboard').checked = len != patterns.length;
	}

	if(patterns.length == 0)
		return unfiltered;

	var filtered = [];
	patterns.forEach(function(pat, pat_index, pat_array) {
		unfiltered.filter(function(url, url_index, url_array) {
			// keeping only the unmatched this iterates on less items
			if(url.toLowerCase().indexOf(pat.toLowerCase()) != -1 && filtered.indexOf(url) == -1) {
				// do not store url converted to lower case!!!
				// admins may care about case sensitivity. What? I've seen it!
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

