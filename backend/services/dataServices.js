const db = require("./db");
//import jsonwebtoken
const jwt = require("jsonwebtoken");

// all products
const allProducts = () => {
  return db.Product.find().then((result) => {
    if (result) {
      return {
        statusCode: 200,
        products: result,
      };
    } else {
      return {
        statusCode: 404,
        message: "Data is empty/server busy",
      };
    }
  });
};

// view product
const viewProduct = (id) => {
  return db.Product.findOne({ id }).then((result) => {
    if (result) {
      return {
        statusCode: 200,
        product: result,
      };
    } else {
      return {
        statusCode: 404,
        message: "Product is unavailable",
      };
    }
  });
};

// register
const register = (username, email, password) => {
  console.log("Inside register function in dataservice");
  //find acno is in mongodb // db.users.findOne()
  return db.User.findOne({ email }).then((result) => {
    console.log(result);
    if (result) {
      //acnt already exists
      return {
        statusCode: 403,
        message: "Account Already Exists",
      };
    } else {
      // to add new user
      const newUser = new db.User({
        username,
        email,
        password,
        checkout: [],
        wishlist: [],
        cart: [],
      });
      // to save new user in mongodb use save()
      newUser.save();
      return {
        statusCode: 200,
        message: "Registration Successful",
      };
    }
  });
};

//login
const login = (email, password) => {
  console.log("Inside login function in dataservice");
  // check acno pswd in mongodb
  return db.User.findOne({
    email,
    password,
  }).then((result) => {
    if (result) {
      //generate token

      const token = jwt.sign({ email }, "B68DC6BECCF4A68C3D8D78FE742E2", {
        algorithm: "HS256",
      });
      return {
        statusCode: 200,
        message: "Login Successful",
        username: result.username,
        checkout: result.checkout,
        wishlist: result.wishlist,
        cart: result.cart,
        email,
        token,
      };
    } else {
      return {
        statusCode: 403,
        message: "Invalid Account / Password",
      };
    }
  });
};

// addToWishlist
const addToWishlist = (email, id) => {
  console.log("Inside wishlist function in dataservice");
  let productId = Number(id);

  return db.User.findOne({ email }).then((result) => {
    if (result) {
      console.log(result);
      // email is present in db
      result.wishlist.push({
        productId,
      });

      // to update in mongodb
      result.save();
      return {
        statusCode: 200,
        message: `product id ${productId} added to wishlist`,
      };
    } else {
      return {
        statusCode: 404,
        message: "Invalid / server error",
      };
    }
  });
};

//removeFromWishlist
const removeFromWishlist = (email, id) => {
  console.log("Inside removefromwishlist function in dataservice");
  let productId = Number(id);

  return db.User.updateOne(
    { email },
    {
      $pull: {
        wishlist: { productId },
      },
    }
  ).then((result) => {
    if (result) {
      console.log(result);

      // to update in mongodb
      // result.save();
      return {
        statusCode: 200,
        message: `product id ${productId} removed from wishlist..`,
      };
    } else {
      return {
        statusCode: 404,
        message: "Invalid / server error",
      };
    }
  });
};

// addToCart
const addToCart = (email, id, count) => {
  console.log("Inside addToCart function in dataservice");
  let productId = Number(id);

  return db.User.findOne({ email }).then((result) => {
    if (result) {
      console.log(result);
      // email is present in db
      result.cart.push({
        productId,
        count,
      });
      result.save();
      // to update in mongodb
      return {
        statusCode: 200,
        message: `product id ${productId} added to cart`,
      };
    } else {
      return {
        statusCode: 404,
        message: "Invalid / server error",
      };
    }
  });
};

// removeFromCart
const removeFromCart = (email, id) => {
  console.log("Inside removeFromCart function in dataservice");
  let productId = Number(id);

  return db.User.updateOne(
    { email },
    {
      $pull: {
        cart: { productId },
      },
    }
  ).then((result) => {
    if (result) {
      console.log(result);

      // to update in mongodb
      // result.save();
      return {
        statusCode: 200,
        message: `product id ${productId} removed from cart..`,
      };
    } else {
      return {
        statusCode: 404,
        message: "Invalid / server error",
      };
    }
  });
};
// emptyCart
const emptyCart = (email) => {
  console.log("Inside emptyCart function in dataservice");

  return db.User.findOneAndUpdate(
    { email },
    {
      $set: {
        cart: [],
      },
    }
  ).then((result) => {
    if (result) {
      console.log(result);

      // to update in mongodb
      // result.save();
      return {
        statusCode: 200,
        message: `cart is empty..`,
      };
    } else {
      return {
        statusCode: 404,
        message: "Invalid / server error",
      };
    }
  });
};

//updateCartItemCount
const updateCartItemCount = (email, id, count) => {
  console.log("Inside updateCartItemCount function in dataservice");
  let productId = Number(id);
  count = Number(count);
  return db.User.findOneAndUpdate(
    { email, "cart.productId": productId },
    {
      $set: {
        "cart.$.count": count,
      },
    }
  ).then((result) => {
    if (result) {
      console.log(result);

      // to update in mongodb
      // result.save();
      return {
        statusCode: 200,
        message: `product id ${productId} item count  updated..`,
      };
    } else {
      return {
        statusCode: 404,
        message: "Invalid / server error",
      };
    }
  });
};

//getMyItems
const getWishlist = (email) => {
  console.log("Inside getMyItems function in dataservice");
  // check email in mongodb
  return db.User.findOne({ email }).then((result) => {
    if (result) {
      //generate token
      const token = jwt.sign({ email }, "B68DC6BECCF4A68C3D8D78FE742E2", {
        algorithm: "HS256",
      });
      return {
        statusCode: 200,
        message: `got my items of ${result.username}`,
        username: result.username,
        checkout: result.checkout,
        wishlist: result.wishlist,
        cart: result.cart,
        email,
        token,
      };
    } else {
      return {
        statusCode: 403,
        message: "Invalid email / server issues",
      };
    }
  });
};

//getMyOrders
const getMyOrders = (email) => {
  console.log("Inside getMyOrders function in dataservice");
  // check email in mongodb
  return db.User.findOne({ email }).then((result) => {
    if (result) {
      //generate token
      const token = jwt.sign({ email }, "B68DC6BECCF4A68C3D8D78FE742E2", {
        algorithm: "HS256",
      });
      return {
        statusCode: 200,
        message: `got orders of ${result.username}`,
        checkout: result.checkout,
      };
    } else {
      return {
        statusCode: 403,
        message: "Invalid email / server issues",
      };
    }
  });
};

// addToCheckout
const addToCheckout = (
  email,
  orderID,
  transactionID,
  dateAndTime,
  amount,
  status,
  products,
  detailes
) => {
  console.log("Inside addToCheckout function in dataservice");
  // let productId = Number(id);

  return db.User.findOne({ email }).then((result) => {
    if (result) {
      console.log(result);
      // email is present in db
      result.checkout.push({
        orderID,
        transactionID,
        dateAndTime,
        amount,
        status,
        products,
        detailes,
      });
      result.save();
      // to update in mongodb
      return {
        statusCode: 200,
        message: `transaction ${transactionID} added to checkout`,
        name: detailes.name,
        mobile: detailes.mobile,
        orderID,
        transactionID,
        dateAndTime,
        amount,
      };
    } else {
      return {
        statusCode: 404,
        message: "Invalid / server error",
      };
    }
  });
};

<<<<<<< HEAD
// NEW CART FUNCTIONS

// Get cart by userId
const getCart = (userId) => {
  return db.Cart.findOne({ userId }).then((result) => {
    if (result) {
      return {
        statusCode: 200,
        cart: result,
      };
    } else {
      return {
        statusCode: 404,
        message: "Cart not found",
        cart: { items: [] }
      };
    }
  });
};

// Add item to cart
const addToCartNew = (userId, productId, name, price, quantity, image) => {
  return db.Cart.findOne({ userId }).then((cart) => {
    if (cart) {
      // Check if item already exists
      const existingItemIndex = cart.items.findIndex(item => item.productId === productId);
      if (existingItemIndex !== -1) {
        // Update quantity
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        cart.items.push({ productId, name, price, quantity, image });
      }
      cart.updatedAt = Date.now();
      return cart.save().then(() => ({
        statusCode: 200,
        message: "Cart updated successfully",
        cart
      }));
    } else {
      // Create new cart
      const newCart = new db.Cart({
        userId,
        items: [{ productId, name, price, quantity, image }],
        updatedAt: Date.now()
      });
      return newCart.save().then(() => ({
        statusCode: 200,
        message: "Cart created successfully",
        cart: newCart
      }));
    }
  });
};

// Update cart item quantity
const updateCartItemQuantity = (userId, productId, quantity) => {
  return db.Cart.findOne({ userId }).then((cart) => {
    if (!cart) {
      return {
        statusCode: 404,
        message: "Cart not found"
      };
    }
    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if (itemIndex === -1) {
      return {
        statusCode: 404,
        message: "Item not found in cart"
      };
    }
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }
    cart.updatedAt = Date.now();
    return cart.save().then(() => ({
      statusCode: 200,
      message: "Cart item updated successfully",
      cart
    }));
  });
};

// Remove item from cart
const removeCartItem = (userId, productId) => {
  return db.Cart.findOneAndUpdate(
    { userId },
    { $pull: { items: { productId } }, $set: { updatedAt: Date.now() } },
    { new: true }
  ).then((cart) => {
    if (cart) {
      return {
        statusCode: 200,
        message: "Item removed from cart",
        cart
      };
    } else {
      return {
        statusCode: 404,
        message: "Cart not found"
      };
    }
  });
};

// Clear cart
const clearCart = (userId) => {
  return db.Cart.findOneAndUpdate(
    { userId },
    { $set: { items: [], updatedAt: Date.now() } },
    { new: true }
  ).then((cart) => {
    if (cart) {
      return {
        statusCode: 200,
        message: "Cart cleared successfully",
        cart
      };
    } else {
      return {
        statusCode: 404,
        message: "Cart not found"
      };
    }
  });
};

// Merge guest cart into user cart
const mergeGuestCart = (userId, guestItems) => {
  return db.Cart.findOne({ userId }).then((cart) => {
    if (cart) {
      // Merge items
      guestItems.forEach(guestItem => {
        const existingIndex = cart.items.findIndex(item => item.productId === guestItem.productId);
        if (existingIndex !== -1) {
          cart.items[existingIndex].quantity += guestItem.quantity;
        } else {
          cart.items.push(guestItem);
        }
      });
      cart.updatedAt = Date.now();
      return cart.save().then(() => ({
        statusCode: 200,
        message: "Guest cart merged successfully",
        cart
      }));
    } else {
      // Create new cart with guest items
      const newCart = new db.Cart({
        userId,
        items: guestItems,
        updatedAt: Date.now()
      });
      return newCart.save().then(() => ({
        statusCode: 200,
        message: "Cart created from guest items",
        cart: newCart
      }));
    }
  });
};

// PAYMENT FUNCTIONS

// Create simulated card payment order
const createCardOrder = (userId, amount, shippingAddress, cardLastFour) => {
  console.log('[DEBUG] createCardOrder called with:', { userId, amount, shippingAddress, cardLastFour });
  
  // Calculate total from cart to validate amount
  return db.Cart.findOne({ userId }).then((cart) => {
    if (!cart || cart.items.length === 0) {
      console.log('[DEBUG] Cart is empty or not found');
      return {
        statusCode: 400,
        message: "Cart is empty"
      };
    }
    
    console.log('[DEBUG] Cart found with items:', cart.items.length);
    
    // Calculate server-side total
    const serverTotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    console.log('[DEBUG] Server calculated total:', serverTotal);
    console.log('[DEBUG] Frontend sent amount:', amount);
    
    // Validate amount matches server calculation
    if (Math.abs(amount - serverTotal) > 0.01) {
      console.log('[DEBUG] Amount mismatch detected');
      return {
        statusCode: 400,
        message: "Amount mismatch. Please try again."
      };
    }
    
    // Create order with card payment method
    const newOrder = new db.Order({
      userId,
      items: cart.items,
      totalAmount: serverTotal,
      paymentMethod: 'card',
      cardLastFour: cardLastFour || null,
      status: 'placed',
      shippingAddress,
      createdAt: Date.now()
    });
    
    console.log('[DEBUG] Creating card order...');
    
    return newOrder.save().then((savedOrder) => {
      console.log('[DEBUG] Card order saved to database:', savedOrder._id);
      
      // Clear user's cart after order placement
      return clearCart(userId).then(() => {
        console.log('[DEBUG] Cart cleared after card order');
        return {
          statusCode: 200,
          message: "Order placed successfully",
          order: savedOrder
        };
      });
    }).catch((error) => {
      console.error('[ERROR] Card order creation error:', error);
      return {
        statusCode: 500,
        message: "Failed to create order"
      };
    });
  });
};

// Get user orders
const getUserOrders = (userId) => {
  return db.Order.find({ userId }).sort({ createdAt: -1 }).then((orders) => {
    if (orders) {
      return {
        statusCode: 200,
        orders
      };
    } else {
      return {
        statusCode: 404,
        message: "No orders found",
        orders: []
      };
    }
  });
};

// Create cash on delivery order
const createCashOrder = (userId, amount, shippingAddress) => {
  console.log('[DEBUG] createCashOrder called with:', { userId, amount, shippingAddress });
  
  // Calculate total from cart to validate amount
  return db.Cart.findOne({ userId }).then((cart) => {
    if (!cart || cart.items.length === 0) {
      console.log('[DEBUG] Cart is empty or not found');
      return {
        statusCode: 400,
        message: "Cart is empty"
      };
    }
    
    console.log('[DEBUG] Cart found with items:', cart.items.length);
    
    // Calculate server-side total
    const serverTotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    console.log('[DEBUG] Server calculated total:', serverTotal);
    console.log('[DEBUG] Frontend sent amount:', amount);
    
    // Validate amount matches server calculation
    if (Math.abs(amount - serverTotal) > 0.01) {
      console.log('[DEBUG] Amount mismatch detected');
      return {
        statusCode: 400,
        message: "Amount mismatch. Please try again."
      };
    }
    
    // Create order with cash payment method
    const newOrder = new db.Order({
      userId,
      items: cart.items,
      totalAmount: serverTotal,
      paymentMethod: 'cash',
      status: 'placed',
      shippingAddress,
      createdAt: Date.now()
    });
    
    console.log('[DEBUG] Creating cash order...');
    
    return newOrder.save().then((savedOrder) => {
      console.log('[DEBUG] Cash order saved to database:', savedOrder._id);
      
      // Clear user's cart after order placement
      return clearCart(userId).then(() => {
        console.log('[DEBUG] Cart cleared after cash order');
        return {
          statusCode: 200,
          message: "Order placed successfully",
          order: savedOrder
        };
      });
    }).catch((error) => {
      console.error('[ERROR] Cash order creation error:', error);
      return {
        statusCode: 500,
        message: "Failed to create order"
      };
    });
  });
};

// Subscribe to newsletter
const subscribeNewsletter = (email) => {
  console.log('[DEBUG] subscribeNewsletter called with:', email);
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      statusCode: 400,
      message: "Invalid email format"
    };
  }
  
  // Check if email already exists
  return db.Newsletter.findOne({ email }).then((existing) => {
    if (existing) {
      console.log('[DEBUG] Email already subscribed');
      return {
        statusCode: 409,
        message: "Email already subscribed"
      };
    }
    
    // Create new subscription
    const newSubscription = new db.Newsletter({
      email,
      subscribedAt: Date.now()
    });
    
    console.log('[DEBUG] Creating newsletter subscription...');
    
    return newSubscription.save().then(() => {
      console.log('[DEBUG] Newsletter subscription saved');
      return {
        statusCode: 200,
        message: "Successfully subscribed to newsletter"
      };
    }).catch((error) => {
      console.error('[ERROR] Newsletter subscription error:', error);
      if (error.code === 11000) {
        return {
          statusCode: 409,
          message: "Email already subscribed"
        };
      }
      return {
        statusCode: 500,
        message: "Failed to subscribe to newsletter"
      };
    });
  });
};

=======
>>>>>>> 8c08a43b65d17692221f92e776ba12e9af1c2c8c
module.exports = {
  allProducts,
  viewProduct,
  register,
  login,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  addToCart,
  removeFromCart,
  updateCartItemCount,
  emptyCart,
  addToCheckout,
  getMyOrders,
<<<<<<< HEAD
  // New cart functions
  getCart,
  addToCartNew,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
  mergeGuestCart,
  // Payment functions
  getUserOrders,
  createCashOrder,
  createCardOrder,
  // Newsletter function
  subscribeNewsletter,
=======
>>>>>>> 8c08a43b65d17692221f92e776ba12e9af1c2c8c
};
