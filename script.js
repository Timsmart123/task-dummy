let taskInput = document.getElementById('taskInput');
let userInput = document.getElementById('userInput');

let addTaskBtn = document.getElementById('addTaskBtn')
let emptyState = document.getElementById('emptyState');

let taskList = document.getElementById('taskList');


function addTask() {
    
    var taskVal = taskInput.value.trim();
    if (taskVal && userInput.value.trim()){
        let taskItem = document.createElement('li');
        taskItem.textContent = `${userInput.value.trim()} --> ${taskVal}` ;

        let deltask = document.createElement('button');
        deltask.textContent = 'x'

        taskList.appendChild(taskItem);
        
        taskItem.setAttribute('class','taskItem');
        
        taskItem.appendChild(deltask);

       
        deltask.addEventListener('click', function del(){
            taskList.removeChild(taskItem);
            itemCheck();
        })

        console.log('Hello world');
    } else{alert('input an assigned user and a task son')}

    taskInput.value = '';
    userInput.value = '';
    itemCheck()

     console.log(taskList)
}

addTaskBtn.addEventListener('click', function () { addTask();});


// BUG to check amount of items in tasak list
function itemCheck(){
    if (taskList.children.length == 0) {
    emptyState.style.display = 'block';
}else {
    emptyState.style.display = 'none';
}
}

console.log(taskList.children.length)