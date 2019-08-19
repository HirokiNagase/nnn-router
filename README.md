# nnn-router

nnn-router is library for dynamic nested routes

## Installation

```sh
npm install nnn-router
```
or with yarn
```sh
yarn add nnn-router
```

## Usage

Example:
```js
const nnn = require('nnn-router')
const express = require('express')
const app = express()
const router = express()

const options = {
  routeDir: '/routes', // DEFAULT '/routes'
  absolutePath: 'YOUR ABSOLUTE PATH', // NOT RQUIRED
  baseRouter: router   // NOT RQUIRED
}

app.use(nnn(options))
```
When you use both of routeDir and absolutePath, absolutePath overrides routeDir


This file tree:
```
routes/
--| users/
-----| get.js
-----| post.js
-----| _id/
-------| get.js
--| books/
-----| _bookId/
--------| authors/
-----------| _authorId/
-------------| get.js
--| get.js
--| put.js
```

generate express Route path:
```
/users/
/users/:id
/books/:bookId/authors/:authorId
/
```
each js file's form

```js
exports.get = (req, res) => {
  res.send('nnn-router')
}
```

or

```js
module.exports = (req, res) => {
  res.send('nnn-router')
}
```


## License
MIT