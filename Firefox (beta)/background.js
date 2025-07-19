// Firefox background script (replaces service_worker.js)
// Firefox uses persistent background scripts instead of service workers

console.log('Power Automate Quick-Tester Firefox add-on loaded');

// Listen for browser action click
browser.browserAction.onClicked.addListener((tab) => {
  console.log('Firefox add-on icon clicked for tab:', tab.url);
  
  // Check if we're on the right domain
  if (tab.url.includes('make.powerautomate.com') || tab.url.includes('flow.microsoft.com')) {
    // Send message to content script
    browser.tabs.sendMessage(tab.id, { action: 'startAutomation' })
      .then(response => {
        console.log('Firefox add-on: Automation started', response);
      })
      .catch(error => {
        console.error('Firefox add-on: Error starting automation:', error);
      });
  } else {
    console.log('Firefox add-on: Not on Power Automate domain');
  }
});

// Handle installation
browser.runtime.onInstalled.addListener(() => {
  console.log('Power Automate Quick-Tester Firefox add-on installed');
});