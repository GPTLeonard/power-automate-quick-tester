// Power Automate Automation Script - Correct Button Detection
// Fixes the issue where it finds the wrong Test button

console.log('🚀 Power Automate automation started...');

// Smart wait function that checks for enabled state
function waitForEnabled(selector, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const check = () => {
      const element = document.querySelector(selector);
      if (element && element.offsetParent !== null && !element.disabled && !element.hasAttribute('aria-disabled')) {
        resolve(element);
        return;
      }
      
      if (Date.now() - startTime > timeout) {
        reject(new Error(`Timeout waiting for enabled: ${selector}`));
        return;
      }
      
      setTimeout(check, 100);
    };
    
    check();
  });
}

// Find button by exact text content in the footer panel
async function findFooterButtonByText(text, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const check = () => {
      // Look specifically in footer buttons
      const footerButtons = document.querySelectorAll('.ba-Panel-footerButton, [class*="footerButton"]');
      
      for (const button of footerButtons) {
        if (button.offsetParent !== null && !button.disabled && !button.hasAttribute('aria-disabled')) {
          const labelSpan = button.querySelector('span[class*="label-"]');
          const buttonText = labelSpan ? labelSpan.textContent.trim() : button.textContent.trim();
          
          if (buttonText === text) {
            console.log(`🎯 Found footer button: ${text}`);
            resolve(button);
            return;
          }
        }
      }
      
      // Also check regular buttons as fallback
      const allButtons = document.querySelectorAll('button');
      for (const button of allButtons) {
        if (button.offsetParent !== null && !button.disabled && !button.hasAttribute('aria-disabled')) {
          const labelSpan = button.querySelector('span[class*="label-"]');
          const buttonText = labelSpan ? labelSpan.textContent.trim() : button.textContent.trim();
          
          if (buttonText === text) {
            console.log(`🎯 Found button: ${text}`);
            resolve(button);
            return;
          }
        }
      }
      
      if (Date.now() - startTime > timeout) {
        reject(new Error(`Button "${text}" not found`));
        return;
      }
      
      setTimeout(check, 100);
    };
    
    check();
  });
}

// Find Manually option
async function clickManuallyOption() {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const check = () => {
      const labels = document.querySelectorAll('label');
      for (const label of labels) {
        if (label.textContent.includes('Manually') && label.offsetParent !== null) {
          console.log('✅ Clicking Manually option');
          label.click();
          resolve(label);
          return;
        }
      }
      
      if (Date.now() - startTime > 5000) {
        reject(new Error('Manually option not found'));
        return;
      }
      
      setTimeout(check, 100);
    };
    
    check();
  });
}

// Main automation sequence - corrected button detection
(async () => {
  try {
    console.log('📋 Starting corrected automation...');
    
    // Step 1: Click Test button (top-right) - wait until enabled
    console.log('Step 1: Clicking Test button...');
    const testButton = await waitForEnabled('button[aria-label="Test"]');
    testButton.click();
    console.log('✅ Clicked Test button');
    
    // Step 2: Click Manually option
    console.log('Step 2: Clicking Manually option...');
    await clickManuallyOption();
    
    // Step 3: Wait for the NEW button that appears in the footer
    console.log('Step 3: Waiting for new footer button...');
    
    // After clicking Manually, wait for the new button in the footer panel
    let clickedButton = null;
    try {
      // First try Save & Test (when not saved yet)
      clickedButton = await findFooterButtonByText('Save & Test', 10000);
      console.log('✅ Found Save & Test button');
    } catch (e) {
      // Then try Test (when already saved)
      clickedButton = await findFooterButtonByText('Test', 10000);
      console.log('✅ Found Test button');
    }
    
    if (clickedButton) {
      clickedButton.click();
      console.log(`✅ Successfully clicked ${clickedButton.textContent.trim()} button`);
    }
    
    // Step 4: Wait for Run flow button
    console.log('Step 4: Waiting for Run flow button...');
    const runFlowButton = await findFooterButtonByText('Run flow', 30000);
    runFlowButton.click();
    console.log('✅ Clicked Run flow button');
    
    // Step 5: Wait for Done button
    console.log('Step 5: Waiting for Done button...');
    const doneButton = await findFooterButtonByText('Done', 30000);
    doneButton.click();
    console.log('✅ Clicked Done button');
    
    console.log('🎉 Power Automate automation completed successfully!');
    console.log('🔒 Automation script will now stop to prevent background running');
    
  } catch (error) {
    console.error('❌ Automation failed:', error);
    console.log('💡 Use debug-selector.js in console for troubleshooting');
  }
})();