var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var productoSchema=Schema({
    nombre:String,
    descripcion:String,
    edicion:String,
    anio:Number,
    precio:Number,
    imagen:String
});
module.exports=mongoose.model('Producto', productoSchema);
