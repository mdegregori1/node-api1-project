// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send({api: 'If this prints out, API is running'})
})

// post to /api/users

server.post('/api/users', (req, res) => {
    const data = req.body;
    if (data.name && data.bio){
        db.insert(data)
        .then( users => {
            res.status(201).json({...users, ...data})
        })
        .catch(error => {
            console.log('error on post for users', error)
            res.status(500).json({error: "There was an error while saving the user to the database"})
        }) 
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user"})
    }


})

//get from /api/users
server.get('/api/users', (req, res) => {
    db.find()
    .then( users =>{
        res.status(200).json(users)
    })
    .catch( error => {
        console.log('error on GET users', error);
        res.status(500).json({ error: 'Error getting list of user'})
    })
})

// get from /api/users/:id
server.get('/api/users/:id',(req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then( id => {
        if (id) {
            res.status(200).json(id)
        } else {
            res.status(404).json({message: "The user with the specified ID does not exist."})
        }
    })
    .catch( error => {
        console.log(error)
        res.status(500).json({ error: "The user information could not be retrieved"})
    })

})


// When the client makes a GET request to /api/users/:id:

// If the user with the specified id is not found:

// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The user with the specified ID does not exist." }.
// If there's an error in retrieving the user from the database:

// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The user information could not be retrieved.


const port = 5000;
server.listen(port, () => 
console.log(`\n ** API running on port: ${port} **\n`)
);
