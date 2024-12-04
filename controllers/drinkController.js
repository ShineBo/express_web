const Drink = require('../models/drink');

exports.createDrink = async (req, res) => {
    try {
        const lastDrink = await Drink.findOne().sort({ customId: -1 }).exec();
        const customId = lastDrink && lastDrink.customId ? lastDrink.customId + 1 : 1;

        const drink = new Drink({ ...req.body, customId });
        await drink.save();

        res.status(201).json({
            message: "Drink created successfully",
            drink
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllDrinks = async (req, res) => {
    try {
        const drinks = await Drink.find();
        res.json({
            message: "All drinks retrieved successfully",
            drinks
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getDrinkByCustomId = async (req, res) => {
    try {
        const customId = parseInt(req.params.customId, 10);
        const drink = await Drink.findOne({ customId });

        if (!drink) {
            return res.status(404).json({ error: "Drink not found" });
        }

        res.json({
            message: "Drink retrieved successfully",
            drink
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateDrinkByCustomId = async (req, res) => {
    try {
        const customId = parseInt(req.params.customId, 10);
        const drink = await Drink.findOneAndUpdate({ customId }, req.body, { new: true });

        if (!drink) {
            return res.status(404).json({ error: "Drink not found" });
        }

        res.json({
            message: "Drink updated successfully",
            updatedDrink: drink
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteDrinkByCustomId = async (req, res) => {
    try {
        const customId = parseInt(req.params.customId, 10);
        const drink = await Drink.findOneAndDelete({ customId });

        if (!drink) {
            return res.status(404).json({ error: "Drink not found" });
        }

        res.json({
            message: "Drink deleted successfully",
            deletedDrink: drink
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};