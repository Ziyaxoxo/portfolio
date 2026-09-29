/* ============================================================
   Muhammed Faiha | Portfolio
   Theme toggle, mobile nav, reveal, carousel, scroll spy.
   Plain ES2018, no dependencies.
   ============================================================ */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme ---------- */
  var toggle = document.getElementById("theme-toggle");

  function currentTheme() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("mf-theme", next);
      } catch (e) {
        /* storage can be blocked, the theme still applies for this visit */
      }
    });
  }

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var navLinks = document.getElementById("nav-links");

  function closeNav() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    navLinks.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 720) closeNav();
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealables = document.querySelectorAll("[data-reveal]");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealables.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------- Carousel ---------- */
  var track = document.getElementById("car-track");
  var prev = document.getElementById("car-prev");
  var next = document.getElementById("car-next");

  if (track && prev && next) {
    var step = function () {
      var card = track.querySelector(".mini-card");
      if (!card) return track.clientWidth * 0.8;
      var gap = parseFloat(getComputedStyle(track).columnGap || "16") || 16;
      return card.getBoundingClientRect().width + gap;
    };

    var syncButtons = function () {
      var max = track.scrollWidth - track.clientWidth - 1;
      prev.disabled = track.scrollLeft <= 1;
      next.disabled = track.scrollLeft >= max;
    };

    prev.addEventListener("click", function () {
      track.scrollBy({ left: -step(), behavior: reduceMotion ? "auto" : "smooth" });
    });

    next.addEventListener("click", function () {
      track.scrollBy({ left: step(), behavior: reduceMotion ? "auto" : "smooth" });
    });

    track.addEventListener("scroll", syncButtons, { passive: true });
    window.addEventListener("resize", syncButtons);
    syncButtons();
  }

  /* ---------- Auto-hide header on scroll ---------- */
  var header = document.querySelector(".site-header");
  var lastScrollY = window.scrollY;
  var scrollThreshold = 10;
  var headerHidden = false;

  function onScroll() {
    var currentY = window.scrollY;
    var delta = currentY - lastScrollY;

    if (Math.abs(delta) < scrollThreshold) return;

    if (delta > 0 && currentY > header.offsetHeight && !headerHidden) {
      header.classList.add("is-hidden");
      headerHidden = true;
    } else if (delta < 0 && headerHidden) {
      header.classList.remove("is-hidden");
      headerHidden = false;
    }

    lastScrollY = currentY;
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Scroll spy for nav ---------- */
  var sections = ["takes", "about", "personality", "experience", "work", "skills", "contact"];
  var navAnchors = {};

  sections.forEach(function (id) {
    var link = document.querySelector('.nav-links a[href="#' + id + '"]');
    var section = document.getElementById(id);
    if (link && section) navAnchors[id] = { link: link, section: section };
  });

  var keys = Object.keys(navAnchors);

  function setActive(id) {
    keys.forEach(function (k) {
      var isCurrent = k === id;
      navAnchors[k].link.setAttribute("aria-current", isCurrent ? "true" : "false");
    });
  }

  if ("IntersectionObserver" in window && keys.length) {
    var visible = {};

    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          visible[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        });

        var best = null;
        var bestRatio = 0;
        keys.forEach(function (k) {
          var ratio = visible[k] || 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = k;
          }
        });

        if (best) setActive(best);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.15, 0.4, 0.75, 1] }
    );

    keys.forEach(function (k) {
      spy.observe(navAnchors[k].section);
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
