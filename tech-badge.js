document.addEventListener("DOMContentLoaded", function () {
  var isTouchDevice = window.matchMedia("(hover: none)").matches;

  var wrapper = document.getElementById("tech-badge-wrapper");
  var trigger = document.getElementById("tech-badge-trigger");
  var tooltip = document.getElementById("tech-badge-tooltip");
  var introPopup = document.getElementById("tech-intro-popup");

  if (tooltip && tooltip.parentElement !== document.body) {
    document.body.appendChild(tooltip);
  }

  if (trigger && tooltip && isTouchDevice) {
    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      tooltip.classList.toggle("is-open");
    });
  }

  if (tooltip) {
    window.addEventListener(
      "scroll",
      function () {
        tooltip.classList.remove("is-open");
      },
      { passive: true }
    );

    document.addEventListener(
      "touchmove",
      function () {
        tooltip.classList.remove("is-open");
      },
      { passive: true }
    );
  }

  function hideIntroPopup() {
    if (introPopup) introPopup.classList.remove("is-visible");
  }

  if (introPopup) {
    setTimeout(function () {
      introPopup.classList.add("is-visible");
    }, 1200);

    var moreBtn = introPopup.querySelector(".tech-intro-popup-more");
    if (moreBtn) {
      moreBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        introPopup.classList.toggle("is-expanded");
      });
    }

    window.addEventListener("scroll", hideIntroPopup, { once: true, passive: true });

    document.addEventListener("click", function (e) {
      if (!introPopup.contains(e.target)) hideIntroPopup();
      if (wrapper && tooltip && !wrapper.contains(e.target) && !tooltip.contains(e.target)) {
        tooltip.classList.remove("is-open");
      }
    });
  }
});
