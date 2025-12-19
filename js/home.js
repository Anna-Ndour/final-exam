import { supabase } from "./supabase.js";
import { requireAuth } from "./auth.js";
import { initUI } from "./ui.js";
import { MOCK_EMPIRES } from "./mock_data.js";

await requireAuth();

initUI();

const cardsContainer = document.getElementById("empire-cards");

async function loadEmpires() {
  const empires = MOCK_EMPIRES;

  cardsContainer.innerHTML = "";
  empires.forEach(empire => {
    const card = document.createElement("a");
    card.href = `empire.html?slug=${empire.slug}`;
    card.className = "card";

    card.innerHTML = `
      <img src="${empire.home_image}" alt="${empire.name}">
      <h3>${empire.name}</h3>
      <p>${empire.home_exercept}</p> 
      <button class="explore-btn">Explore</button>
    `;

    cardsContainer.appendChild(card);
  });
}

loadEmpires();
