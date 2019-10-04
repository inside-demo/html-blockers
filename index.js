const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

app.get('/', function (req, res) {
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>html-blockers</title>
  <script defer src="script.js"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <script>
    var a = document.createElement('script')
    a.src = 'script2.js'
    a.async = true;
    document.body.appendChild(a);
  </script>
  <style>body{color: black;}</style>
  <h1>html-blockers!</h1>
  <p>${makeid(5)}</p>
  <link rel="stylesheet" href="style1.css">
  <script>
    alert(getComputedStyle(document.body).marginTop);
  </script>
</body>
</html>
  `);
});

app.get('/script.js', function (req, res) {
  res.set({
    'Content-Type': 'application/javascript'
  });
  setTimeout(() => {
    res.send(`alert(1)`);
  }, 6000)
});

app.get('/script2.js', function (req, res) {
  res.set({
    'Content-Type': 'application/javascript'
  });
  setTimeout(() => {
    res.send(`alert(2)`);
  }, 1000000);
});

app.get('/style.css', function (req, res) {
  res.set({
    'Content-Type': 'text/css'
  });
  setTimeout(() => {
    res.send(`body {margin: 0;color: red;}`);
  }, 3000);
});

app.get('/style1.css', function (req, res) {
  res.set({
    'Content-Type': 'text/css'
  });
  setTimeout(() => {
    res.send(`body {margin: initial;color: olive;}`);
  }, 20000);
});

const listener = app.listen(0, function () {
  console.log(`Example app listening on port ${listener.address().port}
http://localhost:${listener.address().port}`);
});
