const express = require('express');
const router = express.Router();
const Product = require("../models/product");

// API: Thêm sản phẩm mới
router.post('/products', async (req, res) => {
  try {
    const { id, nameproduct, price, image, color } = req.body;
    const newProduct = new Product({
      id,
      nameproduct,
      price,
      image,
      color
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Đã xảy ra lỗi', error: error.message });
  }
});

// API: Lấy danh sách sản phẩm
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products);
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Đã xảy ra lỗi', error: error.message });
  }
});

// API: Cập nhật thông tin sản phẩm
router.put('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const { id, nameproduct, price, image, color } = req.body;

    // Tìm sản phẩm theo ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }

    // Cập nhật thông tin sản phẩm
    product.id = id;
    product.nameproduct = nameprodduct;
    product.price = price;
    product.image = image;
    product.color = color;
    product.updateAt = Date.now();

    // Lưu thông tin sản phẩm đã cập nhật vào cơ sở dữ liệu
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Đã xảy ra lỗi', error: error.message });
  }
});

// API: Xóa sản phẩm
router.delete('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndRemove(productId);
    res.json({ message: 'Xóa sản phẩm thành công' });
    console.log('Xóa sản phẩm thành công');
  } catch (error) {
    res.status(500).json({ message: 'Đã xảy ra lỗi', error: error.message });
  }
});

module.exports = router;
