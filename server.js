const argv = require('optimist')
            .default('db_name','sistemacventa')
            .default('db_port','27017')
            .default('db_ip','localhost')
            .default('serve_ip','localhost')
            .default('serve_port','80')
            .argv;
import express from 'express';
//const express = require('express');
import morgan from 'morgan';
//const morgan = require('morgan');
import cors from 'cors';
//const cors = require('cors');
import path from 'path'; // requerir para que los metodos estaticos sean publicos
import mongoose from 'mongoose';
import router from './routes';


mongoose.connect('mongodb://'+argv.db_ip+':'+argv.db_port+'/'+argv.db_name, {useNewUrlParser: true,useFindAndModify: false});


const app = express();
app.use(morgan('dev'));
app.use(cors());

//recibir pediciones json
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/api',router);
//run server
server.listen(argv.serve_port,argv.serve_ip,() => {
    console.log("Server corriendo en el puerto: " + argv.serve_port);
});
