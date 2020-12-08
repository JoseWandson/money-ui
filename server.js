const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/money-ui'));

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/dist/money-ui/index.html');
});

app.listen(4200);
