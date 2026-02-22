(() => {
  const STORAGE_KEY = "glassNewTabVideoUrl";

  const video = document.getElementById("bgVideo");
  const form = document.getElementById("searchForm");
  const input = document.getElementById("q");

  const panel = document.getElementById("panel");
  const urlField = document.getElementById("urlField");
  const setUrlBtn = document.getElementById("setUrlBtn");
  const clearBtn = document.getElementById("clearBtn");

  function setVideo(src, persist) {
    if (!src) return;
    video.src = src;
    video.play().catch(() => {});
    if (persist) localStorage.setItem(STORAGE_KEY, src);
  }

  // Load saved background
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) setVideo(saved, false);

  // Search (uses Google)
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    window.location.assign("https://www.google.com/search?q=" + encodeURIComponent(q));
  });

  // Shortcuts
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === ",") {
      e.preventDefault();
      const show = panel.style.display !== "block";
      panel.style.display = show ? "block" : "none";
      if (show) {
        urlField.value = localStorage.getItem(STORAGE_KEY) || "";
        urlField.focus();
      }
    }
    if (e.key === "Escape") panel.style.display = "none";
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
      e.preventDefault();
      input.focus();
      input.select();
    }
  });

  // Save URL
  setUrlBtn.addEventListener("click", () => {
    const u = urlField.value.trim();
    if (!u) return;
    setVideo(u, true);
    panel.style.display = "none";
  });

  // Clear
  clearBtn.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    video.removeAttribute("src");
    video.load();
    panel.style.display = "none";
  });

  // Autoplay nudge
  window.addEventListener("pointerdown", () => {
    if (video.paused) video.play().catch(() => {});
  }, { once: true });
})();