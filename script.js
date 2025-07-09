document.addEventListener("DOMContentLoaded", () => {
  createStars()
  animateShootingStars()
  animateSections()
  setupHeaderScroll()
  animateSkillBoxes()
  animateAchievementsAndContacts()
  addParticleTrail()

  // Make hero section visible immediately
  document.getElementById("hero").classList.add("show")
  document.getElementById("hero").classList.add("animate")
})

function createStars() {
  const starsContainer = document.querySelector(".stars")
  const starCount = 400

  // Get the full document height
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight,
  )

  // Update stars container height
  starsContainer.style.height = documentHeight + "px"
  starsContainer.style.position = "absolute"

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div")
    star.classList.add("star")
    star.style.left = `${Math.random() * 100}%`
    star.style.top = `${Math.random() * documentHeight}px`
    star.style.animationDuration = `${Math.random() * 3 + 2}s`
    star.style.animationDelay = `${Math.random() * 3}s`

    // Random star sizes
    const size = Math.random() * 3 + 1
    star.style.width = `${size}px`
    star.style.height = `${size}px`

    starsContainer.appendChild(star)
  }
}

function animateShootingStars() {
  const starsContainer = document.querySelector(".stars")
  const shootingStarCount = 12
  let activeStars = 0

  function createShootingStar() {
    const shootingStar = document.createElement("div")
    shootingStar.classList.add("shooting-star")
    shootingStar.style.top = `${Math.random() * 80}%`
    shootingStar.style.right = "-60px"

    starsContainer.appendChild(shootingStar)
    activeStars++

    setTimeout(() => {
      if (shootingStar.parentNode) {
        shootingStar.remove()
      }
      activeStars--
      if (activeStars < shootingStarCount) {
        scheduleNextStar(0)
      }
    }, 2000)
  }

  function scheduleNextStar(delay) {
    setTimeout(() => {
      if (activeStars < shootingStarCount) {
        createShootingStar()
        scheduleNextStar(Math.random() * 1500 + 800)
      }
    }, delay)
  }

  for (let i = 0; i < shootingStarCount; i++) {
    scheduleNextStar(i * 200)
  }
}

function animateSections() {
  const sections = document.querySelectorAll("section")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate")
          entry.target.classList.add("show")
        }
      })
    },
    { threshold: 0.1 },
  )

  sections.forEach((section) => {
    observer.observe(section)
  })
}

function setupHeaderScroll() {
  let lastScrollTop = 0
  const header = document.querySelector("header")
  const scrollThreshold = 50

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
      if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
        header.classList.add("header-hidden")
      } else {
        header.classList.remove("header-hidden")
      }
      lastScrollTop = scrollTop
    }
  })
}

function animateSkillBoxes() {
  const skillBoxes = document.querySelectorAll(".skill-box")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0) scale(1)"
          }, index * 50)
        }
      })
    },
    { threshold: 0.1 },
  )

  skillBoxes.forEach((box, index) => {
    box.style.opacity = "0"
    box.style.transform = "translateY(20px) scale(0.9)"
    box.style.transition = "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    observer.observe(box)
  })
}

function animateAchievementsAndContacts() {
  const lists = document.querySelectorAll(".achievement-list, .contact-list")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate")
        }
      })
    },
    { threshold: 0.1 },
  )

  lists.forEach((list) => {
    observer.observe(list)
  })
}

function addParticleTrail() {
  let mouseX = 0
  let mouseY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    if (Math.random() > 0.9) {
      createParticle(mouseX, mouseY)
    }
  })

  function createParticle(x, y) {
    const particle = document.createElement("div")
    particle.style.position = "fixed"
    particle.style.left = x + "px"
    particle.style.top = y + "px"
    particle.style.width = "4px"
    particle.style.height = "4px"
    particle.style.background = "rgba(139, 0, 0, 0.7)"
    particle.style.borderRadius = "50%"
    particle.style.pointerEvents = "none"
    particle.style.zIndex = "999"
    particle.style.animation = "particleFade 1s ease-out forwards"

    document.body.appendChild(particle)

    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove()
      }
    }, 1000)
  }

  // Add CSS for particle animation
  const style = document.createElement("style")
  style.textContent = `
    @keyframes particleFade {
      0% {
        opacity: 1;
        transform: scale(1);
      }
      100% {
        opacity: 0;
        transform: scale(0) translateY(-20px);
      }
    }
  `
  document.head.appendChild(style)
}

// Enhanced smooth scrolling with easing
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const targetPosition = target.offsetTop - 80
      const startPosition = window.pageYOffset
      const distance = targetPosition - startPosition
      const duration = 1000
      let start = null

      function animation(currentTime) {
        if (start === null) start = currentTime
        const timeElapsed = currentTime - start
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration)
        window.scrollTo(0, run)
        if (timeElapsed < duration) requestAnimationFrame(animation)
      }

      function easeInOutQuad(t, b, c, d) {
        t /= d / 2
        if (t < 1) return (c / 2) * t * t + b
        t--
        return (-c / 2) * (t * (t - 2) - 1) + b
      }

      requestAnimationFrame(animation)
    }
  })
})

// Add floating animation to project cards
function addFloatingAnimation() {
  const cards = document.querySelectorAll(".project-card, .experience-item, .education-item")

  cards.forEach((card, index) => {
    card.style.animation = `cardFloat 6s ease-in-out infinite ${index * 0.5}s`
  })

  const style = document.createElement("style")
  style.textContent = `
    @keyframes cardFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
    }
  `
  document.head.appendChild(style)
}

// Initialize floating animation when DOM is loaded
setTimeout(addFloatingAnimation, 1000)
