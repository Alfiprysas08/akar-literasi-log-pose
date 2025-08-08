// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Konfigurasi Firebase (gunakan environment variable di deploy)
const firebaseConfig = {
  apiKey: "AIzaSyCGAfoc8abAW5cf-7qskhXRYb66r-3N4iU",
  authDomain: "akar-literasi-log-pose.firebaseapp.com",
  databaseURL: "https://akar-literasi-log-pose-default-rtdb.firebaseio.com",
  projectId: "akar-literasi-log-pose",
  storageBucket: "akar-literasi-log-pose.appspot.com",
  messagingSenderId: "746730519957",
  appId: "1:746730519957:web:e085cc4d9185c24201ca9c",
  measurementId: "G-7HF9FGMMV8"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Realtime Database
const database = getDatabase(app);

// Ekspor
export { app, database };
