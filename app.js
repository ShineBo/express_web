const express = require('express');
const mongoose = require('mongoose');
const drinkController = require('./controllers/drinkController');

const app = express();
const port = 3000;

const mongoURI = 'mongodb+srv://BoBo:shine2002@drinks-db.tp0cr.mongodb.net/?retryWrites=true&w=majority&appName=drinks-db';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to the Drinks API!");
});

app.post('/drinks', drinkController.createDrink);
app.get('/drinks', drinkController.getAllDrinks);
app.get('/drinks/:customId', drinkController.getDrinkByCustomId);
app.put('/drinks/:customId', drinkController.updateDrinkByCustomId);
app.delete('/drinks/:customId', drinkController.deleteDrinkByCustomId);

app.listen(port, () => {
    console.log(`Detailed Drinks API running at http://localhost:${port}`);
});