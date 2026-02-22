<script>
(() => {
  const STORAGE_KEY = "glassNewTabVideoData";

  const video = document.getElementById("bgVideo");
  const form = document.getElementById("searchForm");
  const input = document.getElementById("q");

  const panel = document.getElementById("panel");
  const urlField = document.getElementById("urlField");
  const setUrlBtn = document.getElementById("setUrlBtn");
  const clearBtn = document.getElementById("clearBtn");

  // 🔥 create file input dynamically
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "video/*";
  fileInput.style.display = "none";
  document.body.appendChild(fileInput);

  function setVideo(src) {
    if (!src) return;
    video.src = src;
    video.play().catch(() => {});
  }

  // Load saved video (base64)
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) setVideo(saved);

  // Search
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
      panel.style.display = (panel.style.display === "block") ? "none" : "block";
    }
    if (e.key === "Escape") panel.style.display = "none";
  });

  // 🔥 Upload video button
  const uploadBtn = document.createElement("button");
  uploadBtn.textContent = "Upload Video";
  uploadBtn.className = "btn";
  uploadBtn.type = "button";
  panel.querySelector(".controls").prepend(uploadBtn);

  uploadBtn.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      const base64 = e.target.result;
      localStorage.setItem(STORAGE_KEY, base64);
      setVideo(base64);
      panel.style.display = "none";
    };
    reader.readAsDataURL(file);
  });

  // Clear
  clearBtn.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    video.removeAttribute("src");
    video.load();
    panel.style.display = "none";
  });

})();
</script>
