const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://unsplash.com/photos/a-green-car-parked-in-front-of-a-large-building-N2gzYjsyNEY",
    set: (v) =>
      v === ""
        ? "https://unsplash.com/photos/a-green-car-parked-in-front-of-a-large-building-N2gzYjsyNEY"
        : v,
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
