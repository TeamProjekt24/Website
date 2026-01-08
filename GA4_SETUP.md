# Google Analytics 4 Setup Instructions

## DSGVO-Compliant Implementation

This website uses Google Analytics 4 with DSGVO-compliant cookie consent management.

## Setup Steps

### 1. Get Your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property or select an existing one
3. Go to **Admin** → **Data Streams** → Select your web stream
4. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Update the Measurement ID

Replace `G-XXXXXXXXXX` with your actual Measurement ID in the following files:

#### `index.html` (around line 310)
```javascript
window.GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 Measurement ID
```

#### `impressum.html` (around line 350)
```javascript
window.GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 Measurement ID
```

### 3. Configure GA4 Settings

In your Google Analytics dashboard:

1. Go to **Admin** → **Data Settings** → **Data Collection**
2. Enable **IP anonymization** (already handled in code, but verify in GA4)
3. Go to **Admin** → **Data Settings** → **Data Retention**
4. Set data retention to **2 months** or **14 months** (DSGVO recommendation)

### 4. Data Processing Agreement

1. Go to **Admin** → **Account Settings** → **Data Processing Amendment**
2. Accept the Data Processing Amendment with Google
3. This is required for DSGVO compliance

### 5. Test the Implementation

1. Clear your browser cookies
2. Visit your website
3. You should see the cookie consent banner
4. Accept analytics cookies
5. Check Google Analytics Real-Time reports to verify data is being collected

## Features

✅ **DSGVO Compliant**
- Cookie consent banner before any tracking
- Granular consent options (Analytics, Marketing)
- IP anonymization enabled
- Consent mode v2 implemented

✅ **User-Friendly**
- Clear cookie banner with options
- Detailed settings modal
- Cookie preferences saved for 365 days
- Easy access to change settings via footer link

✅ **Technical Implementation**
- Google Consent Mode v2
- Dynamic script loading (only after consent)
- Proper cookie management
- Works across all pages

## Important Notes

- **Never load GA4 before consent** - The implementation ensures GA4 only loads after user consent
- **IP Anonymization** - Already enabled in the code (DSGVO requirement)
- **Consent Mode** - Uses Google Consent Mode v2 for proper consent handling
- **Cookie Expiry** - Consent preferences are saved for 365 days
- **Legal Compliance** - Make sure your Impressum/Datenschutzerklärung matches this implementation

## Troubleshooting

### GA4 not tracking
- Check that you've replaced `G-XXXXXXXXXX` with your actual Measurement ID
- Verify consent was given (check browser cookies for `cookie_consent`)
- Check browser console for errors
- Verify GA4 Real-Time reports

### Cookie banner not showing
- Clear browser cookies and refresh
- Check browser console for JavaScript errors
- Verify `cookie-consent.js` is loaded correctly

### Consent not saving
- Check browser cookie settings (cookies must be enabled)
- Verify no ad blockers are interfering
- Check browser console for errors

