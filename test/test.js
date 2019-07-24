const nnn = require('../index')
const express = require('express')
const app = express()
const router = express()

const port = 5000

const options = {
  routeDir: '/routes',
  // baseRouter: router
}

app.use('/example',(req, res, next) => {
  console.log('middleware')
  res.send('example mid active')
  next()
})

app.use(nnn(options)) 

app.listen(port)
console.log(`check nnn-router at localhost:${port}`)
