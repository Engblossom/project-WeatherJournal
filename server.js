// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
app.listen(port, ()=>{ console.log("Server is up on Port "+ port)});

//GET route
app.get('/all', (req, res)=>{
    res.send(projectData);
});

//POST route
app.post('/add', (req,res)=>{
    let newData= {};
    //get the data from the body of request
    newData ={
        temp : req.body.temp,
        date : req.body.date,
        feel : req.body.feelings
    }
    //assign the newdata to the endpoint
    projectData=newData;
})