function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return; // prevents errors on pages without sidebar

  sidebar.style.display =
    sidebar.style.display === "block" ? "none" : "block";
}

/* Search feature */
const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("keyup", function () {
    const value = searchInput.value.toLowerCase();

    if (value === "mali") {
      window.location.href = "mali.html";
    } else if (value === "egypt") {
      window.location.href = "egypt.html";
    } else if (value === "songhai") {
      window.location.href = "songhai.html";
    }
  });
}
