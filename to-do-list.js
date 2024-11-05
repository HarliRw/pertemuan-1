const apiUrl = 'https://api.freeapi.app/api/v1/todos';

// Fungsi untuk mengambil semua data Todo yang belum selesai
async function getAllIncompleteTodos() {
  try {
    const response = await fetch(`${apiUrl}?complete=false`, { method: 'GET' });
    const todos = await response.json();
    displayTodos(todos.data);
  } catch (error) {
    console.error('Error mengambil todos:', error);
  }
}

// Fungsi untuk menampilkan daftar Todo di halaman
function displayTodos(todos) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  todos.forEach((todo) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${todo.title}</strong> - ${todo.description || 'Tidak ada deskripsi'}
      <button class="edit" onclick="updateTodoById(${todo.id})">Edit</button>
      <button class="delete" onclick="deleteTodoById(${todo.id})">Delete</button>
    `;
    taskList.appendChild(listItem);
  });
}

// Fungsi untuk menampilkan data saat tombol "Lihat semua data" ditekan
async function showAllData() {
  const taskList = document.getElementById('taskList');
  // Cek jika data belum ditampilkan
  if (taskList.innerHTML === '') {
    await getAllIncompleteTodos();
  }
}

// Fungsi untuk menambahkan tugas baru
async function addTask() {
  const title = document.getElementById('taskTitle').value.trim();
  const description = document.getElementById('taskDescription').value.trim();

  if (!title || !description) {
    alert('Judul dan deskripsi tidak boleh kosong!');
    return;
  }

  const newTodo = { title, description, completed: false };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });
    if (response.ok) {
      alert('Todo berhasil ditambahkan');
      document.getElementById('taskTitle').value = '';
      document.getElementById('taskDescription').value = '';
    }
  } catch (error) {
    console.error('Error menambah todo:', error);
  }
}

// Fungsi untuk memperbarui Todo berdasarkan ID
async function updateTodoById(id) {
  const newTitle = prompt('Masukkan judul baru:').trim();
  const newDescription = prompt('Masukkan deskripsi baru:').trim();

  if (!newTitle || !newDescription) {
    alert('Judul dan deskripsi tidak boleh kosong!');
    return;
  }

  const updatedData = { title: newTitle, description: newDescription };

  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    if (response.ok) {
      alert('Todo berhasil diperbarui');
      getAllIncompleteTodos();
    }
  } catch (error) {
    console.error('Error memperbarui todo:', error);
  }
}

// Fungsi untuk menghapus Todo berdasarkan ID
async function deleteTodoById(id) {
  if (!confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    if (response.ok) {
      alert('Todo berhasil dihapus');
      getAllIncompleteTodos();
    } else {
      console.error('Gagal menghapus todo');
    }
  } catch (error) {
    console.error('Error menghapus todo:', error);
  }
}

// Fungsi untuk mencari Todo berdasarkan query
async function searchTodos() {
  const query = document.getElementById('searchQuery').value.trim();
  if (!query) {
    alert('Masukkan kata kunci untuk mencari!');
    return;
  }

  try {
    const response = await fetch(`${apiUrl}?query=${encodeURIComponent(query)}&complete=false`, { method: 'GET' });
    const todos = await response.json();
    displayTodos(todos.data);
  } catch (error) {
    console.error('Error mencari todos:', error);
  }
}
