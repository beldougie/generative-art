'use strict';
const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const SolidGenerator = require('../lib/SolidGenerator');

app.engine('.html', hbs({
  extname: '.html',
  defaultLayout: 'index',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials'
}));

app.set('view engine', '.html');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {

  let generator = new SolidGenerator();
  generator.startGeneration();
  console.log('generator.canvas', generator.canvas);
  res.render('demo', {
    imgData: generator.canvas.toDataURL()
  });
});

app.listen('3333', () => {
  console.log('Demo app listening on port 3333');
});
