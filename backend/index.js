const express = require("express");
const cors = require("cors");
const dataService = require("./services/dataServices");
const server = express();
const jwt = require("jsonwebtoken");

server.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:4200",
  })
);
server.use(express.json());
server.listen(3000, () => {
  console.log("cart server listening at port number 3000");
});

// application specific middleware
const appMiddleware = (req, res, next) => {
  console.log("inside application middleware");
  next();
};

server.use(appMiddleware);

// food-app front end request resolving

//token verify middleware
const jwtMiddleware = (req, res, next) => {
  console.log("inside router specific middleware");
  //get token from req headers
  const token = req.headers["access-token"];
  console.log(token);
  try {
    //verify token
    const data = jwt.verify(token, process.env.JWT_SECRET || "B68DC6BECCF4A68C3D8D78FE742E2");
    req.email = data.email;
    console.log("valid token");
    next();
  } catch {
    console.log("invalid token");
    res.status(401).json({
      message: "Please Login!",
    });
  }
};

//register api call
server.post("/register", (req, res) => {
  console.log("inside register api");
  console.log(req.body);
  //async
  dataService
    .register(req.body.username, req.body.email, req.body.password)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

//login api call
server.post("/login", (req, res) => {
  console.log("inside login api");
  console.log(req.body);
  //async
  dataService.login(req.body.email, req.body.password).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// all products api
server.get("/all-products", (req, res) => {
  dataService.allProducts().then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// view product api
server.get("/view-product/:productId", (req, res) => {
  dataService.viewProduct(req.params.productId).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// add to wishlist a  product jwtmiddleare used to verify token during login
server.post("/addToWishlist", jwtMiddleware, (req, res) => {
  console.log("inside addtowishlist api");
  //async
  dataService
    .addToWishlist(req.body.email, req.body.productId)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

// wishlist a  product jwtmiddleare used to verify token during login
server.put("/removeFromWishlist", jwtMiddleware, (req, res) => {
  console.log("inside removeFromWishlist api");
  //async
  dataService
    .removeFromWishlist(req.body.email, req.body.productId)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

//  addToCart
server.post("/addToCart", jwtMiddleware, (req, res) => {
  console.log("inside addToCart api");
  //async
  dataService
    .addToCart(req.body.email, req.body.productId, req.body.count)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

// removeFromCart
server.put("/removeFromCart", jwtMiddleware, (req, res) => {
  console.log("inside removeFromWishlist api");
  //async
  dataService
    .removeFromCart(req.body.email, req.body.productId)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

// removeFromCart
server.put("/updateCartItemCount", jwtMiddleware, (req, res) => {
  console.log("inside updateCartItemCount api");
  //async
  dataService
    .updateCartItemCount(req.body.email, req.body.productId, req.body.count)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});
// emptyCart
server.put("/emptyCart", jwtMiddleware, (req, res) => {
  console.log("inside emptyCart api");
  //async
  dataService.emptyCart(req.body.email).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// get myitems cart after login  from user profile api
server.get("/getWishlist/:email", jwtMiddleware, (req, res) => {
  dataService.getWishlist(req.params.email).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// get my order cart after login  from user profile api
server.get("/getMyOrders/:email", jwtMiddleware, (req, res) => {
  dataService.getMyOrders(req.params.email).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// add to Checkout a  transcation jwtmiddleare used to verify token during login
server.post("/addToCheckout", jwtMiddleware, (req, res) => {
  console.log("inside addToCheckout api");
  //async
  dataService
    .addToCheckout(
      req.body.email,
      req.body.orderID,
      req.body.transactionID,
      req.body.dateAndTime,
      req.body.amount,
      req.body.status,
      req.body.products,
      req.body.detailes
    )
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

// NEW CART ROUTES

// Get cart by userId
server.get("/api/cart/:userId", jwtMiddleware, (req, res) => {
  dataService.getCart(req.params.userId).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// Add item to cart
server.post("/api/cart/:userId/add", jwtMiddleware, (req, res) => {
  const { productId, name, price, quantity, image } = req.body;
  if (!productId || !name || !price || !quantity) {
    return res.status(400).json({ statusCode: 400, message: "Missing required fields" });
  }
  dataService.addToCartNew(req.params.userId, productId, name, price, quantity, image).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// Update cart item quantity
server.put("/api/cart/:userId/update-quantity", jwtMiddleware, (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId || quantity === undefined) {
    return res.status(400).json({ statusCode: 400, message: "Missing required fields" });
  }
  dataService.updateCartItemQuantity(req.params.userId, productId, quantity).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// Remove item from cart
server.delete("/api/cart/:userId/remove/:productId", jwtMiddleware, (req, res) => {
  dataService.removeCartItem(req.params.userId, Number(req.params.productId)).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// Clear cart
server.delete("/api/cart/:userId/clear", jwtMiddleware, (req, res) => {
  dataService.clearCart(req.params.userId).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// Merge guest cart on login
server.post("/api/cart/:userId/merge", jwtMiddleware, (req, res) => {
  const { guestItems } = req.body;
  if (!guestItems || !Array.isArray(guestItems)) {
    return res.status(400).json({ statusCode: 400, message: "Invalid guest items" });
  }
  dataService.mergeGuestCart(req.params.userId, guestItems).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// PAYMENT ROUTES

// Get user orders
server.get("/api/orders/:userId", jwtMiddleware, (req, res) => {
  dataService.getUserOrders(req.params.userId).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// Create cash on delivery order
server.post("/api/orders/create-cash-order", jwtMiddleware, (req, res) => {
  const { amount, shippingAddress } = req.body;
  if (!amount || !shippingAddress) {
    return res.status(400).json({ statusCode: 400, message: "Missing required fields" });
  }
  dataService.createCashOrder(req.email, amount, shippingAddress).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// Create simulated card payment order
server.post("/api/orders/create-card-order", jwtMiddleware, (req, res) => {
  const { amount, shippingAddress, cardLastFour } = req.body;
  if (!amount || !shippingAddress) {
    return res.status(400).json({ statusCode: 400, message: "Missing required fields" });
  }
  dataService.createCardOrder(req.email, amount, shippingAddress, cardLastFour).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// Newsletter subscription
server.post("/api/newsletter/subscribe", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ statusCode: 400, message: "Email is required" });
  }
  dataService.subscribeNewsletter(email).then((result) => {
    res.status(result.statusCode).json(result);
  });
});
