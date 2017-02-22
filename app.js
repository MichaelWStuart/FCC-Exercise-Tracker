const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.set('view engine', 'pug');
app.use(express.static('public'));

if(process.env.node_env !== 'production') {
  require('dotenv').load();
}

const dbURL = `mongodb://${process.env.username}:${process.env.password}@${process.env.mdbloc}:${process.env.mdbport}/url_shortener`;

app.get('/', (req,res) => {
  res.render('index');
})

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
})
