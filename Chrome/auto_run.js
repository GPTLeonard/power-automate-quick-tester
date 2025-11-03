// Power Automate Automation Script - Correct Button Detection
// Fixes the issue where it finds the wrong Test button

console.log('🚀 Power Automate automation started...');

function normalizeText(text) {
  return text ? text.replace(/\s+/g, ' ').trim().toLowerCase() : '';
}

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
            console.log(`🎯 Found footer button: ${buttonTextRaw ? buttonTextRaw.trim() : text}`);
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
            console.log(`🎯 Found button: ${buttonTextRaw ? buttonTextRaw.trim() : text}`);
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

function findLabelByText(text, root = document) {
  const normalizedTarget = normalizeText(text);
  const labels = root.querySelectorAll('label');
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

function findAncestorWithText(element, text) {
  const normalizedTarget = normalizeText(text);
  let current = element;
  while (current) {
    if (normalizeText(current.textContent || '').includes(normalizedTarget)) {
      return current;
    }
    current = current.parentElement;
  }
  return null;
}

function findRecentTriggerCandidates(container) {
  if (!container) {
    return [];
  }

  const candidates = new Set();
  const textPatterns = [
    /test/,
    /minute/, /hour/, /day/, /second/,
    /running/, /failed/, /succeeded/
  ];

  const possibleElements = container.querySelectorAll('[role="listitem"], [role="option"], label');
  for (const element of possibleElements) {
    if (!isVisible(element)) {
      continue;
    }
    const text = normalizeText(element.textContent);
    if (!text || text.includes('with a recently used trigger') || text.includes('automatically') || text.includes('manually')) {
      continue;
    }

    if (textPatterns.some((pattern) => pattern.test(text))) {
      candidates.add(element.closest('label') || element);
      continue;
    }

    if (element.hasAttribute('data-automation-id') && element.getAttribute('data-automation-id').toLowerCase().includes('recent')) {
      candidates.add(element.closest('label') || element);
    }
  }

  return Array.from(candidates).filter((candidate) => isVisible(candidate));
}

async function clickManuallyOption() {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const check = () => {
      const label = findLabelByText('Manually');
      if (label) {
        console.log('✅ Clicking Manually option');
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
        console.log('✅ Clicking Automatically option');
        label.click();
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

async function selectMostRecentAutomaticTrigger() {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const headerText = 'With a recently used trigger';

    const check = () => {
      const radioLabel = findLabelByText(headerText);
      if (!radioLabel) {
        setTimeout(check, 100);
        return;
      }

      if (radioLabel) {
        const input = radioLabel.querySelector('input[type="radio"]');
        if (input && !input.checked) {
          console.log('✅ Selecting "With a recently used trigger" option');
          radioLabel.click();
        }
      }

      const sectionContainer = findAncestorWithText(radioLabel, headerText) || radioLabel.closest('[role="group"]') || radioLabel.closest('section') || radioLabel.closest('[role="dialog"]') || document;
      const candidates = findRecentTriggerCandidates(sectionContainer);

      if (candidates.length > 0) {
        const [firstCandidate] = candidates;
        console.log(`✅ Selecting recent trigger run: ${firstCandidate.textContent.trim()}`);
        firstCandidate.click();
        resolve(firstCandidate);
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
    console.log('✅ Using automatic trigger');
    return 'automatic';
  } catch (error) {
    console.warn(`⚠️ Automatic trigger unavailable (${error.message}), falling back to manual`);
    await clickManuallyOption();
    return 'manual';
  }
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
    
    // Step 2: Prefer Automatically with recent trigger, fallback to Manually
    console.log('Step 2: Selecting test mode (Automatically preferred)...');
    const mode = await selectTestMode();
    console.log(`🚀 Selected test mode -> ${mode}`);
    
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
      console.log(`✅ Found button: ${clickedButton.textContent.trim()}`);
    } catch (e) {
      // If both fail, try again with longer timeout for whichever appears
      console.log('🔄 First attempt failed, trying longer timeout...');
      try {
        clickedButton = await findFooterButtonByText('Save & Test', 5000);
        console.log('✅ Found Save & Test button (retry)');
      } catch (e2) {
        clickedButton = await findFooterButtonByText('Test', 5000);
        console.log('✅ Found Test button (retry)');
      }
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