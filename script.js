// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Hero Background Image Rotation
const heroSlides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;
const slideInterval = 10000; // 10 seconds

function rotateHeroSlides() {
    if (heroSlides.length === 0) return;
    
    // Remove active class from current slide
    heroSlides[currentSlide].classList.remove('active');
    
    // Move to next slide
    currentSlide = (currentSlide + 1) % heroSlides.length;
    
    // Add active class to new slide
    heroSlides[currentSlide].classList.add('active');
}

// Start rotation if slides exist
if (heroSlides.length > 0) {
    // Set initial active slide
    heroSlides[0].classList.add('active');
    
    // Start rotation
    setInterval(rotateHeroSlides, slideInterval);
}

// Instagram Feed Loading
// Uses Instagram's public oEmbed API - no credentials required!
// Simply add Instagram post URLs to the array below to display them
async function loadInstagramFeed() {
    const feedContainer = document.getElementById('instagramFeed');
    if (!feedContainer) return;

    // Add Instagram post URLs here (most recent first)
    // To get a post URL: Open the post on Instagram → Click the three dots → "Copy link"
    // Example: 'https://www.instagram.com/p/ABC123xyz/'
    const instagramPostUrls = [
        // Add your 3 most recent Instagram post URLs here
        // 'https://www.instagram.com/p/POST_ID_1/',
        // 'https://www.instagram.com/p/POST_ID_2/',
        // 'https://www.instagram.com/p/POST_ID_3/',
        'https://www.instagram.com/p/DSo7aWjiGzA/',
        'https://www.instagram.com/p/DSat1gNiK_u/',
        'https://www.instagram.com/p/DRzk7Ttkcvv/',
    ];

    const username = 'projekt_24h';

    // If no posts configured, show placeholder
    if (instagramPostUrls.length === 0 || instagramPostUrls.every(url => !url || url.trim() === '')) {
        feedContainer.innerHTML = `
            <div class="instagram-placeholder">
                <p>Instagram Posts konfigurieren</p>
                <p style="font-size: 0.9rem; margin-top: 1rem; color: #999;">
                    Bitte fügen Sie Instagram Post URLs in script.js hinzu.<br>
                    Siehe INSTAGRAM_SETUP.md für Anweisungen.
                </p>
                <a href="https://www.instagram.com/${username}/" target="_blank" rel="noopener noreferrer" 
                   style="color: var(--primary-yellow); text-decoration: none; margin-top: 1rem; display: inline-block;">
                    Besuchen Sie uns auf Instagram
                </a>
            </div>
        `;
        return;
    }

    // Clean URLs: Remove query parameters and normalize format
    const cleanUrls = instagramPostUrls
        .filter(url => url && url.trim() !== '')
        .map(url => {
            // Remove query parameters (everything after ?)
            const cleanUrl = url.split('?')[0];
            // Ensure URL ends with /
            return cleanUrl.endsWith('/') ? cleanUrl : cleanUrl + '/';
        });

    // Limit to 3 most recent posts
    const postsToShow = cleanUrls.slice(0, 3);

    if (postsToShow.length === 0) {
        throw new Error('No valid post URLs found');
    }

    try {
        // Create simple blockquote embeds (Instagram's embed.js will process these)
        // This avoids CORS issues with oEmbed API
        feedContainer.innerHTML = postsToShow
            .map(url => {
                // Validate URL format
                if (!url.match(/instagram\.com\/p\/[^\/]+/)) {
                    console.warn(`Invalid Instagram URL format: ${url}`);
                    return null;
                }
                
                // Create simple blockquote - Instagram's embed.js will handle the rest
                return `
                    <div class="instagram-embed-wrapper">
                        <blockquote class="instagram-media" 
                                    data-instgrm-permalink="${url}" 
                                    data-instgrm-version="14">
                        </blockquote>
                    </div>
                `;
            })
            .filter(html => html !== null)
            .join('');

        // Load Instagram embed script if not already loaded
        if (!window.instgrm) {
            const script = document.createElement('script');
            script.src = 'https://www.instagram.com/embed.js';
            script.async = true;
            script.onload = () => {
                // Process embeds after script loads
                if (window.instgrm && window.instgrm.Embeds) {
                    window.instgrm.Embeds.process();
                }
            };
            document.body.appendChild(script);
        } else {
            // If script already loaded, process embeds immediately
            if (window.instgrm.Embeds) {
                window.instgrm.Embeds.process();
            }
        }

    } catch (error) {
        console.error('Error loading Instagram feed:', error);
        feedContainer.innerHTML = `
            <div class="instagram-placeholder">
                <p>Instagram Feed konnte nicht geladen werden</p>
                <p style="font-size: 0.9rem; margin-top: 1rem; color: #999;">
                    ${error.message || 'Ein Fehler ist aufgetreten.'}
                </p>
                <a href="https://www.instagram.com/${username}/" target="_blank" rel="noopener noreferrer" 
                   style="color: var(--primary-yellow); text-decoration: none; margin-top: 1rem; display: inline-block;">
                    Besuchen Sie uns auf Instagram
                </a>
            </div>
        `;
    }
}

// Load Instagram feed on page load
loadInstagramFeed();

// Gallery Image Loading - Simplified
async function loadGalleryImages() {
    const galleryContainer = document.getElementById('galleryMasonry');
    if (!galleryContainer) return;

    const imageExtensions = ['jpg', 'jpeg', 'png', 'JPEG'];
    const maxImages = 50;
    const loadedImages = [];

    // Function to check if an image exists
    function checkImageExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    // Load images sequentially (image1, image2, etc.)
    let consecutiveMisses = 0;
    for (let i = 1; i <= maxImages; i++) {
        let found = false;
        for (const ext of imageExtensions) {
            const url = `assets/gallery/image${i}.${ext}`;
            const exists = await checkImageExists(url);
            if (exists) {
                loadedImages.push(url);
                found = true;
                consecutiveMisses = 0;
                break;
            }
        }
        // Stop if we find 3 consecutive missing images
        if (!found) {
            consecutiveMisses++;
            if (consecutiveMisses >= 3) {
                break;
            }
        }
    }

    // Create gallery items
    if (loadedImages.length > 0) {
        galleryContainer.innerHTML = loadedImages.map((url, index) => {
            return `
                <div class="gallery-item">
                    <img src="${url}" alt="Galerie Bild ${index + 1}" class="gallery-image">
                </div>
            `;
        }).join('');

        // Initialize gallery click handlers
        initializeGalleryModal();
    } else {
        galleryContainer.innerHTML = '<p style="color: #666; text-align: center; padding: 2rem;">Keine Bilder in der Galerie gefunden.</p>';
    }
}

// Initialize gallery modal functionality
function initializeGalleryModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.querySelector('.modal-close');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Store all gallery image sources
    let galleryImages = [];
    let currentImageIndex = 0;

    // Update gallery images array
    function updateGalleryImages() {
        galleryImages = Array.from(galleryItems).map(item => {
            const img = item.querySelector('.gallery-image');
            return img ? img.src : null;
        }).filter(src => src !== null);
    }

    // Show image at specific index
    function showImage(index) {
        if (galleryImages.length === 0) return;
        
        // Handle wrapping
        if (index < 0) {
            currentImageIndex = galleryImages.length - 1;
        } else if (index >= galleryImages.length) {
            currentImageIndex = 0;
        } else {
            currentImageIndex = index;
        }
        
        if (modalImage && galleryImages[currentImageIndex]) {
            modalImage.src = galleryImages[currentImageIndex];
            if (modalCaption) {
                modalCaption.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
            }
        }
    }

    // Navigate to previous image
    function showPreviousImage() {
        showImage(currentImageIndex - 1);
    }

    // Navigate to next image
    function showNextImage() {
        showImage(currentImageIndex + 1);
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        // Remove keyboard listener when modal is closed
        document.removeEventListener('keydown', handleKeyDown);
    }

    // Handle keyboard navigation
    function handleKeyDown(e) {
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            showPreviousImage();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            showNextImage();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            closeModal();
        }
    }

    // Handle click on modal for navigation
    function handleModalClick(e) {
        // Don't navigate if clicking on the close button or caption
        if (e.target === modalClose || e.target === modalCaption || modalCaption.contains(e.target)) {
            return;
        }
        
        // Allow navigation when clicking on the image or modal background
        // Check click position relative to the modal to determine which zone
        if (e.target === modal || e.target === modalImage) {
            const modalRect = modal.getBoundingClientRect();
            const clickX = e.clientX - modalRect.left;
            const modalWidth = modalRect.width;
            // Use 40% on each side for wider click zones (leaves 20% in middle)
            const zoneWidth = modalWidth * 0.4;
            
            // Left 40% - previous image
            if (clickX < zoneWidth) {
                e.preventDefault();
                showPreviousImage();
            }
            // Right 40% - next image
            else if (clickX > modalWidth - zoneWidth) {
                e.preventDefault();
                showNextImage();
            }
            // Middle 20% - close modal (only if clicking on background, not image)
            else if (e.target === modal) {
                closeModal();
            }
        }
    }

    if (galleryItems.length > 0 && modal) {
        // Update gallery images array
        updateGalleryImages();
        
        galleryItems.forEach((item, index) => {
            // Remove existing listeners by cloning
            const newItem = item.cloneNode(true);
            item.parentNode.replaceChild(newItem, item);
            
            newItem.addEventListener('click', () => {
                const img = newItem.querySelector('.gallery-image');
            
                if (img && modalImage) {
                    // Find the index of clicked image
                    updateGalleryImages();
                    const clickedIndex = Array.from(document.querySelectorAll('.gallery-item'))
                        .indexOf(newItem);
                    
                    if (clickedIndex !== -1) {
                        showImage(clickedIndex);
                    } else {
                        modalImage.src = img.src;
                        if (modalCaption) {
                            modalCaption.textContent = '';
                        }
                    }
                    
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    
                    // Add keyboard listener when modal opens
                    document.addEventListener('keydown', handleKeyDown);
                }
            });
        });
    }

    // Close button
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            closeModal();
        });
    }

    // Handle clicks on modal for navigation
    if (modal) {
        modal.addEventListener('click', handleModalClick);
    }
}

// Load gallery images on page load
loadGalleryImages();

// Gallery modal will be initialized after images are loaded

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Video play/pause handling
const videos = document.querySelectorAll('video');
videos.forEach(video => {
    video.addEventListener('play', () => {
        // Pause other videos when one starts playing (except autoplay videos)
        videos.forEach(otherVideo => {
            if (otherVideo !== video && !otherVideo.muted && !otherVideo.paused) {
                otherVideo.pause();
            }
        });
    });
});

// Add loading states for images
document.querySelectorAll('.gallery-image, .partner-logo, .member-image').forEach(img => {
    // Debug: log image source
    console.log('Checking image:', img.src, 'Complete:', img.complete, 'Natural height:', img.naturalHeight);
    
    // Check if image is already loaded
    if (img.complete && img.naturalHeight !== 0) {
        console.log('Image already loaded, setting opacity to 1');
        img.style.opacity = '1';
        return; // Image already loaded, skip event listeners
    }
    
    // Set initial opacity for fade-in effect
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    
    img.addEventListener('load', function() {
        console.log('Image loaded:', this.src);
        this.style.opacity = '1';
    });
    
    img.addEventListener('error', function() {
        console.error('Image failed to load:', this.src);
        this.style.display = 'none';
        const parent = this.parentElement;
        if (parent && !parent.classList.contains('instagram-post')) {
            parent.innerHTML = '<p style="color: #666; text-align: center; padding: 2rem;">Bild nicht verfügbar</p>';
        }
    });
    
    // Fallback: if image doesn't load within 2 seconds, make it visible anyway
    setTimeout(() => {
        if (img.style.opacity === '0' && img.complete) {
            console.log('Fallback: Making image visible:', img.src);
            img.style.opacity = '1';
        }
    }, 2000);
});

// Ensure autoplay video plays (with user interaction)
const aboutVideo = document.querySelector('.about-video');
if (aboutVideo) {
    // Try to play video when page loads
    aboutVideo.play().catch(error => {
        console.log('Autoplay prevented, will play on user interaction');
    });
    
    // Play on scroll into view
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutVideo.play().catch(() => {
                    // Autoplay blocked, user will need to interact
                });
            }
        });
    }, { threshold: 0.5 });
    
    videoObserver.observe(aboutVideo);
}
