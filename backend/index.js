var mongoose = require('mongoose');
var port = '3600';
mongoose.Promise = global.Promise,
mongoose.set('strictQuery', false);
var app = require('./app');
mongoose.connect('mongodb://localhost:27017/productos')
.then(()=>{
    console.log('Conexión a la base de datos establecida con éxito...');
    app.listen(port,()=>{
        console.log('Servidor corriendo correctamente en la url: localhost:3600');
    })
})
.catch(err=>console.log(err));
