URLnator
===============================

Many times I've wanted to copy the URLs from the pages I had opened to a text
file, and I've always found my self doing it one by one. This may not be a big
issue if there are only a few open tabs, but when you have many it become
tiresome. For this reason (and because I wanted to try chrome.** API too) I
decided to create this extension. The goal is to allow users to:

* Copy all URLs from the current window to a text area or to the clipboard.
* Copy all URLs from all windows to a text area or to the clipboard.
* Get URLs from the text area (or from the clipboard) and open them in
new tabs in the current window.
    + URLs must be separated in different lines.
    + URLs without an scheme (the _whatever://_ at the beginning) are treated as
	  search terms and sent to Google search engine.

Usage
-----

How to do stuff with the thing.

### Controls

Clicking the extension button pops up something like this:

![Popup controls](jmchuma/ChromeExtesionTest/raw/master/img/popup.png "Popup controls")

This is how it works:

* **First checkbox:**
    - Checked: get URLs from tabs in all windows.
    - Unchecked: get URLs from tabs in the current window. 
* **Second checkbox:** allows interaction with the clipboard.
    - Checked: get and put content directly to the clipboard.
    - Unchecked: get and put content in the text area.
* **Textarea:** works as input and output (if the second checkbox is not selected).
* **Open button:** opens new tabs with the URLs and search terms.
* **Copy button:** grabs the URLs from the tabs.

### Collecting URLs

1. Click the extension button.
2. Click the copy button.
3. Do whatever you want with the content.

**WARNING**: anything stored in textarea (and in the clipboard if the second checkbox is selected) is deleted!


### Opening URLs

1. Click the extension button.
2. Write some URLs in the text area. Separated with new lines, please.
3. Click the open button.
4. Enjoy!

**WARNING**: anything stored in the text area is deleted!

