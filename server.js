import express, { static } from 'express';

const app = express();

app.use(static(__dirname + '/dist/money-ui'));

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/dist/money-ui/index.html');
});

app.listen(process.env.PORT || 4200);
