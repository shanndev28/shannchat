const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
const socket = socketIO(server)

app.set("json spaces", 2)
app.set('view engine', 'ejs')
app.set('views', __dirname + '/library/view')

app.get('/', (req, res) => { res.render('user-1') })
app.get('/2', (req, res) => { res.render('user-2') })

socket.on('connect', io => {
    io.on('message-1', msg => io.broadcast.emit('broadcast-1', msg))
    io.on('message-2', msg => io.broadcast.emit('broadcast-2', msg))
})

server.listen(2900, () => console.log('Application listen'))