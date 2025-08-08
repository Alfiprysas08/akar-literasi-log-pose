import { getDatabase, ref, push, update, onValue } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
import { database } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector("#materi-table tbody");

  if (!tableBody) {
    console.error("❌ Elemen #materi-table tbody tidak ditemukan");
    return;
  }

  const materiRef = ref(database, 'materi');

  // Ambil dan render data dari Firebase
  onValue(materiRef, (snapshot) => {
    tableBody.innerHTML = "";
    const data = snapshot.val() || {};

    // Render data yang sudah ada
    Object.keys(data).forEach(id => {
      const row = data[id];
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${row.nama || ""}</td>
        <td><input type="number" min="0" max="100" value="${row.status ?? 0}" data-id="${id}" class="input-status" />%</td>
        <td>
          <select data-id="${id}" class="select-pemateri">
            ${["Mim", "Ibhoy", "Rangga", "Alfi", "Beni", "Fauzi", "Jihan", "Saepul"]
              .map(p => `<option value="${p}" ${row.pemateri === p ? "selected" : ""}>${p}</option>`)
              .join("")}
          </select>
        </td>
        <td><input type="url" value="${row.link || ""}" data-id="${id}" class="input-link" placeholder="https://..." /></td>
      `;
      tableBody.appendChild(tr);
    });

    // Tambahkan baris input untuk data baru
    const trNew = document.createElement("tr");
    trNew.innerHTML = `
      <td><input type="text" id="new-nama" placeholder="Nama Materi" /></td>
      <td><input type="number" id="new-status" min="0" max="100" value="0" />%</td>
      <td>
        <select id="new-pemateri">
          ${["Mim", "Ibhoy", "Rangga", "Alfi", "Beni", "Fauzi", "Jihan", "Saepul"]
            .map(p => `<option value="${p}">${p}</option>`)
            .join("")}
        </select>
      </td>
      <td>
        <input type="url" id="new-link" placeholder="https://..." />
        <button id="btn-add">Tambah</button>
      </td>
    `;
    tableBody.appendChild(trNew);

    // Event tombol tambah
    document.getElementById("btn-add").addEventListener("click", () => {
      const nama = document.getElementById("new-nama").value.trim();
      const status = parseInt(document.getElementById("new-status").value) || 0;
      const pemateri = document.getElementById("new-pemateri").value;
      const link = document.getElementById("new-link").value.trim();

      if (!nama) {
        alert("⚠️ Nama materi tidak boleh kosong!");
        return;
      }

      push(materiRef, {
        nama,
        status,
        pemateri,
        link
      })
      .then(() => {
        console.log("✅ Materi baru ditambahkan");
        // Kosongkan form input
        document.getElementById("new-nama").value = "";
        document.getElementById("new-status").value = 0;
        document.getElementById("new-pemateri").value = "Mim";
        document.getElementById("new-link").value = "";
      })
      .catch(err => {
        console.error("❌ Gagal menambah materi:", err);
      });
    });
  });

  // Update data saat ada perubahan
  tableBody.addEventListener("change", (e) => {
    const id = e.target.getAttribute("data-id");
    if (!id) return;

    const statusValue = parseInt(document.querySelector(`.input-status[data-id="${id}"]`)?.value) || 0;
    const pemateriValue = document.querySelector(`.select-pemateri[data-id="${id}"]`)?.value || "";
    const linkValue = document.querySelector(`.input-link[data-id="${id}"]`)?.value || "";

    const statusValid = Math.max(0, Math.min(100, statusValue));

    update(ref(database, `materi/${id}`), {
      status: statusValid,
      pemateri: pemateriValue,
      link: linkValue
    })
    .then(() => {
      console.log(`✅ Data materi/${id} berhasil diperbarui`);
    })
    .catch(err => {
      console.error(`❌ Gagal update materi/${id}:`, err);
    });
  });
});
