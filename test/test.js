const nnn = require('../index')
const express = require('express')
const app = express()

app.get('/get', (req, res) => {
  res.send('get get get')
})

const options = {
  routeDir: '/routes',
  // baseRouter: app
}

app.use(nnn(options)) 

app.listen(5000)
console.log('check nnn-router at localhost:5000')
