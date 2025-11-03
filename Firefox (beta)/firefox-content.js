// Firefox content script - Exact same automation as Chrome extension
// Power Automate Automation Script for Firefox

console.log('🦊 Power Automate Firefox add-on loaded...');

function normalizeText(text) {
  return text ? text.replace(/\s+/g, ' ').trim().toLowerCase() : '';
}

// Listen for messages from background script
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startAutomation') {
    console.log('🦊 Firefox add-on: Starting automation...');
    startAutomation();
    sendResponse({ status: 'started' });
  }
});

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
    const normalizedTarget = normalizeText(text);

    const check = () => {
      // Look specifically in footer buttons
      const footerButtons = document.querySelectorAll('.ba-Panel-footerButton, [class*="footerButton"]');

      for (const button of footerButtons) {
        if (button.offsetParent !== null && !button.disabled && !button.hasAttribute('aria-disabled')) {
          const labelSpan = button.querySelector('span[class*="label-"]');
          const buttonTextRaw = labelSpan ? labelSpan.textContent : button.textContent;
          const buttonText = normalizeText(buttonTextRaw);
          const ariaLabel = normalizeText(button.getAttribute('aria-label'));

          if (buttonText === normalizedTarget || buttonText.includes(normalizedTarget) || ariaLabel === normalizedTarget) {
            console.log(`🦊 Found footer button: ${buttonTextRaw ? buttonTextRaw.trim() : text}`);
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
          const buttonTextRaw = labelSpan ? labelSpan.textContent : button.textContent;
          const buttonText = normalizeText(buttonTextRaw);
          const ariaLabel = normalizeText(button.getAttribute('aria-label'));

          if (buttonText === normalizedTarget || buttonText.includes(normalizedTarget) || ariaLabel === normalizedTarget) {
            console.log(`🦊 Found button: ${buttonTextRaw ? buttonTextRaw.trim() : text}`);
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
function isVisible(element) {
  if (!element) {
    return false;
  }
  if (element.offsetParent !== null) {
    return true;
  }
  const style = window.getComputedStyle(element);
  return style && style.position === 'fixed' && style.visibility !== 'hidden' && style.display !== 'none';
}

function findLabelByText(text) {
  const normalizedTarget = normalizeText(text);
  const labels = document.querySelectorAll('label');
  for (const label of labels) {
    if (!isVisible(label)) {
      continue;
    }
    const labelText = normalizeText(label.textContent);
    if (labelText.includes(normalizedTarget)) {
      return label;
    }
  }
  return null;
}

async function clickManuallyOption() {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const check = () => {
      const label = findLabelByText('Manually');
      if (label) {
        console.log('🦊 Clicking Manually option');
        label.click();
        resolve(label);
        return;
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

async function clickAutomaticallyOption() {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const check = () => {
      const label = findLabelByText('Automatically');
      if (label) {
        console.log('🦊 Clicking Automatically option');
        label.click();
        const input = label.querySelector('input[type="radio"]');
        if (input && !input.checked) {
          input.click();
        }
        resolve(label);
        return;
      }

      if (Date.now() - startTime > 5000) {
        reject(new Error('Automatically option not found'));
        return;
      }

      setTimeout(check, 100);
    };

    check();
  });
}

async function clickRecentTriggerModeOption() {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const check = () => {
      const label = findLabelByText('With a recently used trigger');
      if (label) {
        console.log('🦊 Selecting "With a recently used trigger" option');
        label.click();
        const input = label.querySelector('input[type="radio"]');
        if (input && !input.checked) {
          input.click();
        }
        resolve(label);
        return;
      }

      if (Date.now() - startTime > 5000) {
        reject(new Error('Recently used trigger option not found'));
        return;
      }

      setTimeout(check, 100);
    };

    check();
  });
}

function findRecentTriggerCandidates(scope) {
  const selectors = ['label', '[role="radio"]', '[role="option"]', '[role="listitem"]', 'button'];
  const elements = new Set();

  for (const selector of selectors) {
    for (const element of scope.querySelectorAll(selector)) {
      elements.add(element);
    }
  }

  const headerText = normalizeText('With a recently used trigger');

  return Array.from(elements).filter((element) => {
    if (!isVisible(element)) {
      return false;
    }

    const text = normalizeText(element.textContent);
    if (!text) {
      return false;
    }

    if (text === headerText || text === normalizeText('Automatically') || text === normalizeText('Manually')) {
      return false;
    }

    if (text.includes('skip to main content')) {
      return false;
    }

    // Prefer trigger entries that include execution status information
    if (/(test\s+succeeded|test\s+failed|succeeded|minutes? ago|hours? ago|seconds? ago|just now)/.test(text)) {
      return true;
    }

    return false;
  });
}

function findCandidateContainer(label) {
  let current = label.parentElement;
  while (current && current !== document.body) {
    const candidateLabels = current.querySelectorAll('label');
    if (candidateLabels.length > 1) {
      return current;
    }
    current = current.parentElement;
  }
  return document.body;
}

async function selectMostRecentAutomaticTrigger() {
  const modeLabel = await clickRecentTriggerModeOption();
  const container = findCandidateContainer(modeLabel);

  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const check = () => {
      const candidates = findRecentTriggerCandidates(container);
      if (candidates.length > 0) {
        const candidate = candidates[0];
        console.log(`🦊 Selecting recent trigger option: ${candidate.textContent.trim()}`);
        candidate.click();
        resolve(candidate);
        return;
      }

      if (Date.now() - startTime > 7000) {
        reject(new Error('No recent trigger available'));
        return;
      }

      setTimeout(check, 100);
    };

    check();
  });
}

async function selectTestMode() {
  try {
    await clickAutomaticallyOption();
    await selectMostRecentAutomaticTrigger();
    console.log('✅ Firefox: Using automatic trigger');
    return 'automatic';
  } catch (error) {
    console.warn(`⚠️ Firefox: Automatic trigger unavailable (${error.message}), falling back to manual`);
    await clickManuallyOption();
    return 'manual';
  }
}

// Main automation sequence - exact same as Chrome
async function startAutomation() {
  try {
    console.log('🦊 Starting Firefox automation...');
    
    // Step 1: Click Test button (top-right) - wait until enabled
    console.log('Step 1: Clicking Test button...');
    const testButton = await waitForEnabled('button[aria-label="Test"]');
    testButton.click();
    console.log('✅ Firefox: Clicked Test button');
    
    // Step 2: Prefer Automatically with recent trigger, fallback to Manually
    console.log('Step 2: Selecting test mode (Automatically preferred)...');
    const mode = await selectTestMode();
    console.log(`🦊 Firefox: Selected test mode -> ${mode}`);
    
    // Step 3: Wait for the NEW button that appears in the footer
    console.log('Step 3: Waiting for new footer button...');

    // After selecting the test mode, wait for the new button in the footer panel
    let clickedButton = null;

    // Use faster detection with shorter timeout for both buttons
    try {
      // Check for both buttons simultaneously with shorter timeout
      clickedButton = await Promise.race([
        findFooterButtonByText('Save & Test', 2000),
        findFooterButtonByText('Test', 2000)
      ]);
      console.log(`✅ Firefox: Found button: ${clickedButton.textContent.trim()}`);
    } catch (e) {
      // If both fail, try again with longer timeout for whichever appears
      console.log('🔄 Firefox: First attempt failed, trying longer timeout...');
      try {
        clickedButton = await findFooterButtonByText('Save & Test', 5000);
        console.log('✅ Firefox: Found Save & Test button (retry)');
      } catch (e2) {
        clickedButton = await findFooterButtonByText('Test', 5000);
        console.log('✅ Firefox: Found Test button (retry)');
      }
    }
    
    if (clickedButton) {
      clickedButton.click();
      console.log(`✅ Firefox: Successfully clicked ${clickedButton.textContent.trim()} button`);
    }
    
    // Step 4: Wait for Run flow button
    console.log('Step 4: Waiting for Run flow button...');
    const runFlowButton = await findFooterButtonByText('Run flow', 30000);
    runFlowButton.click();
    console.log('✅ Firefox: Clicked Run flow button');
    
    // Step 5: Wait for Done button
    console.log('Step 5: Waiting for Done button...');
    const doneButton = await findFooterButtonByText('Done', 30000);
    doneButton.click();
    console.log('✅ Firefox: Clicked Done button');
    
    console.log('🎉 Firefox add-on: Power Automate automation completed successfully!');
    console.log('🔒 Firefox add-on: Automation script will now stop to prevent background running');
    
  } catch (error) {
    console.error('❌ Firefox add-on: Automation failed:', error);
    console.log('💡 Firefox add-on: Use browser console for troubleshooting');
  }
}

// Auto-start when on Power Automate domain (optional)
if (window.location.hostname.includes('make.powerautomate.com') || 
    window.location.hostname.includes('flow.microsoft.com')) {
  console.log('🦊 Firefox add-on: Detected Power Automate domain');
}