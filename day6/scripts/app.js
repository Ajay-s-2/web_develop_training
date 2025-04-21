document.addEventListener("DOMContentLoaded", () => {
    const createTaskBtn = document.getElementById("create-task-btn");
    const taskModal = document.getElementById("task-modal");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const taskForm = document.getElementById("task-form");
    const tasksContainer = document.getElementById("tasks-container");
    const priorityCount = {
        high: 0,
        medium: 0,
        low: 0,
    };
    let tasks = [];
    let editTaskIndex = null;

    createTaskBtn.addEventListener("click", () => {
        taskModal.classList.remove("hidden");
        taskForm.reset();
        editTaskIndex = null;
    });

    closeModalBtn.addEventListener("click", () => {
        taskModal.classList.add("hidden");
    });

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const taskName = document.getElementById("task-name").value;
        const dueDate = document.getElementById("due-date").value;
        const priority = document.getElementById("priority").value;
        const description = document.getElementById("description").value;
        const task = {
            name: taskName,
            dueDate: dueDate, // Store as ISO string
            priority,
            description,
            progress: 0,
        };
        if (editTaskIndex !== null) {
            tasks[editTaskIndex] = task;
        } else {
            tasks.push(task);
        }
        updatePriorityCount();
        renderTasks();
        taskModal.classList.add("hidden");
        taskForm.reset();
    });

    function updatePriorityCount() {
        // Reset counts
        priorityCount.high = 0;
        priorityCount.medium = 0;
        priorityCount.low = 0;

        // Count tasks by priority
        tasks.forEach((task) => {
            priorityCount[task.priority]++;
        });

        // Display counts
        console.log(`High Priority: ${priorityCount.high}`);
        console.log(`Medium Priority: ${priorityCount.medium}`);
        console.log(`Low Priority: ${priorityCount.low}`);
    }

    function renderTasks() {
        tasksContainer.innerHTML = "";
        const pendingTasksContainer = document.createElement("div");
        pendingTasksContainer.classList.add("pending-tasks");
        pendingTasksContainer.innerHTML = `<h3>Pending Tasks</h3>`;
        tasks.forEach((task, index) => {
            const taskCard = document.createElement("div");
            taskCard.classList.add("task-card");
            taskCard.innerHTML = `
                <h3>${task.name}</h3>
                <p>Due: ${new Date(task.dueDate).toLocaleString()}</p>
                <p class="priority ${task.priority}">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</p>
                <p>${task.description}</p>
                <label>Progress: ${task.progress}%</label>
                <input type="range" min="0" max="100" value="${task.progress}" class="progress-slider" data-index="${index}">
                <div class="task-actions">
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            `;
            if (task.progress < 100) {
                pendingTasksContainer.appendChild(taskCard);
            } else {
                tasksContainer.appendChild(taskCard);
            }
        });
        tasksContainer.appendChild(pendingTasksContainer);
        addEventListeners();
    }

    function addEventListeners() {
        const editButtons = document.querySelectorAll(".edit-btn");
        const deleteButtons = document.querySelectorAll(".delete-btn");
        const progressSliders = document.querySelectorAll(".progress-slider");

        editButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                editTaskIndex = index;
                const task = tasks[index];
                document.getElementById("task-name").value = task.name;
                document.getElementById("due-date").value = task.dueDate; // Use ISO string directly
                document.getElementById("priority").value = task.priority;
                document.getElementById("description").value = task.description;
                taskModal.classList.remove("hidden");
            });
        });

        deleteButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                tasks.splice(index, 1); // Remove task
                updatePriorityCount();
                renderTasks();
            });
        });

        progressSliders.forEach((slider) => {
            slider.addEventListener("input", (e) => {
                const index = e.target.dataset.index;
                tasks[index].progress = e.target.value; // Update progress
                renderTasks();
            });
        });
    }

    const welcomeModal = document.getElementById("welcome-modal");
    const welcomeForm = document.getElementById("welcome-form");
    const userNameInput = document.getElementById("user-name");
    const greeting = document.getElementById("greeting");

    // Show welcome modal on load
    welcomeModal.classList.remove("hidden");

    // Handle welcome form submission
    welcomeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const userName = userNameInput.value.trim();
        if (userName) {
            greeting.textContent = `Hello, ${userName}`;
            welcomeModal.classList.add("hidden");
        }
    });
});