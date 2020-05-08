//importando as dependencias que serao usadas
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);


//conectando com o banco de dados
mongoose.connect('mongodb+srv://instarocket:instarocket@instarocket-awnun.mongodb.net/omnistack07?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//chamando a lib socket.io e disponibilza para todas as rotas
app.use((req, res, next)=> {
    req.io = io;

    next();
})

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

server.listen(3333);

