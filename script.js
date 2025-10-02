// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Element references
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    /* -----------------------------
       Local Storage helpers
       ----------------------------- */
    function getStoredTasks() {
        try {
            return JSON.parse(localStorage.getItem('tasks') || '[]');
        } catch (e) {
            // If malformed data, reset storage
            localStorage.removeItem('tasks');
            return [];
        }
    }

    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /* -----------------------------
       Create task DOM element
       taskObj: { id: string, text: string }
       save: if true, append to storage
       ----------------------------- */
    function createTaskElement(taskObj, save = true) {
        // li element
        const li = document.createElement("li");
        li.dataset.id = taskObj.id;

        // text span
        const span = document.createElement("span");
        span.textContent = taskObj.text;
        li.appendChild(span);

        // remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";
        removeBtn.addEventListener("click", () => {
            // remove from DOM
            taskList.removeChild(li);
            // remove from storage
            const tasks = getStoredTasks();
            const updated = tasks.filter(t => t.id !== taskObj.id);
            saveTasks(updated);
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Optionally save to localStorage
        if (save) {
            const tasks = getStoredTasks();
            tasks.push(taskObj);
            saveTasks(tasks);
        }
    }

    /* -----------------------------
       Add a new task (from input)
       ----------------------------- */
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        const taskObj = {
            id: Date.now().toString(), // simple unique id
            text: taskText
        };

        createTaskElement(taskObj, true);
        taskInput.value = "";
        taskInput.focus();
    }

    /* -----------------------------
       Load tasks from localStorage and render
       ----------------------------- */
    function loadTasks() {
        const storedTasks = getStoredTasks();
        // Clear current list (in case)
        taskList.innerHTML = "";
        storedTasks.forEach(task => {
            // ensure structure: if older format (string), convert
            if (typeof task === "string") {
                createTaskElement({ id: Date.now().toString() + Math.random(), text: task }, true);
            } else {
                createTaskElement(task, false); // already saved, don't save again
            }
        });
    }

    // Attach event listeners
    addButton.addEventListener("click", addTask);

    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });

    // Load tasks initially
    loadTasks();
});
