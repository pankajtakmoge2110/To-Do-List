const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addBtn.addEventListener("click", addTask);

function addTask(){

    const taskText = taskInput.value.trim();

    if(taskText === "") return;

    const task = {
        text: taskText,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();

    taskInput.value="";
}


function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");
        li.textContent = task.text;

        if(task.completed){
            li.classList.add("completed");
        }

        // Toggle complete
        li.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑";

        deleteBtn.addEventListener("click", (e)=>{
            e.stopPropagation();
            tasks.splice(index,1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

renderTasks();

taskInput.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
        addTask();
    }
});
