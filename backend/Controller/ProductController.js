import Product from "../models/ProductModel.js";
import errorHandler from "../helper/handleError.js";
import ApiHelper from "../helper/ApiHelper.js";

// Add Product
const addProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

// GET all Products
const getAllProducts = async (req, res, next) => {
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
const updateProduct = async (req, res, next) => {
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

const deleteProduct = async (req, res, next) => {
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
const getSingleProduct = async (req, res, next) => {
  //console.log(req.params.id)
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    return next(new errorHandler("Product Not Found", 404));
  }
  return res.status(200).json({ success: true, product });
};

export {
  getAllProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
