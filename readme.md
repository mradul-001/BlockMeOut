# BlockMeOut

BlockMeOut is a Chrome extension designed to help users block distracting websites and keywords, enhancing productivity and focus. With an easy-to-use interface, users can add websites and keywords to a blocklist and manage them as needed.

## Features

- Add websites to a blocklist to prevent access.
- Block specific keywords to avoid distractions.
- Simple and intuitive interface for managing blocklists.

## Installation

1. Clone or download the repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" using the toggle switch in the top right corner.
4. Click the "Load unpacked" button and select the directory containing the extension files.

## Usage

1. Click the BlockMeOut icon in the Chrome toolbar to open the popup.
2. Add a website to the blocklist by entering the URL in the input field and clicking "Add to Blocklist".
3. Edit the blocklist by clicking "Edit Blocklist", which opens the options page.
4. The extension will automatically block the websites present in the blacklist or if your search contains a blocked keyword.

## Files

- `manifest.json`: Configuration file for the Chrome extension.
- `popup.html`: HTML file for the popup interface.
- `popup.css`: CSS file for styling the popup interface.
- `popup.js`: JavaScript file for handling the popup logic.
- `options.html`: HTML file for the options page where users can manage the blocklist.
- `options.css`: CSS file for styling the options page.
- `options.js`: JavaScript file for handling the options page logic.
