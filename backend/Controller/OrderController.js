import HandleError from "../helper/handleError.js";
import Order from "../models/OrderModel.js";
import Product from "../models/ProductModel.js";

//Create new Order
export const createNewOrder = async (req, res, next) => {
  const {
    shippingAddress,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingAddress,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    order,
  });
};

//Get Single Order
export const getOrderDetails = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );
  if (!order) {
    return next(new HandleError("Order not found", 400));
  }
  res.status(200).json({
    success: true,
    order,
  });
};

//Get all order details
export const getAllOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  if (!orders) {
    return next(new HandleError("Orders not found", 404));
  }
  res.status(200).json({
    success: true,
    orders,
  });
};

//Get All Orders by Admin
export const getAllOrdersByAdmin = async (req, res, next) => {
  const orders = await Order.find();
  if (!orders) {
    return next(new HandleError("Orders not found", 404));
  }
  let totalAmount = 0;
  orders.forEach((order) => (totalAmount += order.totalPrice));
  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
};

//Admin Delete Orders
export const deleteOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new HandleError("Order not found", 404));
  }
  if (order.orderStatus !== "Delivered") {
    return next(
      new HandleError(
        "This order is under processing and cannot be deleted",
        404,
      ),
    );
  }
  await Order.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "Order Deleted successfully",
  });
};

//Admin Order Update
export const updateOrderStatus = async (req, res, next) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  if (!order) {
    return next(new HandleError("Order not found", 404));
  }
  if (order.orderStatus == "Delivered") {
    return next(new HandleError("This order is already been delivered", 404));
  }
  //Update stock
  await Promise.all(
    order.orderItems.map((item) => updateQuantity(item.product, item.quantity)),
  );
  order.orderStatus = req.body.status;
  if (order.orderStatus === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    order,
  });
};

const updateQuantity = async (id, quantity) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error("Product not Found");
  }
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
};
