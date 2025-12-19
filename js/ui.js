import { signOut, getCurrentUser } from "./auth.js";
import { MOCK_EMPIRES } from "./mock_data.js";


export async function initNavbar() {
    const user = await getCurrentUser();
    const navRight = document.querySelector(".nav-right");

    if (!navRight) return;

    
    const oldBtn = document.getElementById("auth-btn");
    if (oldBtn) oldBtn.remove();

    if (user) {
        const logoutBtn = document.createElement("a");
        logoutBtn.href = "#";
        logoutBtn.textContent = "Logout";
        logoutBtn.id = "auth-btn";
        logoutBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            await signOut();
            window.location.href = "login.html";
        });
        navRight.appendChild(logoutBtn);
    } else {
        const loginLink = document.createElement("a");
        loginLink.href = "login.html";
        loginLink.textContent = "Login / Sign up";
        loginLink.id = "auth-btn";
        navRight.appendChild(loginLink);
    }
}


export async function initSidebar() {
    console.log("Initializing Sidebar (Offline Mode)...");
    const menuBtn = document.querySelector(".menu-btn");
    const sidebar = document.getElementById("sidebar");
    const sidebarList = document.getElementById("sidebar-list");

    if (!menuBtn || !sidebar) {
        console.warn("Sidebar elements missing:", { menuBtn, sidebar });
        return;
    }

    
    menuBtn.onclick = (e) => { 
        console.log("Menu clicked");
        e.stopPropagation();
        sidebar.classList.toggle("open");
    };

    
    document.onclick = (e) => {
        if (!sidebar.contains(e.target) && !menuBtn.contains(e.target) && sidebar.classList.contains("open")) {
            sidebar.classList.remove("open");
        }
    };

    
    if (MOCK_EMPIRES && MOCK_EMPIRES.length > 0) {
        sidebarList.innerHTML = "";
        MOCK_EMPIRES.forEach(emp => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = `empire.html?slug=${emp.slug}`;
            a.textContent = emp.name;
            li.appendChild(a);
            sidebarList.appendChild(li);
        });
    } else {
        sidebarList.innerHTML = "<li>No data</li>";
    }
}

export function initSearch() {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

    searchInput.addEventListener("keydown", async (e) => {
        if (e.key === "Enter") {
            const query = searchInput.value.trim().toLowerCase();
            if (!query) return;

            const empire = MOCK_EMPIRES.find(e => e.name.toLowerCase().includes(query));

            if (empire) {
                window.location.href = `empire.html?slug=${empire.slug}`;
            } else {
                alert("No empire found with that name.");
            }
        }
    });
}

export async function initUI() {
    try {
        await initNavbar();
        await initSidebar();
        initSearch();
    } catch (err) {
        console.error("Error initializing UI:", err);
    }
}
