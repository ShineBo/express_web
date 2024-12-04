const mongoose = require('mongoose');
const Drink = require('./models/drink');

const mongoURI = 'mongodb+srv://BoBo:shine2002@drinks-db.tp0cr.mongodb.net/?retryWrites=true&w=majority&appName=drinks-db';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const assignCustomIds = async () => {
    try {
        const drinks = await Drink.find().sort({ _id: 1 });

        let customId = 1;
        for (const drink of drinks) {
            drink.customId = customId++;
            await drink.save();
        }

        console.log('Custom IDs assigned successfully');
        mongoose.disconnect();
    } catch (err) {
        console.error('Error assigning custom IDs:', err);
    }
};

assignCustomIds();