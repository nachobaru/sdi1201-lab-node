// Módulos
var express = require('express');
var app = express();

var mongo = require('mongodb');
var swig = require('swig');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
//Rutas/controladores por lógica
require("./routes/rusuarios.js")(app, swig);
require("./routes/rcanciones.js")(app, swig);

var gestorBD = require("./modules/gestorBD.js");
gestorBD.init(app,mongo);
// Variables
app.set('port', 8081);
app.set('db','mongodb://admin:admin@tiendamusica-shard-00-00-' +
    'el9u7.mongodb.net:27017,tiendamusica-shard-00-01-el9u7.mongodb.net:27017,' +
    'tiendamusica-shard-00-02-el9u7.mongodb.net:27017/test?ssl=true&replicaSet=tiendamusica-' +
    'shard-0&authSource=admin&retryWrites=true');
//Rutas/controladores por lógica
require("./routes/rusuarios.js")(app, swig, gestorBD); // (app, param1, param2, etc.)
require("./routes/rcanciones.js")(app, swig, gestorBD); // (app, param1, param2, etc.)

// lanzar el servidor
app.listen(app.get('port'), function() {
    console.log("Servidor activo");
})

