
// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const BikeSchema = new Schema({
    brand: String,
    model: String,
    power: String
});

// Export function to create "SomeModel" model class
module.exports = mongoose.model("Bike", BikeSchema);