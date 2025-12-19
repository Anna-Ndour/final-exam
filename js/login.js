import { signIn, signUp, redirectIfLoggedIn } from "./auth.js";

// Rediriger si déjà connecté
redirectIfLoggedIn();

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const formTitle = document.getElementById("form-title");
const toggleText = document.getElementById("toggle-text");
const errorBox = document.getElementById("error-box");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submit-btn");

let isLoginMode = true;

function toggleMode() {
    isLoginMode = !isLoginMode;
    if (isLoginMode) {
        formTitle.textContent = "Login";
        submitBtn.textContent = "Login";
        toggleText.innerHTML = "Don't have an account? <span id='toggle-link'>Sign up</span>";
    } else {
        formTitle.textContent = "Sign Up";
        submitBtn.textContent = "Sign Up";
        toggleText.innerHTML = "Already have an account? <span id='toggle-link'>Login</span>";
    }

    // Re-attach event listener to the new span
    document.getElementById("toggle-link").addEventListener("click", toggleMode);
    errorBox.textContent = "";
}

// Initial listener
document.getElementById("toggle-link").addEventListener("click", toggleMode);

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorBox.textContent = "Loading...";

    const email = emailInput.value;
    const password = passwordInput.value;

    let result;

    if (isLoginMode) {
        result = await signIn(email, password);
    } else {
        result = await signUp(email, password);
    }

    const { data, error } = result;

    if (error) {
        errorBox.textContent = error.message;
    } else {
        if (!isLoginMode && !data.session) {
            // Cas où le signUp demande une confirmation email, selon config Supabase
            errorBox.textContent = "Account created! Please check your email if confirmation is required, or try logging in.";
        } else {
            window.location.href = "index.html";
        }
    }
});
