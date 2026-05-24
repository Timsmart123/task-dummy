const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));
let tasks = [
        {id:1, task:'Put the add button', to:'Tim'},
        {id:2, task:'Style the list', to:'Sam'},
    ]

    
app.get('/api/tasks',(req,res)=>{
    res.json(tasks)
});

app.post('/api/update', (req,res)=>{
    tasks.push(req.body);
    res.json({message:'Task Added'})
})
app.delete('/api/delete/:id', (req,res)=>{

    let id = Number(req.params.id);

    let idx = tasks.findIndex(tasks => tasks.id == id);

    if (idx !== -1){
        tasks.splice(idx,1);
        res.json({message:'Task Deleted'})
    } else {
        res.status(404).json({message:'Task not found'})
    }
})

app.listen(4000, () => console.log('Running on http://localhost:4000/  !!'));