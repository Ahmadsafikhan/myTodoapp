const input = document.getElementById("todoInput");
const Btn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const searchInput = document.getElementById("searchInput");
const tasks = todoList.getElementsByClassName("task");

Btn.addEventListener("click", handleAddButton);

searchInput.addEventListener("input", function () {
  const searchQuery = searchInput.value.toLowerCase();

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const taskText = task.querySelector(".taskText").textContent.toLowerCase();

    if (taskText.includes(searchQuery)) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  }
});

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(function (taskText) {
    addTask(taskText);
  });
});

function handleAddButton() {
  const taskText = input.value;
  if (taskText !== "") {
    addTask(taskText);
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
  }
  input.value = "";
}

function addTask(taskText) {
  const newTask = document.createElement("li");
  newTask.className = "task";
  newTask.innerHTML =
    // `<li><p>${taskText}</p>
    // <button class="deleteBtn">Delete</button></li>`
    `
    <div class="sectionTask">
      <span class="taskText">${taskText}</span>
      <div class="buttonGroup">
        <button class="deleteBtn">Delete</button>
        <button class="completeBtn">Complete</button>
      </div>
    </div>
  `;
  todoList.appendChild(newTask);
  //   todoList.addEventListener("click", function (e) {
  //     if (e.target.classList.contains("delete")) {
  //       const taskItem = e.target.parentNode;
  //       taskItem.parentNode.removeChild(taskItem);
  //     }
  //   });
;
  const taskTextElement = newTask.querySelector(".taskText");

  const deleteBtn = newTask.querySelector(".deleteBtn");
  deleteBtn.addEventListener("click", function () {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = savedTasks.indexOf(taskText);
    if (taskIndex > -1) {
      savedTasks.splice(taskIndex, 1);
      localStorage.setItem("tasks", JSON.stringify(savedTasks));
    }

    newTask.remove();
  });

  const completeBtn = newTask.querySelector(".completeBtn");
  completeBtn.addEventListener("click", function () {
    taskTextElement.classList.toggle("completed");
    if (taskTextElement.classList.contains("completed")) {
      completeBtn.textContent = "Uncomplete";
    } else {
      completeBtn.textContent = "Complete";
    }
  });
}
