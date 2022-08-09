const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { createServer } = require('http');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');


const app = express();
const httpServer = createServer(app);
const io = require('./socket/socket').init(httpServer);
const mongoUrl = 'mongodb+srv://user:L0rdR3van@node-shop.vtbu2.mongodb.net/messages?retryWrites=true';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(multer({ storage: storage, fileFilter: fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, x-access-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(mongoUrl)
  .then(() => {
      io.on('connection', socket => {
            console.log('Socket connected');
            socket.on('disconnect', () => console.log('Socket disconnected'));
      })
    httpServer.listen(8080, () => {
        console.log('listening on port 8080');
    });
  })
  .catch(err => console.log(err));


