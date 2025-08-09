// Referensi Database
const db = firebase.database();

// Data Materi
const materiData = {
  strategi: [
    "Memaknai arti kata sukses",
    "Keresahan sebagai kekuatan",
    "Motivasi belajar",
    "Life is the choice",
    "Luka pengasuhan",
    "Leadership mastery",
    "Sang mentor",
    "Kecerdasan emosional",
    "Outdoor learning",
    "Manajemen waktu",
    "Manajemen amal",
    "Manajemen keuangan",
    "Manajemen konflik",
    "Personal branding",
    "Agent of change",
    "Good followership",
    "Dunia adalah permainan"
  ],
  leadership: [],
  "public-speaking": []
};

// Event Listener tombol materi
document.querySelectorAll('.materi-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');
    showMateri(target);
  });
});

// Menampilkan tabel materi
function showMateri(key) {
  const detailSection = document.getElementById('materi-detail');
  const title = document.getElementById('materi-title');
  const tbody = document.getElementById('materi-table-body');

  title.textContent = key.replace('-', ' ').toUpperCase();
  tbody.innerHTML = '';

  const pemateriOptions = ["Mim", "Ibhoy", "Rangga", "Alfi", "Beni", "Fauzi", "Jihan", "Saepul"];

  // Ambil data dari Firebase
  db.ref(`materi/${key}`).once("value").then(snapshot => {
    const savedData = snapshot.val() || {};

    materiData[key].forEach(nama => {
      const status = savedData[nama]?.status || "";
      const pemateri = savedData[nama]?.pemateri || "";

      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${nama}</td>
        <td><input type="text" value="${status}" placeholder="Status"></td>
        <td>
          <select>
            <option value="">-- Pilih Pemateri --</option>
            ${pemateriOptions.map(opt => `<option value="${opt}" ${opt === pemateri ? "selected" : ""}>${opt}</option>`).join('')}
          </select>
        </td>
      `;

      tbody.appendChild(row);
    });

    // Tambahkan tombol Save
    addSaveButton(key);
  });

  detailSection.style.display = 'block';
}

// Fungsi untuk menambahkan tombol Save
function addSaveButton(key) {
  // Hapus tombol Save sebelumnya
  const oldBtn = document.getElementById('save-btn');
  if (oldBtn) oldBtn.remove();

  const saveBtn = document.createElement('button');
  saveBtn.id = 'save-btn';
  saveBtn.textContent = '💾 Simpan ke Firebase';
  saveBtn.style.marginTop = '10px';
  saveBtn.style.padding = '10px';
  saveBtn.style.backgroundColor = '#28a745';
  saveBtn.style.color = 'white';
  saveBtn.style.border = 'none';
  saveBtn.style.cursor = 'pointer';
  saveBtn.style.borderRadius = '5px';

  saveBtn.addEventListener('click', () => saveMateri(key));

  document.getElementById('materi-detail').appendChild(saveBtn);
}

// Fungsi untuk menyimpan data ke Firebase
function saveMateri(key) {
  const rows = document.querySelectorAll('#materi-table-body tr');
  const dataToSave = {};

  rows.forEach(row => {
    const nama = row.children[0].textContent;
    const status = row.children[1].querySelector('input').value;
    const pemateri = row.children[2].querySelector('select').value;

    dataToSave[nama] = { status, pemateri };
  });

  db.ref(`materi/${key}`).set(dataToSave)
    .then(() => {
      alert('✅ Data berhasil disimpan!');
    })
    .catch(err => {
      console.error(err);
      alert('❌ Gagal menyimpan data!');
    });
}
