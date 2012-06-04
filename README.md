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

Installation
------------

For the time being the extension is not available on Chrome Web Store (and I
don't know if it will ever be) so go to the
[download page](URLinator/downloads "Download page") and grab the latest version.

Usage
-----

How to do stuff with the thing.

### Controls

Clicking the extension button pops up something like this:

![Popup controls](URLinator/raw/master/img/popup.png "Popup controls")

This is how it works:

* **First checkbox:**
    - Checked: get URLs from tabs in all windows.
    - Unchecked: get URLs from tabs in the current window.
* **Second checkbox:** allows interaction with the clipboard.
    - Checked: get and put content directly to the clipboard.
    - Unchecked: get and put content in the text area.
* **Filter box:** allows to use words as filters when retrieving or opening URLs.
    - **:all:** is a special terms. If present retrieves URLs from all windows.
	This is just for testing different aproaches to implement this behavioir.
* **Textarea:** works as input and output (if the second checkbox is not selected).
* **Put button:** opens new tabs with the URLs and search terms.
* **Get button:** grabs the URLs from the tabs.
* **Reset button:** reset the controls to their default values.

### Collecting URLs

1. Click the extension button.
2. Add filtering terms if needed
3. Click the copy button.
4. Do whatever you want with the content.

**WARNING**: anything stored in textarea (and in the clipboard if the second checkbox is selected) is deleted!


### Opening URLs

1. Click the extension button.
2. Write some URLs in the text area. Separated with new lines, please.
3. Click the open button.
4. Enjoy!

**WARNING**: anything stored in the text area is deleted!

