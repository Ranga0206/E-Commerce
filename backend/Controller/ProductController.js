import Product from "../models/ProductModel.js";
// Add Product
const addProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

// GET all Products
const getAllProducts = async (req, res) => {
  const products = await Product.find();
  return res.status(200).json({ success: true, products });
};

//Update Product
const updateProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product Not Found" });
  }

  return res.status(200).json({ success: true, product });
};

//delete product

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product Not Found" });
  }
  return res
    .status(200)
    .json({ success: true, message: "Product deleted success" });
};

//Get Single Product By Id
const getSingleProduct = async (req, res) => {
  //console.log(req.params.id)
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product not found" });
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
