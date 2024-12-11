const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/cozynest";
const ExpressError = require("./utils/ExpressError.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const session = require("express-session");

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOption = {
  secret: "mysecretcode",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOption));

//Home Route
app.get("/", (req, res) => {
  res.send("Hi, I am Root");
});

//Listings
app.use("/listings", listings);
//Reviews
app.use("/listings/:id/reviews", reviews);

//All not available Routes
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

//Error Middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
