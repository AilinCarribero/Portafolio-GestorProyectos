//Importart libraries
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require ('body-parser');
const cors = require('cors');
const authToken = require('./middlewares/authToken');

//Use methods libs
const app = express();
require('dotenv').config();

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
//app.use(authToken);

//Database setup
mongoose.connect(process.env.DATABASE , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    keepAlive: true,
    useFindAndModify: false
}).then(() => {console.log("Conexion de base de datos exitosa")});

//Routes setup
app.use('/api/proyecto' , require('./routes/proyecto'));
app.use('/api/tarea' , require('./routes/tarea'));
app.use('/api/auth' , require('./routes/auth'));

//Listen to port
const port = process.env.PORT;
app.listen( port , () => {
    console.log(`Server on port ${port}`);
});

