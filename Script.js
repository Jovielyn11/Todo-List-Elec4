// Select form elements
const todoForm = document.querySelector('#todo-form');
const todoList = document.querySelector('#todo-list');
const taskInput = document.querySelector('#task-input');
const dateInput = document.querySelector('#date-input');

// Load tasks from localStorage on page load
window.addEventListener('DOMContentLoaded', loadStoredTasks);

// Add new task on form submission
todoForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
    e.preventDefault();
    
    const task = taskInput.value.trim();
    const date = dateInput.value;

    if (task && date) {
        addTaskToList(task, date);
        saveTaskToStorage(task, date);
        todoForm.reset();  // Clear input fields after submission
    }
}

// Load tasks from localStorage
function loadStoredTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(({ task, date }) => addTaskToList(task, date));
}

// Add task to the list
function addTaskToList(task, date) {
    const li = document.createElement('li');
    li.innerHTML = `
        ${date} - ${task} 
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    `;
    todoList.appendChild(li);

    // Set up buttons for edit and delete
    li.querySelector('.delete').addEventListener('click', () => deleteTask(li, task));
    li.querySelector('.edit').addEventListener('click', () => editTask(li, task, date));
}

// Save task to localStorage
function saveTaskToStorage(task, date) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ task, date });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete task from list and storage
function deleteTask(li, task) {
    li.remove();
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const updatedTasks = tasks.filter(t => t.task !== task);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Edit task
function editTask(li, task, date) {
    taskInput.value = task;
    dateInput.value = date;
    deleteTask(li, task);  // Remove the old task while editing
}
