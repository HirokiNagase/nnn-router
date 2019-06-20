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
-----| index.js
-----| _id.js
-----| notId.js
--| books/
-----| _bookId/
--------| authors/
-----------| _authorId.js
--| index.js
```

generate express Route path:
```
/users/
/users/:id
/users/notId
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