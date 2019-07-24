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
  routeDir: '/routes', //REQUIRED
  baseRouter: router   //NOT RQUIRED
}

app.use(nnn(options))
```

This file tree:
```
routes/
--| users/
-----| index.get.js
-----| index.post.js
-----| _id.get.js
-----| _id.delete.js
--| books/
-----| _bookId/
--------| authors/
-----------| _authorId.get.js
-----------| _authorId.delete.js
--| index.get.js
--| index.put.js
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

## License
MIT