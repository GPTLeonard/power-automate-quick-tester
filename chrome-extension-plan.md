# Power Automate Quick-Tester Chrome Extension Plan

## Project Overview
A Chrome extension that automates the 5-click sequence in Power Automate's test workflow:
1. Click "Test" button (top-right)
2. Click "Manually" option
3. Click "Test" or "Save & Test" button
4. Click "Run flow" button
5. Click "Done" button

## Project Structure
```
power-automate-quick-tester/
├── manifest.json          # Extension manifest (MV3)
├── service_worker.js      # Background service worker
├── auto_run.js           # Content script for automation
├── icons/
│   ├── icon16.png        # 16x16 icon
│   ├── icon32.png        # 32x32 icon
│   ├── icon48.png        # 48x48 icon
│   └── icon128.png       # 128x128 icon
└── README.md             # Installation instructions
```

## File Specifications

### 1. manifest.json
- **Purpose**: Extension configuration and permissions
- **Key permissions**: `scripting`, `activeTab`
- **Host permission**: `https://make.powerautomate.com/*`
- **Manifest version**: 3 (latest)

### 2. service_worker.js
- **Purpose**: Handles extension icon click
- **Functionality**: Injects auto_run.js into active tab
- **Trigger**: chrome.action.onClicked event

### 3. auto_run.js
- **Purpose**: Contains automation logic
- **Key features**:
  - Robust element waiting with MutationObserver
  - CSS selectors for stable element targeting
  - Sequential click automation
  - Error handling and timeouts

### 4. Icons
- **Sizes**: 16x16, 32x32, 48x48, 128x128 pixels
- **Format**: PNG with transparency
- **Design**: Simple play button or automation symbol

## Technical Implementation Details

### Element Selection Strategy
Instead of fragile XPaths, use stable CSS selectors:
1. **Test button**: `button[aria-label="Test"]`
2. **Manually option**: `input[value="Manual"], label:contains("Manually")`
3. **Save & Test**: `button:contains("Save & Test"), button:contains("Test")`
4. **Run flow**: `button[aria-label="Run flow"]`
5. **Done**: `button:contains("Done")`

### Error Handling
- 10-second timeout per element
- Console logging for debugging
- Graceful failure with user feedback

### Security Considerations
- Minimal permissions (only activeTab + specific host)
- No external API calls
- No data collection

## Installation Steps
1. Create project directory
2. Add all files with correct content
3. Create simple PNG icons
4. Load extension in Chrome:
   - Open chrome://extensions/
   - Enable Developer mode
   - Click "Load unpacked"
   - Select project directory
5. Pin extension icon to toolbar
6. Test on Power Automate flow

## Testing Checklist
- [ ] Extension loads without errors
- [ ] Icon appears in toolbar
- [ ] Extension only activates on make.powerautomate.com
- [ ] All 5 clicks execute in sequence
- [ ] Handles UI delays gracefully
- [ ] No console errors during execution

## Maintenance Notes
- Update selectors in auto_run.js if Power Automate UI changes
- Test after Power Automate updates
- Keep manifest.json updated for new Chrome versions

## Next Steps
1. Switch to Code mode to create actual files
2. Create basic icons (can be simple colored squares initially)
3. Test locally
4. Package for distribution