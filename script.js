document.addEventListener("DOMContentLoaded", () => {
  loadHeader().then(() => {
    initAnimations();
    initScrollEffects();
    initKnowledgeTabs();
      initHeroParallax();
  });
});

/* =========================
   LOAD HEADER (AUTO PATH FIX)
========================= */
function loadHeader() {
  return new Promise((resolve) => {
    const header = document.getElementById("header");

    if (!header) {
      resolve();
      return;
    }

    // Detect if page is inside /articles/
    const isArticle = window.location.pathname.includes("/articles/");
    const headerPath = isArticle ? "../header.html" : "header.html";

    fetch(headerPath)
      .then(res => res.text())
      .then(data => {
        header.innerHTML = data;
        resolve();
      })
      .catch(() => resolve());
  });
}

/* =========================
   SCROLL ANIMATIONS (STAGGER)
========================= */
function initAnimations() {
  const elements = document.querySelectorAll(".fade-in");

  if (!elements.length) return;

  function showOnScroll() {
    const trigger = window.innerHeight * 0.85;

    elements.forEach((el, index) => {
      const top = el.getBoundingClientRect().top;

      if (top < trigger) {
        setTimeout(() => {
          el.classList.add("show");
        }, index * 120);
      }
    });
  }

  window.addEventListener("scroll", showOnScroll);
  showOnScroll();
}

/* =========================
   NAVBAR SCROLL EFFECT
========================= */
function initScrollEffects() {
  const nav = document.querySelector(".nav");
  if (!nav) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      nav.style.background = "rgba(0, 0, 102, 0.9)";
      nav.style.backdropFilter = "blur(10px)";
      nav.style.webkitBackdropFilter = "blur(10px)";
    } else {
      nav.style.background = "#000066";
      nav.style.backdropFilter = "none";
    }
  });
}

/* =========================
   KNOWLEDGE TABS (PRO VERSION)
========================= */
function initKnowledgeTabs() {
  const tabs = document.querySelectorAll("[data-tab]");
  const contents = document.querySelectorAll(".tab-content");

  if (!tabs.length || !contents.length) return;

  function activateTab(tabName) {
    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));

    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    const activeContent = document.getElementById(tabName);

    if (activeTab && activeContent) {
      activeTab.classList.add("active");
      activeContent.classList.add("active");
    }
  }

  /* CLICK EVENTS */
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const tabName = tab.getAttribute("data-tab");

      activateTab(tabName);

      // update URL without reload
      history.replaceState(null, "", `?tab=${tabName}`);
    });
  });

  /* LOAD FROM URL */
  const params = new URLSearchParams(window.location.search);
  const tabFromURL = params.get("tab");

  if (tabFromURL && document.getElementById(tabFromURL)) {
    activateTab(tabFromURL);
  } else {
    const firstTab = tabs[0].getAttribute("data-tab");
    activateTab(firstTab);
  }
}
/* =========================
   HERO PARALLAX (ELITE)
========================= */
function initHeroParallax() {
  const bg = document.querySelector(".hero-bg");

  if (!bg) return;

  window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    bg.style.transform = `scale(1.1) translateY(${scroll * 0.15}px)`;
  });
}