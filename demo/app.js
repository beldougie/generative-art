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

app.use(express.static('demo/public'));

app.get('/', function (req, res) {

  let generator = new SolidGenerator();
  generator.startGeneration().then((ctx) => {
    res.render('demo', {
      imgData: ctx.canvas.toDataURL(),
      imgInfo: 'This is a standard Solid image. The default color is grey on white'
    });
  });
});

app.get('/solid/:width?/:height?', (req, res) => {
  let w = req.params.width || 1000;
  let h = req.params.height || 600;

  let generator = new SolidGenerator({
    canvasWidth: parseInt(w),
    canvasHeight: parseInt(h)
  });
  generator.startGeneration().then((ctx) => {
    res.render('demo', {
      imgData: ctx.canvas.toDataURL(),
      imgInfo: 'This image is created using the same generator as on <a href="/">the landing page</a> but the width height are customised by url paramters.</p>' +
        '<p>Current parameters ' + (req.params.width === undefined ? '(defaults)' : '') + ' are width: ' + w + 'px & height: ' + h + 'px</p>' +
        '<p>To ammend the size of the image, change the path in your address bar as follows: <pre>/solid/&lt;width&gt;/&lt;height&gt;</pre>. eg: <pre>/solid/600/600</pre>'
    });
  });
});

app.listen('3333', () => {
  console.log('Demo app listening on port 3333');
});
