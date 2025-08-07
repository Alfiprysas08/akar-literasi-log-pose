// materi.js
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
import { database } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector("#materi-table tbody");

  // Menampilkan data dari Firebase
  const materiRef = ref(database, 'materi');
  onValue(materiRef, (snapshot) => {
    tableBody.innerHTML = "";
    const data = snapshot.val();
    for (let id in data) {
      const row = data[id];
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${row.nama || ""}</td>
        <td><input type="number" value="${row.status || 0}" data-id="${id}" class="input-status" />%</td>
        <td>
          <select data-id="${id}" class="select-pemateri">
            ${["Mim", "Ibhoy", "Rangga", "Alfi", "Beni", "Fauzi", "Jihan", "Saepul"].map(p => `
              <option value="${p}" ${row.pemateri === p ? "selected" : ""}>${p}</option>
            `).join("")}
          </select>
        </td>
        <td><input type="url" value="${row.link || ""}" data-id="${id}" class="input-link" /></td>
      `;
      tableBody.appendChild(tr);
    }
  });

  // Auto-update ke Firebase saat ada perubahan
  document.addEventListener("change", (e) => {
    const id = e.target.getAttribute("data-id");
    if (!id) return;

    const rowRef = ref(database, `materi/${id}`);

    const statusInput = document.querySelector(`.input-status[data-id="${id}"]`);
    const pemateriSelect = document.querySelector(`.select-pemateri[data-id="${id}"]`);
    const linkInput = document.querySelector(`.input-link[data-id="${id}"]`);

    set(rowRef, {
      nama: "", // Nama tidak diedit di sini
      status: parseInt(statusInput.value),
      pemateri: pemateriSelect.value,
      link: linkInput.value
    });
  });
});
