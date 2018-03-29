const http = require('http')

let handels = require('./src/handels.js')
let port = '8888'

const server = http.createServer()
server.listen(port)
server.on('request',handels)
console.log(`Server running at http://127.0.0.1:${port}/`)