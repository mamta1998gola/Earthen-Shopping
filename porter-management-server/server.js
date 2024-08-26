const express = require('express');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const userRoutes = require('./routes/users');
require('dotenv').config()

const app = express();
app.use(cookieParser());

var rawBodyHandler = function (req, res, buf, encoding) {
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
    }
}

app.use(cors({ allowedHeaders: 'Content-Type, Cache-Control' }));
app.options('*', cors());  // enable pre-flight

app.use(bodyParser.json({ verify: rawBodyHandler }));

app.use(express.static(path.join(__dirname, "../dist")));

app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send("Hello World!")
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('App is running on port: ', PORT);
});