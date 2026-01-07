const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const count = document.getElementById("taskCount");
const clearBtn = document.getElementById("clearCompleted");
const themeToggle = document.getElementById("themeToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function render() {
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <div class="task-left">
                <input type="checkbox" ${task.completed ? "checked" : ""} 
                    onclick="toggleTask(${index})">
                <span>${task.text}</span>
            </div>
            <div class="task-actions">
                <button onclick="editTask(${index})">✏️</button>
                <button onclick="deleteTask(${index})">🗑</button>
            </div>
        `;
        list.appendChild(li);
    });

    count.textContent = `${tasks.length} Tasks`;
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

addBtn.onclick = () => {
    if (!input.value.trim()) return;
    tasks.push({ text: input.value, completed: false });
    input.value = "";
    render();
};

window.toggleTask = index => {
    tasks[index].completed = !tasks[index].completed;
    render();
};

window.deleteTask = index => {
    tasks.splice(index, 1);
    render();
};

window.editTask = index => {
    const text = prompt("Edit task:", tasks[index].text);
    if (text && text.trim()) {
        tasks[index].text = text;
        render();
    }
};

clearBtn.onclick = () => {
    tasks = tasks.filter(t => !t.completed);
    render();
};

themeToggle.onclick = () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent =
        document.body.classList.contains("dark") ? "☀️" : "🌙";
};

render();
