// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) ||[];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return `task-${Date.now()}`;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    console.log(task)
    const tasksArray = []
    task.forEach(card => {
        const currentDay = dayjs()
        const taskDates = dayjs(card.date)
        let taskClass = ""
        if (taskDates.isSame(currentDay,"day")){
            taskClass="warning"
        } else if (taskDates.isBefore(currentDay)){
            taskClass = "late"
        }
        const taskCard = `
        <div class="taskCard ${taskClass}" id="${card.id}">
        <p>${card.name}</p>
        <p>${card.content}</p>
        <p>${card.date}</p>
        </div>
        
        ` 
        const taskEl = $(taskCard)
        tasksArray.push(taskEl)
    });
    console.log(tasksArray)
    return tasksArray
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const toDo = $("#todo-cards");
    toDo.empty(); // Clear existing tasks
    const taskCards = createTaskCard(taskList);
    taskCards.forEach(card => {
        toDo.append(card);
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault()
    const taskName = $("#task-name").val()
    const taskContent = $("#task-content").val()
    const taskDate = $("#task-date").val()
    const newTask = {
        name: taskName,
        content: taskContent,
        date: taskDate,
        id: generateTaskId(),

    }
     taskList.push(newTask)
     localStorage.setItem("tasks",JSON.stringify(taskList))

     $("#formModal").modal("hide")
     $("#task-name").val("")
     $("#task-content").val("")
     $("#task-date").val("")
     createTaskCard(taskList)
     renderTaskList()

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $("#task-button").on("click", handleAddTask)
});