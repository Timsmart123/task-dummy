// const { get } = require("node:https");

// const { type } = require("node:os");

// const { json } = require("body-parser");

let taskInput = document.getElementById('taskInput');
let userInput = document.getElementById('userInput');

let addTaskBtn = document.getElementById('addTaskBtn')
let emptyState = document.getElementById('emptyState');

let taskList = document.getElementById('taskList');

// Default list
let copyTask = [];

// Getting tasks from backend
fetch('/api/tasks')
    .then(res =>  res.json())
    .then(data => {
        copyTask = data;
        updateList();
        itemCheck();
    }).catch(err => console.log(err))


// Adding tasks
function addTask() {
    
    var taskVal = taskInput.value.trim();
    var userVal = userInput.value.trim();

    if (taskVal && userVal){
        let newTask = {id:Date.now(),task:taskVal,to:userVal};

        fetch('/api/update', {
            method: 'POST',
            headers: {
                'content-type':'application/json',
            },
            body : JSON.stringify(newTask)
        })
        copyTask.push(newTask);

        updateList();

        console.log('Hello world');
    } else{alert('input an assigned user and a task son')}

    taskInput.value = '';
    userInput.value = '';
    itemCheck();



    console.log(taskList)
}

addTaskBtn.addEventListener('click', function () { addTask();});

// Task rerenders
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

// Delete task function
function del(taskItem,element){
    fetch(`/api/delete/${element.id}`, {
        method:'DELETE',
    }).then(res => res.json()).then(data => {
        let ind = copyTask.findIndex(p => p.id == element.id);

        copyTask.splice(ind,1);
        
        updateList();
        itemCheck();
        alert(data.message)
    }).catch(err => console.log(err))
    
}

// Check if there's any task to decide it's state
function itemCheck(){
    if (taskList.children.length == 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
    }
}


// Broswer API run

// Push Notif ✅
let notif = document.getElementById('notif');

notif.addEventListener('click', ()=>{ pushNotif('Hey Son wys, Good Luck', 'https://google.com')});

function pushNotif(msg,link) {
    Notification.requestPermission().then(res => {
        if (res === 'granted') {

            let notice = new Notification(msg);

            notice.onclick = ()=>{
            window.open(link); // or location.href = link;
            }
        }
    })
}


// Online detect


// Method 1 ✅ {Works on load so might wanna function rerener yfm by works}
// let present = navigator.onLine;

// if (present) {
//     pushNotif('Welcome Son')
// } else {
//    pushNotif('Byee son')
// }


// Bugging method ✅ works immediately online or offline (doesn't need rerender), bit buggy but kinda works


window.addEventListener('online', ()=>{pushNotif('Welcome')});

window.addEventListener('offline', ()=>{pushNotif('Byeee')});

// let presence = document.getElementById('presence');

// window.addEventListener('online', ()=>{presence.textContent = 'Online'}); // NOT REALLY CONSOLING




// Viberate ✅

let vib = document.getElementById('vib')

vib.addEventListener('click', ()=>{navigator.vibrate(1000);pushNotif('works')});



// Battery level ✅

let battery = document.getElementById('battery')

navigator.getBattery().then(bat => {
    battery.textContent = `Battery Level :${bat.level * 100} - ${bat.charging ? 'charging' : 'Not charging'}`
})



// Media device ✅

let camBtn = document.getElementById('camBtn');

camBtn.addEventListener('click', ()=> {useCam()});

function useCam() {
    navigator.mediaDevices.getUserMedia({
        video:true,
        audio:true
    }).then(res => {
        let video = document.getElementById('cam');

        video.srcObject = res

    })
}




// Device Orientation ❌

window.addEventListener('deviceorientation', (e)=> {
    console.log(e.alpha); //left - right rotate
    console.log(e.beta); // front - back tilt
    console.log(e.gamma); // side tilt
})

// Shows on Pc says null but not on mobile
window.addEventListener('deviceorientation', (e)=> {
    
    let tilt = document.getElementById('tilt')
    tilt.textContent = 
    `Front/Back - ${e.beta} <br /> 
    Left/Right - ${e.alpha} <br /> 
    Side - ${e.gamma}`
})

window.addEventListener('devicemotion', (e)=> {console.log(e)})




// Screen Share ✅

let screenBtn = document.getElementById('screenBtn');

screenBtn.addEventListener('click', ()=> {screenShare()});


function screenShare() {
    navigator.mediaDevices.getDisplayMedia({
        video:true,
        audio:true
    }).then(res => {
        let screen = document.getElementById('screen');

        screen.srcObject = res;

        

    })
}

// Location ✅

let locateBtn = document.getElementById('locateBtn');

locateBtn.addEventListener('click', ()=> {locate()});

function locate(){
    navigator.geolocation.getCurrentPosition(res => {
        pushNotif(`Long - ${res.coords.latitude}, Lat - ${res.coords.latitude}, Speed - ${res.coords.speed ? res.coords.speed:'Not moving' }`);
        console.log(res)
    })
}

