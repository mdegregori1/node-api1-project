// implement your API here
const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.send({api: 'If this prints out, API is running'})
})


const port = 5000;
server.listen(port, () => 
console.log(`\n ** API running on port: ${port} **\n`)
);
