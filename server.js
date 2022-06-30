const express = require('express')
const { render } = require('express/lib/response')
const Container = require('./js/class') 
const http = require('http');
const { Server } = require('socket.io')

const app = express()
const dataBase = new Container()
const httpServer = http.createServer(app);
const io = new Server(httpServer);

const PORT = 3000

app.set('views', './public')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.render('index.ejs')
})

io.on('connection', socket => {
    console.log('User connected, id:' + socket.id)
    const db = dataBase.getAll()
    socket.emit('products', db)


    const messages = dataBase.getMessages()
    socket.emit('messages', messages)

    socket.on('new-product', (product) => {
            let newProduct = dataBase.getAll()

            dataBase.saveFile(product)

            newProduct.push(product)
            io.sockets.emit('products', newProduct)
        })
    socket.on('new-message', (text) => {
            let newMessage = dataBase.getMessages()
            dataBase.sendMessage(text)

            newMessage.push(text)
            io.sockets.emit('messages', newMessage)
        })
    
     
})



const server = httpServer.listen(PORT, ()=>{
    console.log(`Server http on ${PORT}...`);
})
server.on('error', error => console.log('Error on server', error))
