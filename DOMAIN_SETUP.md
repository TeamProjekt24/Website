# Domain Setup für GitHub Pages mit Strato.de

Diese Anleitung erklärt, wie Sie Ihre bei Strato.de gekaufte Domain mit Ihrer GitHub Pages Website verbinden.

## Schritt 1: CNAME-Datei erstellen

1. Erstellen Sie eine Datei namens `CNAME` (ohne Endung!) im Root-Verzeichnis Ihres Repositories
2. Die Datei sollte nur eine Zeile enthalten: Ihre Domain (z.B. `projekt24.de` oder `www.projekt24.de`)
3. Committen und pushen Sie diese Datei zu GitHub

**Wichtig:** 
- Wenn Sie `www.projekt24.de` verwenden möchten, schreiben Sie `www.projekt24.de` in die CNAME-Datei
- Wenn Sie die Domain ohne www verwenden möchten, schreiben Sie nur `projekt24.de` in die CNAME-Datei
- Sie können auch beide Varianten unterstützen (siehe Schritt 3)

## Schritt 2: GitHub Pages konfigurieren

1. Gehen Sie zu: https://github.com/TeamProjekt24/Website/settings/pages
2. Unter "Custom domain" geben Sie Ihre Domain ein (z.B. `projekt24.de` oder `www.projekt24.de`)
3. Aktivieren Sie "Enforce HTTPS" (empfohlen)
4. Klicken Sie auf "Save"

**Hinweis:** GitHub kann einige Minuten benötigen, um die DNS-Einstellungen zu überprüfen.

## Schritt 3: DNS-Einstellungen bei Strato.de konfigurieren

Loggen Sie sich in Ihr Strato-Kundencenter ein und gehen Sie zu den DNS-Einstellungen Ihrer Domain.

### Option A: Domain mit www (z.B. www.projekt24.de)

Erstellen Sie folgende DNS-Einträge:

1. **A-Record** (für die Root-Domain):
   - Name: `@` oder leer lassen
   - Typ: `A`
   - Wert: `185.199.108.153`
   - TTL: 3600 (oder Standard)

2. **A-Record** (zusätzlich für GitHub Pages):
   - Name: `@` oder leer lassen
   - Typ: `A`
   - Wert: `185.199.109.153`
   - TTL: 3600

3. **A-Record** (dritter Eintrag):
   - Name: `@` oder leer lassen
   - Typ: `A`
   - Wert: `185.199.110.153`
   - TTL: 3600

4. **A-Record** (vierter Eintrag):
   - Name: `@` oder leer lassen
   - Typ: `A`
   - Wert: `185.199.111.153`
   - TTL: 3600

5. **CNAME-Record** (für www):
   - Name: `www`
   - Typ: `CNAME`
   - Wert: `teamprojekt24.github.io`
   - TTL: 3600

### Option B: Domain ohne www (z.B. projekt24.de)

Erstellen Sie die gleichen 4 A-Records wie oben, aber **keinen** CNAME-Record für www.

### GitHub Pages IP-Adressen (Stand 2024):
- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

**Wichtig:** Diese IP-Adressen können sich ändern. Aktuelle IPs finden Sie in der GitHub-Dokumentation: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain

## Schritt 4: Warten auf DNS-Propagierung

Nach dem Konfigurieren der DNS-Einstellungen kann es 24-48 Stunden dauern, bis die Änderungen weltweit propagiert sind. Normalerweise funktioniert es aber schon nach einigen Minuten bis Stunden.

Sie können die DNS-Propagierung überprüfen mit:
- https://dnschecker.org/
- Geben Sie Ihre Domain ein und prüfen Sie, ob die A-Records korrekt sind

## Schritt 5: HTTPS aktivieren

1. Nach erfolgreicher DNS-Propagierung gehen Sie zurück zu: https://github.com/TeamProjekt24/Website/settings/pages
2. Aktivieren Sie "Enforce HTTPS" (falls noch nicht aktiviert)
3. GitHub wird automatisch ein SSL-Zertifikat von Let's Encrypt bereitstellen

**Hinweis:** Das SSL-Zertifikat wird normalerweise innerhalb von 24 Stunden nach erfolgreicher DNS-Konfiguration aktiviert.

## Schritt 6: Beide Varianten unterstützen (Optional)

Wenn Sie sowohl `projekt24.de` als auch `www.projekt24.de` unterstützen möchten:

1. Erstellen Sie die CNAME-Datei mit Ihrer bevorzugten Domain (z.B. `projekt24.de`)
2. Konfigurieren Sie die DNS-Einträge wie oben beschrieben
3. In GitHub Pages können Sie nur eine Domain als "Custom domain" eintragen
4. Die andere Variante wird automatisch weitergeleitet (wenn DNS korrekt konfiguriert ist)

## Troubleshooting

### Problem: Domain wird nicht erkannt
- Warten Sie 24-48 Stunden auf DNS-Propagierung
- Überprüfen Sie die DNS-Einträge mit dnschecker.org
- Stellen Sie sicher, dass die CNAME-Datei im Root-Verzeichnis liegt und korrekt committed wurde

### Problem: HTTPS funktioniert nicht
- Warten Sie bis zu 24 Stunden nach erfolgreicher DNS-Konfiguration
- Überprüfen Sie, ob "Enforce HTTPS" in GitHub Pages aktiviert ist
- Löschen Sie die Custom Domain in GitHub Pages, warten Sie 5 Minuten, und fügen Sie sie erneut hinzu

### Problem: Website lädt nicht
- Überprüfen Sie, ob GitHub Pages aktiviert ist (Settings → Pages → Source)
- Stellen Sie sicher, dass die CNAME-Datei die korrekte Domain enthält
- Überprüfen Sie die DNS-Einträge bei Strato.de

## Nützliche Links

- GitHub Pages Dokumentation: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- Strato DNS-Verwaltung: https://www.strato.de/kundencenter/
- DNS Checker: https://dnschecker.org/
