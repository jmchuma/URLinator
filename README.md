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

Go to the
[usage](https://github.com/jmchuma/URLinator/wiki/Usage "Wiki::Usage")
page for a brief manual.

[![Available in the Chrome Web Store][1]][2]
[1]: https://developers.google.com/chrome/web-store/images/branding/ChromeWebStore_Badge_v2_206x58.png
[2]: https://chrome.google.com/webstore/detail/urlinator/ijcanhafkhefgadjgpnbgeokcgbaepdi
