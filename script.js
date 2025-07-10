// DOM Elements
const navbar = document.getElementById("navbar")
const mobileMenu = document.getElementById("mobile-menu")
const navMenu = document.getElementById("nav-menu")
const faqItems = document.querySelectorAll(".faq-item")
const contactForm = document.querySelector(".contact-form")

// Mobile Menu Toggle
mobileMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Navbar Scroll Effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
  document.getElementById(tabId).style.display = 'block';
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 70
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// FAQ Accordion
faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question")
  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active")

    // Close all FAQ items
    faqItems.forEach((faqItem) => {
      faqItem.classList.remove("active")
    })

    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add("active")
    }
  })
})
function showTab(tabId, btn) {
    const parentCard = btn.closest('.service-card');
    parentCard.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
    parentCard.querySelector(`#${tabId}`).style.display = 'block';

    parentCard.querySelectorAll('.tab-buttons button').forEach(b => b.classList.remove('active-tab'));
    btn.classList.add('active-tab');
}

function showSMTab(tabId, btn) {
    // Hide all content
    const parentCard = btn.closest('.service-card');
    parentCard.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
    parentCard.querySelector(`#${tabId}`).style.display = 'block';

    // Remove active-tab from all buttons
    parentCard.querySelectorAll('.tab-buttons button').forEach(b => b.classList.remove('active-tab'));
    btn.classList.add('active-tab');
}
function showSpotifyTab(tabId, btn) {
    const parentCard = btn.closest('.service-card');
    parentCard.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
    parentCard.querySelector(`#${tabId}`).style.display = 'block';

    parentCard.querySelectorAll('.tab-buttons button').forEach(b => b.classList.remove('active-tab'));
    btn.classList.add('active-tab');
}
// Contact Form Handling
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const submitBtn = contactForm.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent

  // Show loading state
  submitBtn.innerHTML = '<span class="loading"></span> Sending...'
  submitBtn.disabled = true

  // Simulate form submission (replace with actual form handling)
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Success state
    submitBtn.innerHTML = "✓ Message Sent!"
    submitBtn.style.background = "var(--accent-color)"

    // Reset form
    contactForm.reset()

    // Show success message
    showNotification("Message sent successfully! We'll get back to you soon.", "success")
  } catch (error) {
    // Error state
    submitBtn.innerHTML = "✗ Failed to Send"
    submitBtn.style.background = "#ff4444"
    showNotification("Failed to send message. Please try again.", "error")
  }

  // Reset button after 3 seconds
  setTimeout(() => {
    submitBtn.textContent = originalText
    submitBtn.disabled = false
    submitBtn.style.background = ""
  }, 3000)
})

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

  // Add notification styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 10px;
        padding: 1rem;
        color: var(--text-primary);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
        max-width: 300px;
        box-shadow: var(--shadow-card);
    `

  if (type === "success") {
    notification.style.borderColor = "var(--accent-color)"
  } else if (type === "error") {
    notification.style.borderColor = "#ff4444"
  }

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  })

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }
  }, 5000)
}

// Scroll Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("aos-animate")
    }
  })
}, observerOptions)

// Observe all elements with data-aos attributes
document.querySelectorAll("[data-aos]").forEach((el) => {
  observer.observe(el)
})

// Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".floating-card")

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1
    const yPos = -(scrolled * speed)
    element.style.transform = `translateY(${yPos}px)`
  })
})

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.textContent
    typeWriter(heroTitle, originalText, 80)
  }
})

// Pricing Card Hover Effects
document.querySelectorAll(".pricing-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = card.classList.contains("featured") ? "scale(1.05) translateY(-10px)" : "translateY(-10px)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = card.classList.contains("featured") ? "scale(1.05)" : ""
  })
})

// Service Card Animation
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const icon = card.querySelector(".service-icon")
    icon.style.transform = "scale(1.1) rotate(5deg)"
  })

  card.addEventListener("mouseleave", () => {
    const icon = card.querySelector(".service-icon")
    icon.style.transform = "scale(1) rotate(0deg)"
  })
})

// Counter Animation for Stats (if you want to add stats section)
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  function updateCounter() {
    start += increment
    if (start < target) {
      element.textContent = Math.floor(start)
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target
    }
  }

  updateCounter()
}

// Lazy Loading for Images
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      img.classList.remove("lazy")
      observer.unobserve(img)
    }
  })
})

document.querySelectorAll("img[data-src]").forEach((img) => {
  imageObserver.observe(img)
})

// Theme Toggle (if you want to add light/dark mode toggle)
function toggleTheme() {
  document.body.classList.toggle("light-theme")
  localStorage.setItem("theme", document.body.classList.contains("light-theme") ? "light" : "dark")
}

// Load saved theme
const savedTheme = localStorage.getItem("theme")
if (savedTheme === "light") {
  document.body.classList.add("light-theme")
}

// Cursor Trail Effect (optional enhancement)
let mouseX = 0
let mouseY = 0
const trail = []

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

function createTrail() {
  trail.push({ x: mouseX, y: mouseY })

  if (trail.length > 10) {
    trail.shift()
  }

  // You can add visual trail elements here if desired
}

// Performance optimization: Use requestAnimationFrame for smooth animations
let ticking = false

function updateAnimations() {
  createTrail()
  ticking = false
}

document.addEventListener("mousemove", () => {
  if (!ticking) {
    requestAnimationFrame(updateAnimations)
    ticking = true
  }
})

// Error Handling for External Resources
window.addEventListener("error", (e) => {
  console.warn("Resource failed to load:", e.target.src || e.target.href)
})

// Initialize all features when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("WRLX.RULES website loaded successfully!")

  // Add any initialization code here

  // Preload critical images
  const criticalImages = ["/favicon.ico"]

  criticalImages.forEach((src) => {
    const img = new Image()
    img.src = src
  })
})

// Service Worker Registration (for PWA features)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}
