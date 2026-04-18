const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/food-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connection successful!!");
}).catch((err) => {
  console.error("MongoDB connection failed:", err.message);
});


// models
// to store product detailes
const Product = mongoose.model("Product", {
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
});

// to store user detailes
const User = mongoose.model("User", {
  username: String,
  email: String,
  password: String,
  checkout: [],
  cart: [],
  wishlist: [],
});

module.exports = {
  Product,
  User,
};
