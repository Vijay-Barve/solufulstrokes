// Event Modal functionality
function openEventModal(title, description) {
  alert(title + ": " + description);
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Enhanced Event Modal functionality
function openEventModal(title, description) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        transform: translateY(-50px);
        transition: transform 0.3s ease;
    `;

    modal.innerHTML = `
        <h3 style="color: #ff6b9d; margin-bottom: 1rem; font-size: 1.5rem;">${title}</h3>
        <p style="color: #666; line-height: 1.6; margin-bottom: 2rem;">${description}</p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
            <button onclick="closeModal()" style="
                background: #6c757d;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 25px;
                cursor: pointer;
                transition: all 0.3s ease;
            ">Close</button>
            <button onclick="bookEvent('${title}')" style="
                background: linear-gradient(45deg, #ff6b9d, #ff8fab);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 25px;
                cursor: pointer;
                transition: all 0.3s ease;
            ">Book Now</button>
        </div>
    `;

    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);

    // Animate modal in
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modal.style.transform = 'translateY(0)';
    }, 10);

    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
}

function closeModal() {
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.style.opacity = '0';
        modalOverlay.querySelector('.modal').style.transform = 'translateY(-50px)';
        setTimeout(() => {
            document.body.removeChild(modalOverlay);
        }, 300);
    }
}

function bookEvent(eventTitle) {
    alert(`Thank you for your interest in "${eventTitle}"! We'll contact you soon to confirm your booking.`);
    closeModal();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .gallery-item, .event-card, .stat');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Gallery image click handler
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h3').textContent;
            const medium = item.querySelector('p').textContent;
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            lightbox.innerHTML = `
                <div style="text-align: center; color: white;">
                    <img src="${img.src}" style="max-width: 90%; max-height: 70vh; border-radius: 10px; margin-bottom: 1rem;">
                    <h3 style="margin-bottom: 0.5rem;">${title}</h3>
                    <p style="opacity: 0.8;">${medium}</p>
                    <button onclick="closeLightbox()" style="
                        background: rgba(255, 255, 255, 0.2);
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 25px;
                        cursor: pointer;
                        margin-top: 1rem;
                    ">Close</button>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            setTimeout(() => lightbox.style.opacity = '1', 10);
            
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
        });
    });
});

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(lightbox);
        }, 300);
    }
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Gallery Loader: Displays Indian art samples for each service.
// To use your own images, update the 'samples' array below with your image URLs and labels.
function loadGalleryImages() {
  const galleryDiv = document.getElementById('dynamic-gallery');
  if (!galleryDiv) return;

  // Use actual filenames from assets/img for each service
  const samples = [
    {
      src: 'assets/img/warli.jpg',
      alt: 'Warli Painting',
      label: 'Warli Painting'
    }, {
        src: 'assets/img/landscape.jpg',
        alt: 'Landscape Painting',
        label: 'Landscape Painting'
      },
    {
      src: 'assets/img/mural.jpg',
      alt: 'Mural Painting',
      label: 'Mural Painting'
    },
  
    {
      src: 'assets/img/schoolwall.jpg',
      alt: 'School Wall Painting',
      label: 'School Wall Painting'
    },
    {
      src: 'assets/img/fabric.jpg',
      alt: 'Fabric Painting',
      label: 'Fabric Painting'
    },
    {
        src: 'assets/img/abstract.jpg',
        alt: 'Abstract Painting',
        label: 'Abstract Painting'
      },
    {
      src: 'assets/img/kidsroom.jpg',
      alt: 'Kids Room Wall Painting',
      label: 'Kids Room Wall Painting'
    },
    {
      src: 'assets/img/portrait.jpg',
      alt: 'Portrait Painting',
      label: 'Portrait Painting'
    },
    {
      src: 'assets/img/pencil.jpg',
      alt: 'Pencil Sketch',
      label: 'Pencil Sketch'
    },
    {
      src: 'assets/img/wall.jpg',
      alt: 'Wall Painting',
      label: 'Wall Painting'
    },  {
        src: 'assets/img/fiber.jpg',
        alt: 'Fiber Murals / Statues',
        label: 'Fiber Murals / Statues'
      },
  ];
  galleryDiv.innerHTML = samples.map(sample => `
    <div class="gallery-item">
      <img src="${sample.src}" alt="${sample.alt}" />
      <div class="gallery-overlay"><h3>${sample.label}</h3></div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', loadGalleryImages);

