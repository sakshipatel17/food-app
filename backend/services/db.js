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

<<<<<<< HEAD
// to store cart detailes
const Cart = mongoose.model("Cart", {
  userId: String,
  items: [{
    productId: Number,
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  updatedAt: { type: Date, default: Date.now }
});

// to store order detailes
const Order = mongoose.model("Order", {
  userId: String,
  items: [{
    productId: Number,
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  totalAmount: Number,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  paymentMethod: { type: String, enum: ['cash', 'card'], default: 'cash' },
  cardLastFour: String,
  status: { type: String, enum: ['pending', 'paid', 'failed', 'placed'], default: 'placed' },
  shippingAddress: {
    name: String,
    email: String,
    mobile: String,
    address: String
  },
  createdAt: { type: Date, default: Date.now }
});

// to store newsletter subscriptions
const Newsletter = mongoose.model("Newsletter", {
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now }
});

module.exports = {
  Product,
  User,
  Cart,
  Order,
  Newsletter,
=======
module.exports = {
  Product,
  User,
>>>>>>> 8c08a43b65d17692221f92e776ba12e9af1c2c8c
};
