// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create list item
        const li = document.createElement("li");
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";
        removeBtn.onclick = () => taskList.removeChild(li);

        // Add remove button to task
        li.appendChild(removeBtn);

        // Add task to list
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";
    }

    // Add task when button clicked
    addButton.addEventListener("click", addTask);

    // Add task when pressing Enter
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });
});
