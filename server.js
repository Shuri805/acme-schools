const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=>res.sendFile(path.join(__dirname, 'index.html')));

// app.get('/api/students', (req, res, next) => {};)

const port = process.env.PORT || 3000;

// db.sync()
//   .then(()=> {
app.listen(port, ()=> console.log(`listening on port ${port}`));
// });
