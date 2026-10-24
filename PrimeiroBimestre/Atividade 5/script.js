const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const taskCount = document.getElementById("taskCount");
const clearButton = document.getElementById("clearButton");
const filter = document.getElementById("filter");
const searchInput = document.getElementById("searchInput");
const message = document.getElementById("message");

let tasks = JSON.parse(sessionStorage.getItem("tasks")) || [];
let nextId = Number(sessionStorage.getItem("nextId")) || 1;

function saveTasks() {
  sessionStorage.setItem("tasks", JSON.stringify(tasks));
  sessionStorage.setItem("nextId", nextId);
}

function showMessage(text) {
  message.textContent = text;

  setTimeout(function () {
    message.textContent = "";
  }, 2500);
}

function getPriority(tipo) {
  if (tipo == "Urgente") {
    return 1;
  } else if (tipo == "Prioritário") {
    return 2;
  } else {
    return 3;
  }
}

function updateScreen() {
  taskList.innerHTML = "";

  let orderedTasks = [];
  const search = searchInput.value.toLowerCase();

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].text.toLowerCase().includes(search)) {
      orderedTasks.push(tasks[i]);
    }
  }

  if (filter.value == "prioridade") {
    orderedTasks.sort(function (a, b) {
      return getPriority(a.priority) - getPriority(b.priority);
    });
  } else if (filter.value == "recentes") {
    orderedTasks.sort(function (a, b) {
      return b.id - a.id;
    });
  } else {
    orderedTasks.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  for (let i = 0; i < orderedTasks.length; i++) {
    const task = orderedTasks[i];

    const li = document.createElement("li");
    li.className = "task";

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;

    const priority = document.createElement("span");
    priority.className = "priority";

    if (task.priority == "Urgente") {
      priority.classList.add("priority-urgent");
    } else if (task.priority == "Prioritário") {
      priority.classList.add("priority-priority");
    } else {
      priority.classList.add("priority-normal");
    }

    priority.textContent = task.priority;

    const editButton = document.createElement("button");
    editButton.className = "task-button edit-button";
    editButton.textContent = "Editar";

    editButton.addEventListener("click", function () {
      editTask(task.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "task-button delete-button";
    deleteButton.textContent = "Excluir";

    deleteButton.addEventListener("click", function () {
      deleteTask(task.id);
    });

    li.appendChild(span);
    li.appendChild(priority);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  }

  if (orderedTasks.length == 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }

  taskCount.textContent = orderedTasks.length;
}

function addTask() {
  const text = taskInput.value.trim();

  if (text == "") {
    showMessage("Digite uma tarefa antes de adicionar.");
    taskInput.focus();
    return;
  }

  const newTask = {
    id: nextId,
    text: text,
    priority: priorityInput.value
  };

  nextId++;

  tasks.push(newTask);

  saveTasks();

  taskInput.value = "";
  taskInput.focus();

  updateScreen();
}

function editTask(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      const newText = prompt("Edite sua tarefa:", tasks[i].text);

      if (newText == null) {
        return;
      }

      if (newText.trim() == "") {
        showMessage("A tarefa não pode ficar vazia.");
        return;
      }

      tasks[i].text = newText.trim();

      saveTasks();
      updateScreen();

      return;
    }
  }
}

function deleteTask(id) {
  const confirmed = confirm("Deseja realmente excluir esta tarefa?");

  if (!confirmed) {
    return;
  }

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks.splice(i, 1);
      break;
    }
  }

  saveTasks();
  updateScreen();
}

function clearTasks() {
  if (tasks.length == 0) {
    showMessage("Não há tarefas para limpar.");
    return;
  }

  const confirmed = confirm("Deseja excluir todas as tarefas?");

  if (confirmed) {
    tasks = [];
    sessionStorage.removeItem("tasks");
    sessionStorage.removeItem("nextId");
    nextId = 1;

    updateScreen();
  }
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    addTask();
  }
});

clearButton.addEventListener("click", clearTasks);

filter.addEventListener("change", updateScreen);

searchInput.addEventListener("input", updateScreen);

updateScreen();