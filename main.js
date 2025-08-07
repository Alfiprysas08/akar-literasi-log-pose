function login(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "akar" && password === "literasi") {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "index.html";
  } else {
    document.getElementById("login-error").textContent = "Username atau password salah!";
  }
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}

function showTab(tabId) {
  const tabs = document.querySelectorAll(".tab-content");
  tabs.forEach(tab => tab.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");
}

function showTab(tabId) {
  const tabs = document.querySelectorAll(".tab-content");
  tabs.forEach(tab => tab.classList.remove("active"));

  const activeTab = document.getElementById(tabId);
  if (activeTab) {
    activeTab.classList.add("active");
  }

  // Tampilkan kapal hanya di tab home
  const kapal = document.getElementById("kapalLayar");
  if (tabId === "home") {
    kapal.classList.remove("hidden");
  } else {
    kapal.classList.add("hidden");
  }
}
