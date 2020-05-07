const express = require('express');

const server = express();

server.get('/', (req, res)=>{
    res.json({message:'hello'})
})

const PORT = 5000;

server.listen(PORT,()=>{
    console.log(`listening on http://localhost:${PORT}`)
});

