# Projekt 24 Website

Website für das Projekt 24 - Nürburgring 24 Stunden Rennprogramm.

## Struktur

```
Projekt24Website/
├── index.html          # Haupt-HTML-Datei
├── styles.css          # CSS-Styling
├── script.js           # JavaScript für Interaktivität
├── .gitlab-ci.yml      # GitLab Pages Konfiguration
└── assets/
    ├── hero/           # Hero-Section Hintergrundbilder (rotieren alle 10 Sekunden)
    │   ├── hero1.jpg
    │   ├── hero2.jpg
    │   ├── hero3.jpg
    │   ├── hero4.jpg
    │   └── hero5.jpg
    ├── about/          # Projekt-Video
    │   └── project-video.mp4
    ├── members/        # Mitglieder-Bilder
    │   ├── member1.jpg
    │   ├── member2.jpg
    │   └── member3.jpg
    ├── gallery/        # Galerie-Bilder (verschiedene Größen)
    │   ├── gallery1.jpg
    │   ├── gallery2.jpg
    │   ├── gallery3.jpg
    │   └── ...
    └── partners/       # Partner-Logos (klickbar)
        ├── partner1.png
        ├── partner2.png
        ├── partner3.png
        └── ...
```

## Website-Sektionen

### Home
- Logo "PROJEKT 24"
- Text: "From Virtual Precision to Real Performance"
- 5 rotierende Hintergrundbilder (alle 10 Sekunden)
- "Mehr erfahren" Button → führt zu "Das ist Projekt 24"

### News
- Zeigt die 3 neuesten Instagram-Posts von @projekt_24h
- **Hinweis:** Für die Instagram-Integration benötigen Sie die Instagram Basic Display API oder einen Service wie EmbedSocial

### Das ist Projekt 24
- Großer Textblock mit Projektbeschreibung
- Auto-Play Video neben dem Text

### Unser Team
- Für jede Person:
  - Ein Bild
  - Liste mit Informationen (Geburtstag, Meisterschaften, etc.)
  - Links zu persönlichen Social Media Accounts (Instagram, LinkedIn)

### Erfolge
- Liste mit Jahr und Serie
- Bestimmte Wörter werden in Gelb hervorgehoben (z.B. "DNLS CC", "Champion")

### Partner
- Partner-Logos als klickbare Links zu deren Websites
- Ersetzt die alte "Sponsoren"-Sektion

### Galerie
- Alle Bilder zusammen (keine Aufteilung Simulation/Real)
- Verschiedene Bildgrößen in einem Masonry-Layout

### Kontakt
- Social Media Links: Instagram, TikTok, Twitch, YouTube, LinkedIn

## Anpassungen

### Hero-Bilder
- Fügen Sie 5 Hintergrundbilder in `assets/hero/` ein (hero1.jpg bis hero5.jpg)
- Diese rotieren automatisch alle 10 Sekunden

### Projekt-Video
- Fügen Sie das Projekt-Video als `assets/about/project-video.mp4` ein
- Das Video spielt automatisch ab (stumm, loop)

### Mitglieder
- Ersetzen Sie die Platzhalter-Namen in `index.html` (Fahrer 1, Fahrer 2, Fahrer 3) mit echten Namen
- Fügen Sie Mitglieder-Bilder in `assets/members/` ein (member1.jpg, member2.jpg, member3.jpg)
- Aktualisieren Sie die Informationen in den Listen (Geburtstag, Meisterschaften, etc.)
- Aktualisieren Sie die Social Media Links für jedes Mitglied

### Erfolge
- Aktualisieren Sie die Erfolge in `index.html` in der Sektion "Erfolge"
- Verwenden Sie `<span class="highlight">Text</span>` für gelb hervorgehobene Wörter

### Partner
- Fügen Sie Partner-Logos in `assets/partners/` ein
- Aktualisieren Sie die Links in `index.html` (href-Attribute der .partner-item Elemente)

### Galerie
- Fügen Sie alle Galerie-Bilder in `assets/gallery/` ein (gallery1.jpg, gallery2.jpg, etc.)
- Die Bilder werden automatisch in verschiedenen Größen angezeigt

### Instagram Feed
- Die Instagram-Integration benötigt eine API-Verbindung
- Optionen:
  1. **Instagram Basic Display API** (offiziell, benötigt App-Registrierung)
  2. **EmbedSocial** oder ähnliche Services
  3. **Manuelle Einbindung** von Instagram Embed-Codes
- Aktuell zeigt die Seite einen Platzhalter

### Social Media Links
- Aktualisieren Sie die Social Media Links in der Kontakt-Sektion mit echten URLs:
  - Instagram: https://instagram.com/projekt_24h
  - TikTok, Twitch, YouTube, LinkedIn

## SEO-Wartung

### Wichtige Dateien für die Suchmaschinenoptimierung

Die Website verwendet mehrere Dateien für die Suchmaschinenoptimierung (SEO), die bei Änderungen aktualisiert werden müssen:

#### `sitemap.xml`
Die Sitemap hilft Suchmaschinen dabei, alle Seiten der Website zu finden und zu indexieren.

**Wann aktualisieren:**
- ✅ Wenn Sie neue Seiten hinzufügen (z.B. neue HTML-Dateien)
- ✅ Wenn Sie bestehende Seiten erheblich ändern (z.B. `impressum.html` aktualisieren)
- ✅ Wenn sich die URL-Struktur ändert
- ✅ Regelmäßig (z.B. monatlich), um das `lastmod`-Datum aktuell zu halten

**Was aktualisieren:**
- `lastmod`: Datum im Format `YYYY-MM-DD` (z.B. `2026-01-20`)
- `changefreq`: Wie oft sich die Seite ändert (`always`, `hourly`, `daily`, `weekly`, `monthly`, `yearly`, `never`)
- `priority`: Wichtigkeit der Seite (0.0 bis 1.0)

**Beispiel:** Wenn Sie das Impressum aktualisieren:
```xml
<url>
    <loc>https://www.projekt-24.org/impressum.html</loc>
    <lastmod>2026-01-25</lastmod>  <!-- Aktuelles Datum setzen -->
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
</url>
```

#### `robots.txt`
Die robots.txt-Datei gibt Suchmaschinen Anweisungen, welche Bereiche der Website gecrawlt werden sollen.

**Wann aktualisieren:**
- ✅ Wenn Sie neue Verzeichnisse hinzufügen, die nicht indexiert werden sollen
- ✅ Wenn sich die Sitemap-URL ändert
- ⚠️ Normalerweise selten notwendig

#### `index.html` - Meta-Tags und Structured Data
Die HTML-Datei enthält wichtige SEO-Elemente im `<head>`-Bereich.

**Wann aktualisieren:**
- ✅ Wenn sich der Titel oder die Beschreibung der Website ändert
- ✅ Wenn sich Team-Mitglieder oder Erfolge ändern (Structured Data aktualisieren)
- ✅ Wenn sich Social Media Accounts ändern
- ✅ Wenn sich Partner ändern

**Wichtige Bereiche:**
- Meta-Tags (`<meta name="description">`, etc.)
- Open Graph Tags (für Social Media)
- Twitter Card Tags
- Schema.org Structured Data (SportsTeam, Organization, WebSite, BreadcrumbList)

**Tipp:** Verwenden Sie die [Google Rich Results Test](https://search.google.com/test/rich-results) Tool, um Ihre Structured Data zu validieren.

### Checkliste nach größeren Änderungen

Nach größeren Änderungen an der Website sollten Sie:

1. ✅ `sitemap.xml` aktualisieren (Datum und ggf. neue URLs)
2. ✅ Structured Data in `index.html` prüfen und aktualisieren
3. ✅ Meta-Beschreibungen prüfen
4. ✅ In Google Search Console die Sitemap erneut einreichen (falls nötig)
5. ✅ Mit dem [Google Rich Results Test](https://search.google.com/test/rich-results) testen

## Deployment

### GitHub Pages

1. **Repository erstellen:**
   - Erstellen Sie ein neues Repository auf GitHub
   - Pushen Sie den Code in das Repository

2. **GitHub Pages aktivieren:**
   - Gehen Sie zu: Repository → Settings → Pages
   - Unter "Source" wählen Sie den Branch (meist `main` oder `master`)
   - Wählen Sie `/ (root)` als Verzeichnis
   - Klicken Sie auf "Save"

3. **Website aufrufen:**
   - Ihre Website ist nach ein paar Minuten verfügbar unter:
     - `https://[username].github.io/[repository-name]/`
   - Oder wenn das Repository `[username].github.io` heißt:
     - `https://[username].github.io/`

**Hinweis:** GitHub Pages unterstützt nur statische Websites. Alle Dateien müssen im Root-Verzeichnis oder in einem Unterordner liegen.

### GitLab Pages

Die Website wird automatisch auf GitLab Pages bereitgestellt, wenn Sie den Code in ein GitLab Repository pushen.

## Lokale Entwicklung

Öffnen Sie einfach `index.html` in einem Webbrowser oder nutzen Sie einen lokalen Server:

```bash
# Mit Python
python -m http.server 8000

# Mit Node.js (http-server)
npx http-server
```

Dann öffnen Sie `http://localhost:8000` im Browser.

## Design

- **Hauptfarben:** Gelb (#FFD700) und Schwarz
- **Logo:** Gelber Hintergrund mit schwarzem Text
- **Responsive:** Mobile-optimiert mit Hamburger-Menü
