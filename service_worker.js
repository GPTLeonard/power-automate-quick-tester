// Service Worker for Power Automate Quick-Tester
// Handles extension icon click and injects automation script

chrome.action.onClicked.addListener(async (tab) => {
  // Only run on Power Automate URLs
  if (!tab.url.includes('make.powerautomate.com')) {
    console.log('Extension only works on Power Automate');
    return;
  }

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["auto_run.js"]
    });
    console.log('Power Automate automation script injected');
  } catch (error) {
    console.error('Failed to inject script:', error);
  }
});