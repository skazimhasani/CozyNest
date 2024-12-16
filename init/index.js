const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/cozynest";
const Listing = require("../models/listing.js");
const initData = require("./data.js");

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "675ee7624edbc88f33679139",
  }));
  await Listing.insertMany(initData.data);
  console.log("Data inserted");
};

initDB();
