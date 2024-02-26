require ('dotenv').config();
const express = require('express');
const app = express();
const router = express.Router();
const port = 3004;


const DB_URL = process.env.DB_URL ||'';

const mongoose = require('mongoose');
mongoose.connect(DB_URL).then(()=>{
    console.log('Conexion exitosa a la base de datos')
}).catch(error =>console.log(err));


//Creao la cadena de conexion 

const userRoutes = require('./routes/UserRoutes');

app.use(express.urlencoded({ extended:true }))//Acceder a la informcion de las urls
app.use(express.json())//analiza la informacion en tipo JSON

router.get('/',(req,res)=>{
    res.send('Hello World')
})


//ejecutando el servidor

app.use(router)
// app.user('/uploads',express.static(upload))//meto estatico para acceder que tengo almacenados en la base de datos
app.use('/',userRoutes)
app.listen(port, () => {
    console.log('Listen on ' + port)
})

