// Fungsi untuk update jam setiap detik
function updateClock() {
  const clock = document.getElementById('clock');
  const now = new Date();
  clock.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000); // Update jam tiap 1 detik

// Fungsi untuk menambah form baru di bawah form yang ada
function addForm() {
  const formContainer = document.getElementById('formContainer');
  const newForm = document.createElement('div');
  newForm.innerHTML = `
      <label for="nama">Nama:</label>
      <input type="text" name="nama" placeholder="Masukkan nama" required oninput="this.value = this.value.toUpperCase()" />
  
      <label for="nim">NIM:</label>
      <input type="text" name="nim" placeholder="Masukkan NIM" required />
  
      <label for="jenis_kelamin">Jenis Kelamin:</label>
      <select name="jenis_kelamin" required>
        <option value="">Pilih jenis kelamin</option>
        <option value="Laki-Laki">Laki-Laki</option>
        <option value="Perempuan">Perempuan</option>
      </select>
    `;
  formContainer.appendChild(newForm);
}

// Fungsi untuk submit form
function submitForm() {
  alert('Selamat, data telah berhasil disimpan');
  location.reload(); // Refresh halaman
}

// Event listener untuk tombol Tambah Form Baru
document.getElementById('addFormButton').addEventListener('click', addForm);

// Event listener untuk tombol Submit
document.getElementById('submitButton').addEventListener('click', submitForm);
