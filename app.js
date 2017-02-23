const mongo = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const PORT = process.env.PORT || 8080;

app.set('view engine', 'pug');
app.use(express.static('public'));

if(process.env.node_env !== 'production') {
  require('dotenv').load();
}

const dbURL = `mongodb://${process.env.username}:${process.env.password}@${process.env.mdbloc}:${process.env.mdbport}/exercise-tracker`;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res) => {
  res.render('index');
})

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'favicon.ico'));
});

app.post('/api/exercise/new-user', (req,res) => {
  const username = req.body.username;
  const collection = db.collection('users');
  collection.findOne({username}, (err, item) => {
    if (err) {
      collection.save({username}, (err, result) => {
        if (err) return console.log(err);
        collection.findOne({username}, (err, item) => {
          res.send(item);
        })
      });
    } else {
      res.send('Duplicate Username');
    }
  })
})

app.post('/api/exercise/add', (req,res) => {
  const {_id, description, duration, date} = req.body;
  console.log(description)
  const collection = db.collection('users');
  collection.findOne({_id}, (err, result) => {
    if (err) return console.log(err);
    collection.update({
      _id
    },{
      $set: {
        _id, description, duration, date
      }
    }, (err, result) => {
      res.send(result);
    })
  })
})

mongo.connect(dbURL, (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
  })
})
