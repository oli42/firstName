const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const cors = require('cors')
const { success, failure } = require('./utils')
let names = require('./nice-names')

const app = express()
const port = 4000

app
    .use(cors())
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))

 
app.get('/', (req, res) => res.send('Hello express!'))

app.get('/names', (req, res) => {
    const message = `request OK, there are ${names.length} objects in my db`
    res.json(success(message,names));
})

app.get('/names/:name', (req, res) => {
    const name = req.params.name;
    const matchingObjects = names.filter(obj => obj.name === name);
    const sum = matchingObjects.reduce((accumulator, currentValue) => accumulator + currentValue.nombre, 0);
    if(sum != 0){
      const message = "success, an object was found "
      res.json(success(message,sum));
    }
    else{
      message = 'No matching object found.'
      res.json(failure(message, sum));

    }
  });

app.get('/names/:name/:year', (req, res) => {
    const name = req.params.name;
    const year = parseInt(req.params.year);
  
    const result = names.filter(obj => obj.name === name && obj.year === year);
    if(result.length>0){
        const message = "success, an object was found "
        res.json(success(message,result));

    }else{
      message = 'No matching object found.'
      res.json(failure(message, result));
    }
  });


app.listen(port, () => console.log(`app has started : http://localhost:${port}`))