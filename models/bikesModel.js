const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const BikeSchema = new Schema({
        brand: String,
        model: String,
        power: String
    }
    , {toJSON: {virtuals: true}}
);

// Add virtual property to Bike, to include (dynamic) links
BikeSchema.virtual('_links').get(
    () => (
        {
            self: {
                href: `${process.env.BASE_URI}bikes/${this._id}`
            },
            collection: {
                href: `${process.env.BASE_URI}bikes/`
            }
        }
    )
);
// Export function to create "SomeModel" model class
module.exports = mongoose.model("Bike", BikeSchema);