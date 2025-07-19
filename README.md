# Power Automate Test Automation Extensions

Automatiseer de 5-klik workflow in Power Automate met één klik! Beschikbaar voor zowel **Chrome** als **Firefox**.

## 🚀 Snel Starten

### Chrome Extension
- **Installatie**: [Chrome Web Store](https://chrome.google.com/webstore) (binnenkort beschikbaar)
- **Direct gebruik**: Klik op het icoon in de toolbar → "Start Automation"

### Firefox Add-on
- **Installatie**: [Firefox Add-ons](https://addons.mozilla.org) (binnenkort beschikbaar)  
- **Direct gebruik**: Klik op het icoon in de toolbar voor directe activatie

## 📁 Project Structuur

```
Power-Automate-Automation/
├── Chrome/           # Chrome Extension (Manifest V3)
├── Firefox/          # Firefox Add-on (Manifest V2)
├── README.md         # Deze algemene README
└── INSTALL.md        # Gedetailleerde installatie-instructies
```

## ⚡ Automatisatie Workflow

De extensie automatiseert deze 5 stappen:
1. **Test** knop detecteren
2. **Manually** optie selecteren
3. **Save & Test** of **Test** knop klikken
4. **Run flow** bevestigen
5. **Done** afronden

## 🎯 Features

| Feature | Chrome | Firefox |
|---------|--------|---------|
| **Manifest versie** | V3 | V2 |
| **Installatie** | Chrome Web Store | Firefox Add-ons |
| **Activatie** | Via popup | Directe klik |
| **Websites** | make.powerautomate.com, flow.microsoft.com | make.powerautomate.com, flow.microsoft.com |
| **Detectie snelheid** | 100ms | 100ms |
| **Parallel detectie** | ✅ | ✅ |

## 🔧 Installatie voor Ontwikkelaars

### Chrome Extension
```bash
# Chrome-extensie laden
1. Ga naar chrome://extensions/
2. Zet "Ontwikkelaarsmodus" aan
3. Klik "Uitgebreid laden" → selecteer de Chrome/ map
```

### Firefox Add-on
```bash
# Firefox add-on laden
1. Ga naar about:debugging
2. Klik "Deze Firefox"
3. Klik "Tijdelijke add-on laden" → selecteer Firefox/manifest.json
```

## 🛠️ Technische Details

### Browser Compatibility
- **Chrome**: Manifest V3 met service workers
- **Firefox**: Manifest V2 met background scripts
- **Detectie**: Promise.race() voor optimale prestaties (100ms)

### Bestandsstructuur
```
Chrome/
├── manifest.json      # Chrome Manifest V3
├── service_worker.js  # Service worker
├── auto_run.js        # Content script
└── popup.html         # Popup interface

Firefox/
├── manifest.json      # Firefox Manifest V2
├── background.js      # Background script
├── firefox-content.js # Content script
└── README.md          # Firefox-specifieke instructies
```

## 📋 Vereisten

- **Chrome**: Versie 88+ (voor Manifest V3 support)
- **Firefox**: Versie 109+ (voor moderne API's)

## 🤝 Bijdragen

1. Fork dit project
2. Maak een feature branch
3. Commit je wijzigingen
4. Push naar de branch
5. Open een Pull Request

## 📄 Licentie

MIT License - zie [LICENSE](LICENSE) voor details.

## 🆘 Ondersteuning

- **Issues**: [GitHub Issues](https://github.com/jouwnaam/power-automate-automation/issues)
- **Discussions**: [GitHub Discussions](https://github.com/jouwnaam/power-automate-automation/discussions)

---

**Gemaakt met ❤️ voor Power Automate gebruikers**