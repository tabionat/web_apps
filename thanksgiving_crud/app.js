var bodyParser = require('body-parser');

const express = require('express')
const app = express()
const port = 3000

// global var empty array
let recipes = []

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app handle a get request
app.get('/', (req, res) => res.send('Hello World!\n'))
app.get('/dood/', (req, res) => res.send('You contacted the dood\n'))
app.get('/hdood/', (req, res) => res.send('<title>DOOD IS CALLING YOU BACK</title><B>You contacted the dood</B>'))

// app handle a post
app.post('/add_recipe/', 
        function(req, res)
        {
            if ( typeof req.body.edible  == 'undefined' )
            {
                console.log('no edible found')
                SendResponse(res)
                return
            }

            for ( var i = 0; i < recipes.length; i++)
            {
               console.log(`${recipes[i]} == ${req.body.edible}`)
               if ( recipes[i] == req.body.edible )
               {
                   console.log(`${req.body.edible} already present`)
                   SendResponse(res)
                   return
               }
            }

            console.dir(`adding ${req.body.edible}....`)
            recipes.push(req.body.edible)
            SendResponse(res)
            return
        } 
) 

app.listen(port, '10.0.0.21', () => console.log(`Example app listening on port ${port}!`))

function SendResponse(res)
{
    res.send(`edibles=${recipes.toString()}`)
    // TODO: send a response as JSON
}
