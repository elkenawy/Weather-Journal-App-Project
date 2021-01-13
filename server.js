// Setup empty JS object to act as endpoint for all routes
projectData = {};

const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance

app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));



// Require Express to run server and routes



app.get('/all', (req, res) => {
  res.send(projectData)
 
})

app.post('/add',addData);

function addData (req, res){
   console.log(req.body)
    projectData = {
     date: req.body.date,
     temp: req.body.temp,
     content: req.body.content
    }
   
  res.send(projectData);
}

// Setup Server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
