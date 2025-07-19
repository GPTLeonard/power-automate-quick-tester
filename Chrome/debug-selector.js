// Debug script to find the correct selectors
// Run this in the browser console on a Power Automate page

console.log('=== Power Automate Selector Debug Tool ===');

// Function to find elements by various methods
function findElements() {
  console.log('\n--- Finding Test Button ---');
  
  // Test button selectors
  const testSelectors = [
    'button[aria-label="Test"]',
    'button:contains("Test")',
    'button[data-testid*="test"]',
    'button[title*="Test"]'
  ];
  
  testSelectors.forEach(selector => {
    try {
      const elements = document.querySelectorAll(selector);
      console.log(`${selector}: ${elements.length} elements found`);
      elements.forEach((el, i) => console.log(`  ${i}:`, el));
    } catch (e) {
      console.log(`${selector}: Error - ${e.message}`);
    }
  });
  
  // Find by text content
  const buttons = document.querySelectorAll('button');
  console.log('\n--- Buttons with "Test" text ---');
  buttons.forEach((btn, i) => {
    if (btn.textContent.toLowerCase().includes('test')) {
      console.log(`Button ${i}: "${btn.textContent.trim()}"`, btn);
    }
  });
  
  console.log('\n--- Finding Manually Option ---');
  
  // Manually option selectors based on provided HTML
  const manuallySelectors = [
    'label[for*="choice-invoke-flow"]',
    'span[data-automation-id="test_flow_choice_manual"]',
    'span[aria-label*="Test Flow, Manually"]',
    'label:has(span[aria-label*="Manually"])'
  ];
  
  manuallySelectors.forEach(selector => {
    try {
      const elements = document.querySelectorAll(selector);
      console.log(`${selector}: ${elements.length} elements found`);
      elements.forEach((el, i) => console.log(`  ${i}:`, el));
    } catch (e) {
      console.log(`${selector}: Error - ${e.message}`);
    }
  });
  
  // Find by text content
  const labels = document.querySelectorAll('label');
  console.log('\n--- Labels with "Manually" text ---');
  labels.forEach((label, i) => {
    if (label.textContent.includes('Manually')) {
      console.log(`Label ${i}: "${label.textContent.trim()}"`, label);
    }
  });
  
  console.log('\n--- All visible buttons ---');
  buttons.forEach((btn, i) => {
    if (btn.offsetParent !== null) {
      console.log(`Visible button ${i}: "${btn.textContent.trim()}"`, btn);
    }
  });
}

// Function to test clicking specific elements
function testClick(text) {
  const elements = document.querySelectorAll('*');
  for (const el of elements) {
    if (el.textContent && el.textContent.includes(text) && el.offsetParent !== null) {
      console.log(`Found element with text "${text}":`, el);
      el.click();
      console.log('Clicked!');
      break;
    }
  }
}

// Run the debug
findElements();

// Make functions available globally
window.powerAutomateDebug = {
  findElements,
  testClick
};

console.log('\n=== Debug functions available ===');
console.log('powerAutomateDebug.findElements() - Find all relevant elements');
console.log('powerAutomateDebug.testClick("Manually") - Test clicking Manually');
console.log('powerAutomateDebug.testClick("Test") - Test clicking Test');