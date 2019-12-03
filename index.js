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


// delete from /api/users/:id
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
    .then( id => {
        if (id) {
            res.status(200).json({message: "The user was removed."})
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist."})
        }
    })
    .catch( error => {
        console.log(error)
        res.status(500).json({ error: "The user could not be removed"})
    })
})

// Edit (put) from /api/users/:id
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = req.body; 
    if (user.name && user.bio) {
        db.update(id, user)
        .then( id => {
            if (id) {
                res.status(200).json({...id, ...user})
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist"})
            }
        })
        .catch( error => {
            console.log(error)
            res.status(500).json({ error: "The user information could not be modified."})
        })
    } else {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }
    
})




const port = 5000;
server.listen(port, () => 
console.log(`\n ** API running on port: ${port} **\n`)
);
