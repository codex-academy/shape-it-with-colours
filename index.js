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


var portNumber = process.env.PORT || 3002;

//start everything up
app.listen(portNumber, function () {
    console.log('shapes and colors example server listening on:', portNumber);
});
