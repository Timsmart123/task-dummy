// const { get } = require("node:https");

// const { text } = require("express");

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
        taskItem.className = 'taskItem';

        let taskDetails = document.createElement('div');
        taskDetails.className = 'task-details';

        let taskTitle = document.createElement('span');
        taskTitle.className = 'task-title';
        taskTitle.textContent = element.task;

        let taskAssignee = document.createElement('span');
        taskAssignee.className = 'task-assignee';
        taskAssignee.textContent = `Assigned to ${element.to}`;

        let deltask = document.createElement('button');
        deltask.textContent = 'Remove';
        deltask.setAttribute('aria-label', `Remove ${element.task}`);

        taskDetails.append(taskTitle, taskAssignee);
        taskItem.append(taskDetails, deltask);
        taskList.appendChild(taskItem);

       
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

notif.addEventListener('click', ()=>{ pushNotif('Taskflow is ready', window.location.href)});

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


let presence = document.getElementById('presence');

function updatePresence() {
    presence.textContent = navigator.onLine ? 'You are online' : 'You are offline';
}

updatePresence();
window.addEventListener('online', ()=>{ updatePresence(); pushNotif('You are back online'); });
window.addEventListener('offline', ()=>{ updatePresence(); pushNotif('You are offline'); });




// Viberate ✅

let vib = document.getElementById('vib')

vib.addEventListener('click', ()=>{
    if ('vibrate' in navigator) {
        navigator.vibrate(200);
        pushNotif('Vibration sent');
    } else {
        alert('Vibration is not supported by this device.');
    }
});



// Battery level ✅

let battery = document.getElementById('battery')

if ('getBattery' in navigator) {
    navigator.getBattery().then(bat => {
        battery.textContent = `${Math.round(bat.level * 100)}% · ${bat.charging ? 'Charging' : 'Not charging'}`;
    });
} else {
    battery.textContent = 'Battery details unavailable';
}



// Media device ✅

let camBtn = document.getElementById('camBtn');

camBtn.addEventListener('click', ()=> {useCam()});

function useCam() {
    navigator.mediaDevices.getUserMedia({
        video:true,
        audio:false
    }).then(res => {
        let video = document.getElementById('cam');

        video.srcObject = res;
    }).catch(() => alert('Camera access was not granted.'));
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
    tilt.textContent = `Front/back: ${e.beta ?? '—'}\nLeft/right: ${e.alpha ?? '—'}\nSide tilt: ${e.gamma ?? '—'}`;
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
    }).catch(() => alert('Screen sharing was cancelled or is unavailable.'));
}

document.getElementById('screenExpandBtn').addEventListener('click', () => {
    const preview = document.getElementById('screenPreview');
    if (preview.requestFullscreen) preview.requestFullscreen();
});

// Location ✅

let locateBtn = document.getElementById('locateBtn');

locateBtn.addEventListener('click', ()=> {locate()});

function locate(){
    navigator.geolocation.getCurrentPosition(res => {
        const { latitude, longitude, speed } = res.coords;
        document.getElementById('displayPos').textContent = `${latitude.toFixed(4)}, ${longitude.toFixed(4)} · ${speed ?? 0} m/s`;
    }, () => {
        document.getElementById('displayPos').textContent = 'Location permission was not granted';
    });
}


// Share 

let shareBtn = document.getElementById('shareBtn');

shareBtn.addEventListener('click', ()=>{shareLink()} );

let shareData = {
    title:'Taskflow',
    url:window.location.href,
    text:'Check out this Taskflow page.',
    // files:'/public/index.html'
}

function shareLink() {
    if (navigator.share && (!navigator.canShare || navigator.canShare(shareData))){
        navigator.share(shareData).catch(() => {});
    }else if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert('Sharing is unavailable here, so the page link was copied instead.'))
            .catch(() => alert('Sharing is not supported by this browser.'));
    } else {
        alert('Sharing is not supported by this browser.');
    }

    // pushNotif('lol','https://excelhr.vercel.app');
}

// Bcrypt

// let pass = 'wagg123'

// let code = bcrypt.hash(pass,10)
// console.log(pass)
console.log(window.navigator.appVersion)
