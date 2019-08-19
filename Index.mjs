import glob from 'glob'
import express from 'express'
const router = express.Router()

export default (options = { routeDir: '/routes' }) => {
  const filePattern = '**/*.js'
  const absolute = process.cwd() + options.routeDir.replace('./','/')

  const pathObj = glob.sync(filePattern, { cwd: absolute }).reduce((obj, path) => {
    try {
      if (throwerror(path).toString() == [-1, -1, -1, -1, -1, -1, -1, -1, -1].toString()) {
        throw new Error('invalid filename use HTTP method')
      }
    } catch(error){
      console.error("ERROR:", error)
    }

    const cut = '/' + path.replace('.js', '').replace(/_/g, ':')
    const result = cut.split('/').slice(0, -1).join('/') + '/'
    const apiPath = result[0].slice(-5) === 'index' ? result.slice(0, -5) : result
    obj[absolute + '/' + path] = apiPath
    return obj
  }, {})

  // Descending sort for exception handling at dynamic routes
  const sortedPaths = Object.entries(pathObj).sort((a, b) => a < b ? 1 : -1)
  const temporary = options.baseRouter === undefined ? router : options.baseRouter

  sortedPaths.forEach(([filePath, routePath]) => {
    const method = filePath.split('/').slice(-1)[0].replace('.js','')
    const handler = require(filePath)
    if (typeof handler === 'function') {
      temporary[method](routePath, handler) //module.exports
    } else if (typeof handler === 'object') {
      Object.values(handler).forEach(fun => {
        temporary[method](routePath, fun)
      }) //exports.get
    }
  })
  return temporary
}

const reqmethods = [
  'get', 'head', 'post', 'put', 'delete', 'connnect', 'options', 'trace', 'patch'
]

const throwerror = (path) => {
  return reqmethods.map(method => {
    return path.indexOf(method)
  })
}
