# Power Automate Quick-Tester Chrome Extension

Automatiseert het testen van Power Automate flows met één klik!

## Installatie

### Optie 1: Lokale installatie (voor ontwikkeling)
1. Download of clone deze extensie
2. Open Chrome en ga naar `chrome://extensions/`
3. Schakel "Developer mode" in (rechtsboven)
4. Klik op "Load unpacked" en selecteer de map met de extensie
5. Pin het icoon aan je toolbar

### Optie 2: Chrome Web Store (toekomstig)
- Binnenkort beschikbaar in de Chrome Web Store

## Gebruik
1. Ga naar een Power Automate flow op `https://make.powerautomate.com`
2. Klik op het extensie-icoon in de toolbar
3. De extensie voert automatisch uit:
   - Klikt op "Test" (rechtsboven)
   - Selecteert "Manually"
   - Klikt op "Save & Test" of "Test"
   - Klikt op "Run flow"
   - Klikt op "Done"

## Bestanden in deze extensie
- `manifest.json` - Configuratie van de extensie
- `service_worker.js` - Achtergrondscript voor het injecteren van de automatisering
- `auto_run.js` - Het script dat de klikken uitvoert
- `icon*.png` - Icoontjes voor de extensie

## Problemen oplossen
- Controleer of je op de juiste Power Automate pagina zit (make.powerautomate.com)
- Open de browser console (F12) om foutmeldingen te zien
- Herlaad de pagina en probeer opnieuw

## Veiligheid
Deze extensie heeft minimale rechten:
- Alleen toegang tot make.powerautomate.com
- Geen toegang tot persoonlijke gegevens
- Geen externe verbindingen