# Power Automate Quick-Tester - Firefox Add-on

Firefox add-on voor één-klik Power Automate flow testing automatisering.

## Installatie in Firefox

### Methode 1: Als tijdelijke add-on (voor ontwikkeling)
1. Open Firefox
2. Ga naar `about:debugging`
3. Klik op "This Firefox"
4. Klik op "Load Temporary Add-on"
5. Selecteer het `manifest.json` bestand uit de Firefox map

### Methode 2: Als ondertekende add-on (productie)
1. Zip de Firefox map (alle bestanden in de Firefox map)
2. Upload naar [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/)
3. Volg de review process

## Werking

Deze Firefox add-on werkt **exact hetzelfde** als de Chrome extension:

1. **Navigeer naar** make.powerautomate.com
2. **Klik direct op het add-on icoon** in de toolbar (geen popup!)
3. **Automatische 5-klik sequentie**:
   - Test → Manually → Save & Test/Test → Run flow → Done

## Firefox vs Chrome

| Feature | Firefox | Chrome |
|---------|---------|---------|
| **Manifest versie** | V2 (meer flexibel) | V3 |
| **Background script** | Persistent | Service worker |
| **Icon click** | Direct (geen popup) | Direct |
| **Permissions** | Minder strikt | Strikter |
| **CSP** | Minder beperkend | Meer beperkend |

## Bestanden structuur
```
Firefox/
├── manifest.json          # Firefox add-on manifest (V2)
├── background.js          # Background script (directe icon click)
├── firefox-content.js     # Content script (exacte automation logic)
├── icon16.png            # 16x16 icon
├── icon32.png            # 32x32 icon
├── icon48.png            # 48x48 icon
└── icon128.png           # 128x128 icon
```

## Debugging

1. Open Firefox DevTools (F12)
2. Ga naar Console tab
3. Filter op "Firefox add-on" om logs te zien
4. Background script logs: `about:debugging` → This Firefox → Inspect

## Ondersteunde domeinen
- make.powerautomate.com
- flow.microsoft.com

## Technische voordelen Firefox
- **Geen popup nodig** - directe icon click werkt perfect
- **Minder beperkingen** dan Chrome
- **Exact dezelfde automation logic** als Chrome
- **Event-driven** voor optimale prestaties