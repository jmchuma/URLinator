URLinator
===============================

Many times I've wanted to copy URLs from opened tabs to a text file, and I've
always found my self doing it one by one. This may not be a big issue if there
are only a few tabs opened, but when you have many it become tiresome. For this
reason (and because I wanted to try chrome.* API) I decided to create URLinator.
The goal is to allow users to:

* Copy all URLs from the current window to a text area or to the clipboard.
* Copy all URLs from all windows to a text area or to the clipboard.
* Get URLs from the text area (or from the clipboard) and open them in
new tabs in the current window.
    + URLs must be separated in different lines.
    + URLs without an scheme (the _whatever://_ at the beginning) are treated as
	  search terms and sent to Google search engine.

In thinking about the clipboard thing so it may or may not be in the final version.

Go to the [download](URLinator/downloads "Download page") page to get the latest
version and to the
[usage](https://github.com/jmchuma/URLinator/wiki/Usage "Wiki::Usage")
page for a brief manual.
