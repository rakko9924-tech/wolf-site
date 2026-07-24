/* Hallmark · N5 floating pill — mobile sheet toggle.
   Keeps the nav accessible on coarse pointers: real button, real aria state,
   Escape closes, focus returns to the trigger. */
(function () {
  "use strict";

  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;

  function setOpen(open) {
    menu.dataset.open = open ? "true" : "false";
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? "閉じる" : "メニュー";
    document.documentElement.style.overflow = open ? "hidden" : "";
  }

  toggle.addEventListener("click", function () {
    setOpen(menu.dataset.open !== "true");
  });

  menu.addEventListener("click", function (event) {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menu.dataset.open === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  // The sheet is a mobile-only surface; leaving it open across a resize
  // would trap the desktop layout behind an invisible overlay.
  var wide = window.matchMedia("(min-width: 62.0625rem)");
  wide.addEventListener("change", function (event) {
    if (event.matches) setOpen(false);
  });

  // Mark the current page in the nav without hand-editing every file.
  var here = location.pathname.split("/").pop() || "index.html";
  menu.querySelectorAll("a[href]").forEach(function (link) {
    if (link.getAttribute("href") === here) {
      link.setAttribute("aria-current", "page");
    }
  });
})();
