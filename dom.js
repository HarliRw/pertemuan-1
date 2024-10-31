function addTask() {
  const taskInput = document.getElementById('taskInput');
  const deadlineInput = document.getElementById('deadlineInput');
  const taskText = taskInput.value.trim();
  const deadline = deadlineInput.value;

  if (taskText === '') return;

  const taskItem = document.createElement('li');

  const taskInfo = document.createElement('div');
  taskInfo.className = 'task-info';

  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;

  const deadlineSpan = document.createElement('span');
  deadlineSpan.className = 'deadline';
  deadlineSpan.textContent = deadline ? `Tenggat Waktu: ${deadline}` : 'Tidak ada tenggat waktu';

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.className = 'edit';
  editButton.onclick = function () {
    editTask(taskSpan, deadlineSpan);
  };

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Hapus';
  deleteButton.className = 'delete';
  deleteButton.onclick = function () {
    deleteTask(taskItem);
  };

  taskInfo.appendChild(taskSpan);
  taskInfo.appendChild(deadlineSpan);
  taskItem.appendChild(taskInfo);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);

  document.getElementById('taskList').appendChild(taskItem);
  taskInput.value = '';
  deadlineInput.value = '';
}

function editTask(taskSpan, deadlineSpan) {
  const newTaskText = prompt('Edit tugas:', taskSpan.textContent);
  const newDeadline = prompt('Edit tenggat waktu (YYYY-MM-DD):', deadlineSpan.textContent.split(': ')[1]);

  if (newTaskText !== null && newTaskText.trim() !== '') {
    taskSpan.textContent = newTaskText.trim();
  }
  if (newDeadline !== null && newDeadline.trim() !== '') {
    deadlineSpan.textContent = `Tenggat Waktu: ${newDeadline.trim()}`;
  }
}

function deleteTask(taskItem) {
  taskItem.remove();
}
