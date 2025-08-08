import { getDatabase, ref, update, onValue } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
import { database } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector("#materi-table tbody");

  // Ambil data dari Firebase
  const materiRef = ref(database, 'materi');
  onValue(materiRef, (snapshot) => {
    tableBody.innerHTML = "";
    const data = snapshot.val() || {};

    for (let id in data) {
      const row = data[id];
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${row.nama || ""}</td>
        <td><input type="number" min="0" max="100" value="${row.status || 0}" data-id="${id}" class="input-status" />%</td>
        <td>
          <select data-id="${id}" class="select-pemateri">
            ${["Mim", "Ibhoy", "Rangga", "Alfi", "Beni", "Fauzi", "Jihan", "Saepul"]
              .map(p => `<option value="${p}" ${row.pemateri === p ? "selected" : ""}>${p}</option>`)
              .join("")}
          </select>
        </td>
        <td><input type="url" value="${row.link || ""}" data-id="${id}" class="input-link" placeholder="https://..." /></td>
        <td><button class="save-btn" data-id="${id}">Save</button></td>
      `;
      tableBody.appendChild(tr);
    }
  });

  // Event tombol Save
  tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("save-btn")) {
      const id = e.target.getAttribute("data-id");
      if (!id) return;

      const statusInput = document.querySelector(`.input-status[data-id="${id}"]`);
      const pemateriSelect = document.querySelector(`.select-pemateri[data-id="${id}"]`);
      const linkInput = document.querySelector(`.input-link[data-id="${id}"]`);

      update(ref(database, `materi/${id}`), {
        status: parseInt(statusInput.value) || 0,
        pemateri: pemateriSelect.value,
        link: linkInput.value
      }).then(() => {
        e.target.textContent = "Saved ✅";
        setTimeout(() => {
          e.target.textContent = "Save";
        }, 1500);
      }).catch(err => {
        console.error("Gagal menyimpan:", err);
      });
    }
  });
});
