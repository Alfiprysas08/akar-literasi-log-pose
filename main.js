// Fungsi login
function login(event) {
  event.preventDefault(); // cegah reload halaman

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("login-error");

  // Username & password default
  const validUsername = "akar";
  const validPassword = "literasi";

  if (username === validUsername && password === validPassword) {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "index.html"; // pindah ke halaman utama
  } else {
    errorMsg.textContent = "Username atau password salah!";
  }
}

// Fungsi logout
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}

// Fungsi untuk menampilkan tab
function showTab(tabId) {
  const tabs = document.querySelectorAll(".tab-content");
  tabs.forEach(tab => tab.classList.remove("active"));

  const activeTab = document.getElementById(tabId);
  if (activeTab) {
    activeTab.classList.add("active");
  }

  // Tampilkan kapal hanya di tab home
  const kapal = document.getElementById("kapalLayar");
  if (kapal) {
    kapal.classList.toggle("hidden", tabId !== "home");
  }
}

// Supaya fungsi bisa dipanggil dari HTML
window.login = login;
window.logout = logout;
window.showTab = showTab;
