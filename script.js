document.getElementById("category").addEventListener("change", function () {
    document.getElementById("task-input").style.display = "block";
    document.getElementById("task-list").style.display = "block";
  });
  
  document.getElementById("addTaskBtn").addEventListener("click", function () {
    const taskName = document.getElementById("task-name").value;
    const taskTime = document.getElementById("task-time").value;
  
    if (taskName === "" || taskTime === "") {
      alert("⚠ Please enter a task name and time.");
      return;
    }
  
    const taskList = document.getElementById("task-list");
  
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.innerHTML = `
      <label><input type="checkbox"> ${taskName}</label>
      <span class="countdown"></span>
    `;
  
    taskList.appendChild(taskDiv);
  
    startCountdown(taskDiv, taskName, new Date(taskTime));
  });
  
  function startCountdown(taskDiv, taskName, taskTime) {
    const countdownSpan = taskDiv.querySelector(".countdown");
  
    const timer = setInterval(() => {
      const now = new Date();
      const diff = taskTime - now;
  
      if (diff <= 0) {
        clearInterval(timer);
        countdownSpan.textContent = "⏰ Time's up!";
        document.getElementById("buzzer").play();
        checkTaskCompletion(taskDiv, taskName, taskTime);
      } else {
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        countdownSpan.textContent = `⏳ ${minutes}m ${seconds}s left`;
      }
    }, 1000);
  }
  
  function checkTaskCompletion(taskDiv, taskName, originalTime) {
    setTimeout(() => {
      const isCompleted = confirm(`📢 Have you completed '${taskName}'?`);
  
      if (!isCompleted) {
        const newTime = prompt("❗ Set a new time (YYYY-MM-DDTHH:MM):", "");
        if (newTime) {
          const newTaskTime = new Date(newTime);
          const extraMinutes = Math.round((newTaskTime - originalTime) / 60000);
          alert(`⏳ Task rescheduled. You took ${extraMinutes} extra minutes.`);
          startCountdown(taskDiv, taskName, newTaskTime);
        }
      } else {
        alert(`🎉 Great job on completing '${taskName}'!`);
        taskDiv.remove(); // Remove task if completed
      }
    }, 500);
  }
  