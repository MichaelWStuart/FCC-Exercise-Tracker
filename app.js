const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const PORT = process.env.PORT || 8080;
const path = require('path');

app.set('view engine', 'pug');
app.use(express.static('public'));

if(process.env.node_env !== 'production') {
  require('dotenv').load();
}

const dbURL = `mongodb://${process.env.username}:${process.env.password}@${process.env.mdbloc}:${process.env.mdbport}/exercise-tracker`;

mongoose.connect(dbURL, (err, database) => {
  if (err) return console.log(err);
  app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
  })
})

const userSchema = new mongoose.Schema({
  username: String,
  description: String,
  duration: Number,
  date: String
})

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/exercise/new-user', (req, res, next) => {
  const username = req.body.username
  User.find({username}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.length === 0) {
        next();
      } else {
        res.send('duplicate username not allowed');
      }
    }
  })
})

app.get('/', (req,res) => {
  res.render('index');
})

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'favicon.ico'));
});

app.post('/api/exercise/new-user', (req,res) => {
  const username = req.body.username;
  User.create({username}, (err,user) => {
    if (err) {
      console.log(err);
    } else {
      res.send(user);
    }
  })
})

app.post('/api/exercise/add', (req,res) => {
  const {_id, description, duration, date} = req.body;
  User.findByIdAndUpdate(_id, {description,duration,date}, (err, exercise) => {
    if (err) {
      console.log(err)
    } else {
      res.send(`{username: ${exercise.username}, description: ${description}, duration: ${duration}, date: ${date}}`);
    }
  })
})
