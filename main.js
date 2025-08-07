// ======================
// Login dan Logout
// ======================

function login(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "akar" && password === "literasi") {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "index.html";
  } else {
    const errorMsg = document.getElementById("login-error");
    if (errorMsg) {
      errorMsg.textContent = "Username atau password salah!";
    }
  }
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}

// ======================
// Navigasi Tab
// ======================

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
    if (tabId === "home") {
      kapal.classList.remove("hidden");
    } else {
      kapal.classList.add("hidden");
    }
  }
}

// ======================
// Proteksi Akses (Opsional)
// ======================

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname;

  // Cek login saat masuk ke halaman index.html
  if (currentPage.includes("index.html")) {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      window.location.href = "login.html";
    }
  }

  // Event listener tombol logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
});
