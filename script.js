let taskInput = document.getElementById('taskInput');
let userInput = document.getElementById('userInput');

let addTaskBtn = document.getElementById('addTaskBtn')
let emptyState = document.getElementById('emptyState');

let taskList = document.getElementById('taskList');

// Default List
let copyTask = [
    {id:1, task:'Put the add button', to:'Tim'},
    {id:2, task:'Style the list', to:'Sam'},
    {id:3, task:'return', to:'Tee'},
]



function addTask() {
    
    var taskVal = taskInput.value.trim();
    var userVal = userInput.value.trim();

    if (taskVal && userVal){
        copyTask = [...copyTask,{id:Date.now(),task:taskVal,to:userVal}]

        updateList();

        console.log('Hello world');
    } else{alert('input an assigned user and a task son')}

    taskInput.value = '';
    userInput.value = '';
    itemCheck()

     console.log(taskList)
}

addTaskBtn.addEventListener('click', function () { addTask();});

function updateList() {
    //Empty the dom list

    taskList.replaceChildren()

    for (let i = 0; i < copyTask.length; i++) {
        
        const element = copyTask[i];
        
        let taskItem = document.createElement('li');
        taskItem.textContent = `${element.task} --> ${element.to}` ;

        let deltask = document.createElement('button');
        deltask.textContent = 'x'

        taskList.appendChild(taskItem);
        
        taskItem.setAttribute('class','taskItem');
        
        taskItem.appendChild(deltask);

       
        deltask.addEventListener('click', function (){ del(taskItem,element); })
    }
}

updateList()

function del(taskItem,element){
    
    let ind = copyTask.findIndex(p => p.id == element.id);

    copyTask.splice(ind,1);
    
    itemCheck();

    updateList();
}

function itemCheck(){
    if (taskList.children.length == 0) {
    emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
    }
}

console.log(taskList.children.length)