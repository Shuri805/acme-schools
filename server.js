const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');

app.use('/dist', express.static(path.join(__dirname, 'dist')));

//routes
app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/students', (req, res, next) => {
  db.read.students()
  .then(students => res.send(students))
  .catch(next);
});

app.get('/api/schools', (req, res, next) => {
  db.read.schools()
  .then(schools => res.send(schools))
  .catch(next);
});

app.delete('/api/students/:id', (req, res, next) => {
  db.destroy.students(req.params.id)
  .then(() => res.send(204))
  .catch(next);
});

app.delete('/api/schools/:id', (req, res, next) => {
  db.destroy.schools(req.params.id)
  .then(() => res.send(204))
  .catch(next);
});


const port = process.env.PORT || 3000;

db.sync()
  .then(()=> {
    app.listen(port, ()=> console.log(`listening on port ${port}`));
})
.catch(ex => console.log(ex));

