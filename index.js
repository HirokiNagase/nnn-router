const glob = require('glob')
const express = require('express')
const router = express.Router()

module.exports = (options = { routeDir: './routes' }) => {
  const filePattern = '**/*.js'
  const absolute = process.cwd() + options.routeDir.replace('./','/')

  const pathObj = glob.sync(filePattern, { cwd: absolute }).reduce((obj, path) => {
    const cut = '/' + path.replace('.js', '').replace(/_/g, ':')
    const apiPath = cut.slice(-5) === 'index' ? cut.slice(0, -5) : cut
    obj[absolute + '/' + path] = apiPath
    return obj
  }, {})

  // Descending sort for exception handling at dynamic routes
  const sortedPaths = Object.entries(pathObj)
                            .sort((a, b) => a < b ? 1 : -1)

  const temporary = options.baseRouter === undefined ? router : options.baseRouter

  sortedPaths.forEach(([filePath, routePath]) => {
    Object.entries(require(filePath)).forEach(([httpMethod, handler]) => {
      temporary[httpMethod](routePath, handler)
    })
  })
  return temporary
}
