// MOCK AUTH SERVICE -- DEMO MODE
// import { supabase } from "./supabase.js"; // Désactivé

export async function signUp(email, password) {
  // Simulate success
  return { data: { session: { user: { email } } }, error: null };
}

export async function signIn(email, password) {
  // Simulate success
  localStorage.setItem("demo_user", JSON.stringify({ email }));
  return { data: { session: { user: { email } } }, error: null };
}

export async function signOut() {
  localStorage.removeItem("demo_user");
  return { error: null };
}

export async function getCurrentUser() {
  const userStr = localStorage.getItem("demo_user");
  return userStr ? JSON.parse(userStr) : null;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    window.location.href = "login.html";
  }
}

export async function redirectIfLoggedIn() {
  const user = await getCurrentUser();
  if (user) {
    window.location.href = "index.html";
  }
}
