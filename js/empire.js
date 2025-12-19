import { requireAuth } from "./auth.js";
import { initUI } from "./ui.js";
import { MOCK_EMPIRES, MOCK_RULERS } from "./mock_data.js";

await requireAuth();
initUI();


const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

if (!slug) {
  console.warn("No slug provided");
}


async function loadEmpire() {
  console.log("Loading Empire (Mock Mode) for slug:", slug);
  const empire = MOCK_EMPIRES.find(e => e.slug === slug);

  if (!empire) {
    const page = document.querySelector(".page");
    if (page) page.innerHTML = "<h1>Empire not found</h1>";
    return;
  }
  const setContent = (id, value) => {
    const el = document.getElementById(id);
    if (el) {
      if (el.tagName === "IMG") el.src = value;
      else el.textContent = value;
    }
  };

  setContent("empire-name", empire.name);
  setContent("empire-description", empire.description);
  setContent("empire-image", empire.image_main || empire.home_image);
  setContent("geo-text", empire.geography);
  setContent("geo-image", empire.geography_image);
  const rulers = MOCK_RULERS.filter(r => r.empire_slug === slug);

  const container = document.getElementById("rulers-container");
  if (container) {
    container.innerHTML = "";
    if (rulers.length === 0) {
      container.innerHTML = "<p>No rulers found for this empire in demo mode.</p>";
    }

    rulers.forEach(ruler => {
      const div = document.createElement("div");
      div.className = "king two-columns";

      div.innerHTML = `
        <div class="image-box">
          <img src="${ruler.image}" alt="${ruler.names}" onerror="this.src='images/images-mali.jpg'">
        </div>
        <div class="text-box">
          <h3>${ruler.names}</h3>
          <p>${ruler.description}</p>
        </div>
      `;

      container.appendChild(div);
    });
  }
}

loadEmpire();
