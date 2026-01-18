import Product from "../models/ProductModel.js";
import errorHandler from "../helper/handleError.js";
import ApiHelper from "../helper/ApiHelper.js";
import HandleError from "../helper/handleError.js";

// Add Product
export const addProduct = async (req, res) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

// GET all Products
export const getAllProducts = async (req, res, next) => {
  const resultsPerPage = 4;
  // const products = await Product.find();

  const apiHelper = new ApiHelper(Product.find(), req.query).search().filter();

  const filteredQuery = apiHelper.query.clone();
  const productCount = await filteredQuery.countDocuments();
  const totalPages = Math.ceil(productCount / resultsPerPage);
  const page = Number(req.query.page) || 1;

  if (totalPages > 0 && page > totalPages) {
    return next(new errorHandler("This Page doesn't exist", 404));
  }
  apiHelper.pagination(resultsPerPage);
  const products = await apiHelper.query;

  return res.status(200).json({
    success: true,
    products,
    productCount,
    resultsPerPage,
    totalPages,
    currentPage: page,
  });
};

//Update Product
export const updateProduct = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    //return res.status(500).json({ success: false, message: "Product Not Found" });
    return next(new errorHandler("Product Not Found", 404));
  }

  return res.status(200).json({ success: true, product });
};

//delete product

export const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return next(new errorHandler("Product Not Found", 404));
  }
  return res
    .status(200)
    .json({ success: true, message: "Product deleted success" });
};

//Get Single Product By Id
export const getSingleProduct = async (req, res, next) => {
  //console.log(req.params.id)
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    return next(new errorHandler("Product Not Found", 404));
  }
  return res.status(200).json({ success: true, product });
};

//Create Product Review
export const createProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  if (!product) {
    return next(new HandleError("Product not found", 400));
  }
  const reviewExists = product.reviews.find(
    (review) => review.user.toString() === req.user.id,
  );

  if (reviewExists) {
    //Update Review
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user.id) {
        review.rating = rating;
        reviewExists.comment = comment;
      }
    });
  } else {
    //Add Reivew or Push Review
    product.reviews.push(review);
  }
  //Update Review Count
  product.numOfReviews = product.reviews.length;
  //update Rating
  let sum = 0;
  product.reviews.forEach((review) => {
    sum = sum + review.rating;
  });
  product.ratings =
    product.reviews.length > 0 ? sum / product.reviews.length : 0;

  //Save Details
  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    product,
  });
};

//ViewProductReviews
export const viewProductReviews = async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new HandleError("Product not found", 400));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
};

//Admin View all products
export const getAllProductsByAdmin = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
};

//Delete Review
export const adminDeleteReview = async (req, res, next) => {
  const product = await Product.findById(req.query.productId); //productId
  if (!product) {
    return next(new HandleError("Product not found", 400));
  }
  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString(),
  );
  let sum = 0;
  reviews.forEach((review) => {
    sum += review.rating;
  });
  const ratings = reviews.length > 0 ? sum / reviews.length : 0;
  const numOfReviews = reviews.length;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    { new: true, runValidators: true },
  );
  res.status(200).json({
    success: true,
    message: "Review Deleted Successfully",
  });
};
