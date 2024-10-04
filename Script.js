document.addEventListener("DOMContentLoaded", loadTasks);

const form = document.getElementById("todo-form");
const tasksContainer = document.getElementById("tasks");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask();
});

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach((task) => displayTask(task));
}

function addTask() {
    const date = document.getElementById("todo-date").value;
    const taskText = document.getElementById("todo-task").value;

    if (date && taskText) {
        const task = { date, taskText };
        displayTask(task);
        saveTaskToLocalStorage(task);
        form.reset();
    }
}

function displayTask(task) {
    const taskElement = document.createElement("li");

    const taskContent = document.createElement("span");
    taskContent.classList.add("task-text");
    taskContent.innerText = `${task.date}: ${task.taskText}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
        deleteTask(taskElement, task);
    });

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", () => {
        editTask(taskElement, task);
    });

    taskElement.appendChild(taskContent);
    taskElement.appendChild(editBtn);
    taskElement.appendChild(deleteBtn);
    tasksContainer.appendChild(taskElement);
}

function saveTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    return localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks"))
        : [];
}

function deleteTask(taskElement, task) {
    taskElement.remove();
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(t => t.date !== task.date || t.taskText !== task.taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function editTask(taskElement, task) {
    document.getElementById("todo-date").value = task.date;
    document.getElementById("todo-task").value = task.taskText;
    deleteTask(taskElement, task);
}
