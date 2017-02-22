const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.set('view engine', 'pug');
app.use(express.static('public'));


app.get('/', (req,res) => {
  res.render('index');
})

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
})
