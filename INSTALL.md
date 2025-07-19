# Installatie Handleiding - Power Automate Quick-Tester

## Stap 1: Extensie Bestanden Downloaden
Zorg dat je alle bestanden in één map hebt:
- manifest.json
- service_worker.js
- auto_run.js
- README.md
- icon16.png (16x16 pixels)
- icon32.png (32x32 pixels)
- icon48.png (48x48 pixels)
- icon128.png (128x128 pixels)

## Stap 2: Icons Genereren
1. Open het bestand `generate-icons.html` in je browser
2. Klik met rechts op elk icoon
3. Kies "Afbeelding opslaan als..." 
4. Sla op als:
   - icon16.png (16x16)
   - icon32.png (32x32)
   - icon48.png (48x48)
   - icon128.png (128x128)

## Stap 3: Extensie Installeren in Chrome
1. Open Google Chrome
2. Ga naar `chrome://extensions/`
3. Schakel **"Developer mode"** in (schuifknop rechtsboven)
4. Klik op **"Load unpacked"**
5. Selecteer de map met alle extensie-bestanden
6. De extensie verschijnt nu in je extensie-lijst

## Stap 4: Extensie Pinning
1. Klik op het extensie-puzzelstukje in de Chrome toolbar
2. Vind "Power Automate Quick-Tester"
3. Klik op het pin-icoon om het vast te pinnen

## Stap 5: Testen
1. Ga naar een Power Automate flow op `https://make.powerautomate.com`
2. Klik op het extensie-icoon
3. De automatisering start direct!

## Problemen oplossen
- **Extensie werkt niet**: Controleer of je op make.powerautomate.com zit
- **Icons ontbreken**: Gebruik generate-icons.html om ze te maken
- **Permissie fout**: Herlaad de extensie via chrome://extensions/