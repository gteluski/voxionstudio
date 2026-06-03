const menuToggle = document.querySelector(".menu-toggle");
const mainMenu = document.querySelector(".main-menu");

menuToggle.addEventListener("click", () => {
  const isOpen = mainMenu.classList.toggle("open");
  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainMenu.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll(".page-transition-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    document.body.classList.add("page-leaving");

    window.setTimeout(() => {
      window.location.href = link.href;
    }, 360);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
const manifestoStage = document.querySelector(".manifesto-art-stage");
const scribble = document.querySelector(".scribble");
const serviceReel = document.querySelector(".service-reel");
const serviceReelRows = document.querySelectorAll(".service-reel-row");
const contactReel = document.querySelector(".contact");
const contactReelRows = document.querySelectorAll(".contact-reel-row");
const heroSticker = document.querySelector(".hero-sticker-space");

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);

const drawScribbleOnScroll = () => {
  if (!manifestoStage || !scribble) return;

  const rect = manifestoStage.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const start = viewportHeight * 0.88;
  const distance = viewportHeight * 0.78 + rect.height * 0.58;
  const progress = clamp((start - rect.top) / distance);
  const delayedProgress = clamp((progress - 0.24) / 0.76);

  scribble.style.setProperty("--scribble-progress", progress.toFixed(4));
  scribble.style.setProperty("--scribble-progress-delayed", delayedProgress.toFixed(4));
};

const moveServiceReelOnScroll = () => {
  if (!serviceReel || !serviceReelRows.length) return;

  const rect = serviceReel.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const travel = viewportHeight + rect.height;
  const progress = clamp((viewportHeight - rect.top) / travel);
  const distance = window.innerWidth < 800 ? 150 : 240;

  serviceReelRows.forEach((row, index) => {
    const direction = index % 2 === 0 ? -1 : 1;
    const offset = direction * (progress - 0.5) * distance;
    row.style.setProperty("--reel-offset", offset.toFixed(2));
  });
};

const moveContactReelOnScroll = () => {
  if (!contactReel || !contactReelRows.length) return;

  const rect = contactReel.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const travel = viewportHeight + rect.height;
  const progress = clamp((viewportHeight - rect.top) / travel);
  const distance = window.innerWidth < 800 ? 170 : 280;

  contactReelRows.forEach((row, index) => {
    const direction = index % 2 === 0 ? -1 : 1;
    const offset = direction * (progress - 0.5) * distance;
    row.style.setProperty("--reel-offset", offset.toFixed(2));
  });
};

const rotateHeroStickerOnScroll = () => {
  if (!heroSticker) return;

  const rotation = -Math.min(window.scrollY * 0.18, 210);
  heroSticker.style.setProperty("--sticker-rotation", `${rotation.toFixed(2)}deg`);
};

let scribbleFrame;

const requestScribbleUpdate = () => {
  if (scribbleFrame) return;

  scribbleFrame = requestAnimationFrame(() => {
    drawScribbleOnScroll();
    moveServiceReelOnScroll();
    moveContactReelOnScroll();
    rotateHeroStickerOnScroll();
    scribbleFrame = null;
  });
};

window.addEventListener("scroll", requestScribbleUpdate, { passive: true });
window.addEventListener("resize", requestScribbleUpdate);
drawScribbleOnScroll();
moveServiceReelOnScroll();
moveContactReelOnScroll();
rotateHeroStickerOnScroll();
