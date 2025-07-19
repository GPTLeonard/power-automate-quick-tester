# Power Automate Test Automation Extensions

Automatiseer de 5-klik workflow in Power Automate met één klik! Beschikbaar voor zowel **Chrome** als **Firefox**.

## 🚀 Direct Downloaden

### Chrome Extension
📥 **[Download Chrome Extension](https://github.com/GPTLeonard/power-automate-quick-tester/archive/refs/heads/main/Chrome.zip)**

### Firefox Add-on (Beta)
📥 **[Download Firefox Add-on (Beta)](https://github.com/GPTLeonard/power-automate-quick-tester/archive/refs/heads/main/Firefox%20%28beta%29.zip)**

## 📁 Project Structuur

```
Power-Automate-Automation/
├── Chrome/           # Chrome Extension (Manifest V3) ✅ Voltooid
├── Firefox (beta)/   # Firefox Add-on (Manifest V2) ⚠️ In ontwikkeling
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

| Feature | Chrome | Firefox (Beta) |
|---------|--------|----------------|
| **Status** | ✅ **Voltooid** | ⚠️ **In ontwikkeling** |
| **Manifest versie** | V3 | V2 |
| **Activatie** | Via popup | Directe klik |
| **Websites** | make.powerautomate.com, flow.microsoft.com | make.powerautomate.com, flow.microsoft.com |
| **Detectie snelheid** | 100ms | 100ms (theoretisch) |
| **Parallel detectie** | ✅ | ✅ (theoretisch) |

## 🔧 Installatie na Download

### Chrome Extension
1. Download: [Chrome Extension](https://github.com/GPTLeonard/power-automate-quick-tester/archive/refs/heads/main/Chrome.zip)
2. Pak uit en ga naar `chrome://extensions/`
3. Zet "Ontwikkelaarsmodus" aan
4. Klik "Uitgebreid laden" → selecteer de uitgepakte Chrome/ map

### Firefox Add-on (Beta)
1. Download: [Firefox Add-on (Beta)](https://github.com/GPTLeonard/power-automate-quick-tester/archive/refs/heads/main/Firefox%20%28beta%29.zip)
2. Pak uit en ga naar `about:debugging`
3. Klik "Deze Firefox"
4. Klik "Tijdelijke add-on laden" → selecteer uitgepakte 'Firefox (beta)'/manifest.json
⚠️ Let op: Nog niet volledig getest!

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

Firefox (beta)/
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

- **Issues**: [GitHub Issues](https://github.com/GPTLeonard/power-automate-quick-tester/issues)
- **Discussions**: [GitHub Discussions](https://github.com/GPTLeonard/power-automate-quick-tester/discussions)

---

**Gemaakt met ❤️ voor Power Automate gebruikers**