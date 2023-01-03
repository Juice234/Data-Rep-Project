const express = require('express')
const app = express()
const port = 4000
var bodyParser = require('body-parser')
const path = require('path');
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));


// parse application
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json({ limit: '50mb' })); //Increase the payload limit to allow for larger files

const cors = require('cors');
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Mongo Db
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.lvigbqt.mongodb.net/?retryWrites=true&w=majority');
}

//Game Schema
const gameSchema = new mongoose.Schema({
  name: String,
  description: String,
  startingPrice: Number,
  buyNowPrice: Number,
  image: String,
  price: Number
});



const gameModel = mongoose.model('games', gameSchema);  // 

app.post('/api/games', (req, res) => {
  console.log(req.body);
  gameModel.create({
    name: req.body.name,
    description: req.body.description,
    startingPrice: req.body.startingPrice,
    buyNowPrice: req.body.buyNowPrice,
    image: req.body.image
  })
  res.send('Data Recieved');
});


app.get('/api/games', (req, res) => {
  gameModel.find((error, data) => {  // use the game model to fetch data
    res.json(data);
  })
})

app.get('/api/game/:id', (req, res) => {  // update the route to fetch a single game by id
  console.log(req.params.id);
  gameModel.findById(req.params.id, (error, data) => {
    res.json(data);
  })
})

app.put('/api/game/:id', (req, res) => {  // update the route to update a single game by id
  console.log("Update: " + req.params.id);

  gameModel.findByIdAndUpdate(req.params.id, req.body, { new: true },
    (error, data) => {
      res.send(data);
    })
})

app.delete('/api/game/:id', (req, res) => {  // update the route to delete a single game by id
  console.log('Deleting: ' + req.params.id);
  gameModel.findByIdAndDelete({ _id: req.params.id }, (error, data) => {
    res.send(data);
  })
})

//Initated the saved games to be null
const serverState = {
  selectedGame: null
};

//Game is added to cart once the user presses the button to do so 
app.post('/api/cart', (req, res) => {
  const game = req.body.game;
  console.log(game);
  serverState.selectedGame = game;
  res.send('Game added to cart');
});

app.get('/api/selected-game', (req, res) => {
  res.send(serverState.selectedGame);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:4000`)
})