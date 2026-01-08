# Instagram Feed Integration

Die News-Sektion zeigt die 3 neuesten Instagram-Posts von @projekt_24h an.

## Implementierung: Instagram oEmbed API (Keine Credentials erforderlich!)

Die aktuelle Implementierung verwendet Instagram's **öffentliche oEmbed API**, die keine Authentifizierung oder Credentials benötigt. Sie müssen lediglich die URLs der Posts hinzufügen, die angezeigt werden sollen.

### Vorteile dieser Lösung

✅ **Keine API-Credentials** - Perfekt für öffentliche GitHub-Repositories  
✅ **Kostenlos** - Instagram oEmbed API ist öffentlich und kostenlos  
✅ **Einfach zu aktualisieren** - Einfach neue Post-URLs hinzufügen  
✅ **Offizielle Instagram-Embeds** - Verwendet Instagram's offizielle Embed-Funktion  

### So fügen Sie neue Posts hinzu

#### Schritt 1: Instagram Post URL kopieren

1. Öffnen Sie den Instagram-Post, den Sie anzeigen möchten
2. Klicken Sie auf die drei Punkte (⋯) oben rechts
3. Wählen Sie "Link kopieren"
4. Die URL sieht so aus: `https://www.instagram.com/p/ABC123xyz/`

#### Schritt 2: URL in script.js hinzufügen

1. Öffnen Sie `script.js`
2. Suchen Sie nach der Funktion `loadInstagramFeed()`
3. Finden Sie das Array `instagramPostUrls`:

```javascript
const instagramPostUrls = [
    // Add your 3 most recent Instagram post URLs here
    // 'https://www.instagram.com/p/POST_ID_1/',
    // 'https://www.instagram.com/p/POST_ID_2/',
    // 'https://www.instagram.com/p/POST_ID_3/',
];
```

4. Fügen Sie die Post-URLs hinzu (neueste zuerst):

```javascript
const instagramPostUrls = [
    'https://www.instagram.com/p/NEUESTER_POST_ID/',
    'https://www.instagram.com/p/ZWEITNEUESTER_POST_ID/',
    'https://www.instagram.com/p/DRITTNEUESTER_POST_ID/',
];
```

5. Speichern Sie die Datei

#### Schritt 3: Testen

1. Öffnen Sie die Website im Browser
2. Die Instagram-Posts sollten automatisch geladen werden
3. Die Posts werden in der News-Sektion angezeigt

### Wichtige Hinweise

- **Maximal 3 Posts**: Es werden nur die ersten 3 URLs aus dem Array angezeigt
- **Neueste zuerst**: Fügen Sie die neuesten Posts am Anfang des Arrays hinzu
- **Öffentliche Posts**: Nur öffentliche Instagram-Posts können eingebettet werden
- **Manuelle Aktualisierung**: Wenn ein neuer Post veröffentlicht wird, fügen Sie die URL manuell hinzu

### Beispiel: Neuen Post hinzufügen

Angenommen, Sie haben bereits 3 Posts konfiguriert:

```javascript
const instagramPostUrls = [
    'https://www.instagram.com/p/ABC123/',
    'https://www.instagram.com/p/DEF456/',
    'https://www.instagram.com/p/GHI789/',
];
```

Wenn ein neuer Post veröffentlicht wird (`https://www.instagram.com/p/XYZ999/`), fügen Sie ihn am Anfang hinzu:

```javascript
const instagramPostUrls = [
    'https://www.instagram.com/p/XYZ999/',  // Neuer Post
    'https://www.instagram.com/p/ABC123/',
    'https://www.instagram.com/p/DEF456/',
    // GHI789 wird nicht mehr angezeigt (nur 3 Posts)
];
```

### Fehlerbehebung

**Problem: Posts werden nicht angezeigt**

- Überprüfen Sie, ob die URLs korrekt sind (müssen mit `https://www.instagram.com/p/` beginnen)
- Stellen Sie sicher, dass die Posts öffentlich sind
- Öffnen Sie die Browser-Konsole (F12) und prüfen Sie auf Fehlermeldungen

**Problem: "Failed to fetch embed"**

- Überprüfen Sie, ob die Post-URL korrekt ist
- Stellen Sie sicher, dass der Post noch existiert und öffentlich ist
- Versuchen Sie, die URL direkt im Browser zu öffnen

**Problem: Posts laden langsam**

- Die Instagram-Embeds werden von Instagram's Servern geladen
- Dies ist normal und kann bei langsamer Internetverbindung etwas dauern

### Technische Details

Die Implementierung verwendet:
- **Instagram oEmbed API**: `https://api.instagram.com/oembed?url=POST_URL`
- **Instagram Embed Script**: Wird automatisch geladen von `https://www.instagram.com/embed.js`
- **Keine Backend-Erfordernisse**: Alles läuft clientseitig im Browser

### Alternative: Automatische Updates

Falls Sie in Zukunft automatische Updates wünschen (ohne manuelles Hinzufügen), können Sie:
- Einen Backend-Service einrichten, der die neuesten Posts automatisch abruft
- Die Instagram Graph API verwenden (erfordert jedoch Credentials)
- Einen Drittanbieter-Service wie EmbedSocial oder Juicer verwenden

## Aktuelle Implementierung

Die Implementierung ist in `script.js` in der Funktion `loadInstagramFeed()` enthalten. Fügen Sie einfach die Post-URLs zum `instagramPostUrls` Array hinzu, um Posts anzuzeigen.
