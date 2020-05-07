const express = require('express');
const shortid = require('shortid');
const server = express();

server.use(express.json());

const users =[];

server.get('/', (req, res)=>{
    res.json({message:'hello'});
})



server.post('/api/users', (req, res)=>{
    console.log('req.body in post',req.body);
    console.log('req.params in post',req.params);

    const userInfo = req.body;
    const bodyKeys = Object.keys(req.body);
    console.log('object.keys in post',Object.keys(req.body));
    console.log('bodykeys in post', bodyKeys);
    if(bodyKeys[0] === "name" && bodyKeys[1] === "bio"){
       userInfo.id = shortid.generate();
    users.push(userInfo);
    res.status(201).json(userInfo);  
    } else {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."});
    }
   
})

server.get('/api/users',(req,res)=>{
    res.status(200).json(users);
})

server.get('/api/users/:id', (req, res)=>{
    const {id} = req.params;
    const found = users.find(user => user.id === id)
    console.log('id',id)
    if(found) {
        res.status(200).json(found);
    } else{
        res.status(404).json({errorMessage: "The user with the specified ID does not exist."});
    }

    
})

server.delete('/api/users/:id', (req, res)=>{
    const {id} = req.params;
    const found = users.find(user => user.id === id);
    if(found) {
        users = users.filter(user => user.id !== id);
        res.status(200).json(found);
    } else{
        res.status(404).json({errorMessage: "The user with the specified ID does not exist."})
    }
})

server.patch('/api/users/:id', (req, res)=>{
    const {id} = req.params;
    const changes = req.body;
    let found = users.find(user => user.id === id);

    if(found) {
        Object.assign(found, changes);
        res.status(200).json(found);
    } else{
        res.status(404).json({errorMessage: "The user with the specified ID does not exist."});
    }
})



const PORT = 5000;

server.listen(PORT,()=>{
    console.log(`listening on http://localhost:${PORT}`);
});

