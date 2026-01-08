// Cookie Consent Management
// DSGVO-compliant cookie consent system with Google Analytics 4 integration

// Cookie names
const COOKIE_CONSENT_NAME = 'cookie_consent';
const COOKIE_EXPIRY_DAYS = 365;

// Get cookie value
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Set cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
}

// Get consent preferences
function getConsentPreferences() {
    const consentCookie = getCookie(COOKIE_CONSENT_NAME);
    if (consentCookie) {
        try {
            return JSON.parse(decodeURIComponent(consentCookie));
        } catch (e) {
            console.error('Error parsing consent cookie:', e);
            return null;
        }
    }
    return null;
}

// Save consent preferences
function saveConsentPreferences(preferences) {
    const consentData = {
        necessary: preferences.necessary !== false, // Always true
        analytics: preferences.analytics === true,
        marketing: preferences.marketing === true,
        timestamp: new Date().toISOString()
    };
    setCookie(COOKIE_CONSENT_NAME, encodeURIComponent(JSON.stringify(consentData)), COOKIE_EXPIRY_DAYS);
    return consentData;
}

// Load Google Analytics script dynamically
function loadGoogleAnalytics(measurementId) {
    // Check if script is already loaded
    if (document.getElementById('ga-script')) {
        return;
    }

    // Load gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.id = 'ga-script';
    document.head.appendChild(script);

    // Initialize GA4 after script loads
    script.onload = function() {
        if (typeof gtag !== 'undefined') {
            gtag('js', new Date());
            gtag('config', measurementId, {
                'anonymize_ip': true, // IP anonymization (DSGVO requirement)
                'cookie_flags': 'SameSite=None;Secure'
            });
        }
    };
}

// Initialize Google Analytics 4
function initGoogleAnalytics(measurementId) {
    // Only initialize if analytics consent is given
    const preferences = getConsentPreferences();
    if (!preferences || !preferences.analytics) {
        return;
    }

    // Update consent mode
    if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });
    }

    // Load GA4 script if not already loaded
    if (!document.getElementById('ga-script')) {
        loadGoogleAnalytics(measurementId);
    } else {
        // Script already loaded, just update config
        if (typeof gtag !== 'undefined') {
            gtag('config', measurementId, {
                'anonymize_ip': true,
                'cookie_flags': 'SameSite=None;Secure'
            });
        }
    }
}

// Update consent and reload analytics
function updateConsent(preferences) {
    const consentData = saveConsentPreferences(preferences);
    
    // Update Google Consent Mode
    if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
            'analytics_storage': consentData.analytics ? 'granted' : 'denied',
            'ad_storage': consentData.marketing ? 'granted' : 'denied'
        });
    }

    // Initialize or remove analytics based on consent
    const measurementId = window.GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'; // Get from window variable or use placeholder
    if (consentData.analytics && measurementId !== 'G-XXXXXXXXXX') {
        initGoogleAnalytics(measurementId);
    }

    // Marketing cookies consent is stored but no marketing pixels are currently implemented
}

// Show cookie banner
function showCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.classList.add('show');
    }
}

// Hide cookie banner
function hideCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.classList.remove('show');
    }
}

// Show cookie settings modal
function showCookieSettings() {
    const modal = document.getElementById('cookieSettingsModal');
    const preferences = getConsentPreferences();
    
    if (modal) {
        // Set current preferences in the form
        if (preferences) {
            document.getElementById('cookieAnalytics').checked = preferences.analytics === true;
            document.getElementById('cookieMarketing').checked = preferences.marketing === true;
        } else {
            document.getElementById('cookieAnalytics').checked = false;
            document.getElementById('cookieMarketing').checked = false;
        }
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// Hide cookie settings modal
function hideCookieSettings() {
    const modal = document.getElementById('cookieSettingsModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Accept all cookies
function acceptAllCookies() {
    updateConsent({
        necessary: true,
        analytics: true,
        marketing: true
    });
    hideCookieBanner();
}

// Reject all cookies (except necessary)
function rejectAllCookies() {
    updateConsent({
        necessary: true,
        analytics: false,
        marketing: false
    });
    hideCookieBanner();
}

// Save cookie settings
function saveCookieSettings() {
    const preferences = {
        necessary: true,
        analytics: document.getElementById('cookieAnalytics').checked,
        marketing: document.getElementById('cookieMarketing').checked
    };
    
    updateConsent(preferences);
    hideCookieSettings();
    hideCookieBanner();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if consent has been given
    const preferences = getConsentPreferences();
    
    if (!preferences) {
        // Show banner if no consent has been given
        showCookieBanner();
    } else {
        // Apply existing consent
        updateConsent(preferences);
    }

    // Event listeners
    const acceptAllBtn = document.getElementById('cookieAcceptAll');
    const rejectAllBtn = document.getElementById('cookieRejectAll');
    const settingsBtn = document.getElementById('cookieSettings');
    const settingsCloseBtn = document.getElementById('cookieSettingsClose');
    const saveSettingsBtn = document.getElementById('cookieSaveSettings');
    const settingsLink = document.getElementById('cookieSettingsLink');

    if (acceptAllBtn) {
        acceptAllBtn.addEventListener('click', acceptAllCookies);
    }

    if (rejectAllBtn) {
        rejectAllBtn.addEventListener('click', rejectAllCookies);
    }

    if (settingsBtn) {
        settingsBtn.addEventListener('click', showCookieSettings);
    }

    if (settingsCloseBtn) {
        settingsCloseBtn.addEventListener('click', hideCookieSettings);
    }

    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', saveCookieSettings);
    }

    if (settingsLink) {
        settingsLink.addEventListener('click', function(e) {
            e.preventDefault();
            showCookieSettings();
        });
    }

    // Close modal when clicking outside
    const settingsModal = document.getElementById('cookieSettingsModal');
    if (settingsModal) {
        settingsModal.addEventListener('click', function(e) {
            if (e.target === settingsModal) {
                hideCookieSettings();
            }
        });
    }

    // Initialize GA4 if consent was already given
    if (preferences && preferences.analytics) {
        const measurementId = window.GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
        if (measurementId !== 'G-XXXXXXXXXX') {
            initGoogleAnalytics(measurementId);
        }
    }
});

