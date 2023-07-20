const express = require('express');
const router = express.Router();
const User = require("../models/user");

// API: Thêm người dùng mới
router.post('/users', async (req, res) => {
  try {
    const { username, password, email, fullname } = req.body;
    const newUser = new User({
      username,
      password,
      email,
      fullname  
    });
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'username hoặc email đã đăng ký',error: error });
  }
});
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    //print(users.json());
    console.log(users);
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Đã xảy ra lỗi',error: error.message});
  }

});
// API: Cập nhật thông tin người dùng
router.put('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, password, email, fullname } = req.body;

    // Tìm người dùng theo ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    // Cập nhật thông tin người dùng
    user.username = username;
    user.password = password;
    user.email = email;
    user.fullname = fullname;
    user.updateAt = Date.now();

    // Lưu thông tin người dùng đã cập nhật vào cơ sở dữ liệu
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
});

// API: Xóa người dùng
router.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndRemove(userId);
    res.json({ message: 'Xóa người dùng thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
});

module.exports = router;
