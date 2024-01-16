// Get the elements from the document
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskButton = document.getElementById("task-button");
const taskList = document.getElementById("task-list");
const clearButton = document.getElementById("clear-button");

// Load the tasks from the local storage
loadTasks();

// Add an event listener to the form
taskForm.addEventListener("submit", function (event) {
  // Prevent the default behavior of the form
  event.preventDefault();
  // Get the value of the input
  const task = taskInput.value;
  // Check if the input is not empty
  if (task) {
    // Create a new task element
    const taskElement = createTaskElement(task);
    // Append the task element to the list
    taskList.appendChild(taskElement);
    // Clear the input value
    taskInput.value = "";
    // Save the task to the local storage
    saveTask(task);
  }
});

// Add an event listener to the list
taskList.addEventListener("click", function (event) {
  // Get the target element
  const target = event.target;
  // Check if the target is a checkbox
  if (target.type === "checkbox") {
    // Get the parent element
    const parent = target.parentElement;
    // Toggle the completed class
    parent.classList.toggle("completed");
    // Update the local storage
    updateTasks();
  }
});

// Add an event listener to the clear button
clearButton.addEventListener("click", function () {
  // Loop through the list items
  for (let i = taskList.children.length - 1; i >= 0; i--) {
    // Get the current item
    const item = taskList.children[i];
    // Check if the item is completed
    if (item.classList.contains("completed")) {
      // Remove the item from the list
      taskList.removeChild(item);
    }
  }
  // Update the local storage
  updateTasks();
});

// A function to create a task element
function createTaskElement(task) {
  // Create a list item
  const li = document.createElement("li");
  // Create a checkbox input
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  // Create a text node
  const text = document.createTextNode(task);
  // Append the checkbox and the text to the list item
  li.appendChild(checkbox);
  li.appendChild(text);
  // Return the list item
  return li;
}

// A function to save a task to the local storage
function saveTask(task) {
  // Get the tasks from the local storage
  let tasks = localStorage.getItem("tasks");
  // Check if the tasks is null
  if (tasks === null) {
    // Initialize an empty array
    tasks = [];
  } else {
    // Parse the tasks as an array
    tasks = JSON.parse(tasks);
  }
  // Push the new task to the array
  tasks.push(task);
  // Stringify the array and store it in the local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// A function to load the tasks from the local storage
function loadTasks() {
  // Get the tasks from the local storage
  let tasks = localStorage.getItem("tasks");
  // Check if the tasks is not null
  if (tasks !== null) {
    // Parse the tasks as an array
    tasks = JSON.parse(tasks);
    // Loop through the tasks
    for (let task of tasks) {
      // Create a task element
      const taskElement = createTaskElement(task);
      // Append the task element to the list
      taskList.appendChild(taskElement);
    }
  }
}

// A function to update the tasks in the local storage
function updateTasks() {
  // Initialize an empty array
  let tasks = [];
  // Loop through the list items
  for (let item of taskList.children) {
    // Get the task text
    let task = item.textContent;
    // Push the task to the array
    tasks.push(task);
  }
  // Stringify the array and store it in the local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
