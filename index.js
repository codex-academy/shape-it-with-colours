const express = require("express");

const exphbs = require("express-handlebars");
const bodyParser = require("body-parser"); 	// add this line
const app = express();
const pg = require("pg");
const Pool = pg.Pool;
const shapes_colours = require("./shapes-and-colours");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false })); // add this line
app.use(bodyParser.json()); // add  this line

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/shape_it_with_colours';

const pool = new Pool({
    connectionString
  });

const ShapesAndColors = shapes_colours(pool);

// //setup template handlebars as the template engine
// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

// app.use(express.static(__dirname + '/public'));

// //setup middleware

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// // parse application/json
// app.use(bodyParser.json())

// function errorHandler(err, req, res, next) {
//     res.status(500);
//     res.render('error', { error: err });
// }

// app.engine('handlebars', exphbs({
//     defaultLayout: 'main',
//     layoutsDir: "./views/layouts/"
// }));

// app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// app.get('/', function(req, res){

//     res.render('index')
// })

app.get('/shapes-and-colours', function(req, res){

    res.render('shapes-and-colours')
})

app.post('/shapes-and-colours', function(req, res){

    res.render('shapes-and-colours')
})

// app.get('/results', function(req, res){

//     res.render()
// })

// app.post('/results', function(req, res){

//     res.render()
// })


var portNumber = process.env.PORT || 3002;

//start everything up
app.listen(portNumber, function () {
    console.log('shapes and colors example server listening on:', portNumber);
});
