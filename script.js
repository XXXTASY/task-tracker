document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const filterButtons = document.querySelectorAll(".filter-btn");
  
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function renderTasks(filter = "all") {
      taskList.innerHTML = "";
  
      const filteredTasks = tasks.filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
      });
  
      filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.className = task.completed ? "completed" : "";
        taskItem.innerHTML = `
          <span>${task.text}</span>
          <div class="task-buttons">
            <button class="complete-btn">${task.completed ? "Undo" : "Complete"}</button>
            <button class="delete-btn">Delete</button>
          </div>
        `;
  
        taskList.appendChild(taskItem);
  
        // Event Listeners for task buttons
        taskItem.querySelector(".complete-btn").addEventListener("click", () => {
          tasks[index].completed = !tasks[index].completed;
          saveTasks();
          renderTasks(filter);
        });
  
        taskItem.querySelector(".delete-btn").addEventListener("click", () => {
          tasks.splice(index, 1);
          saveTasks();
          renderTasks(filter);
        });
      });
    }
  
    // Add task
    addTaskBtn.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      if (taskText === "") return;
  
      tasks.push({ text: taskText, completed: false });
      saveTasks();
      renderTasks();
  
      taskInput.value = "";
    });
  
    // Filter tasks
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        document.querySelector(".filter-btn.active")?.classList.remove("active");
        button.classList.add("active");
        renderTasks(button.dataset.filter);
      });
    });
  
    // Initial render
    renderTasks();
  });
  