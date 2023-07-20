const mongoose = require('mongoose');
const expressHbs = require('express-handlebars').create({ extname: '.hbs' });
const express = require('express');
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const Product = require("./models/product");
const app = express();
const port = 3000;

app.use(express.json());
app.use('/', userRoutes);
app.use('/', productRoutes);

// Cấu hình handlebars
app.engine('.hbs', expressHbs.engine);
app.set('view engine', '.hbs');

// Cấu hình mongoose
function connectToCollectionDB() {
  mongoose
    .connect('mongodb://127.0.0.1:27017/ql_sanpham', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Đã kết nối tới MongoDB');
    })
    .catch((error) => {
      console.error('Lỗi kết nối MongoDB:', error);
    });
}

connectToCollectionDB();

// Điều hướng đến trang product
app.get('/product', async function(req, res) {
  try {
    const product = await Product.find();
    console.log(product);
    const apiData = [
      {
        _id: "64b8d3d876acb4403a68dbc2",
        nameproduct: 'Lò Vi Sóng',
        price: 120000,
        image: 'https://znews-photo.zingcdn.me/w860/Uploaded/mdf_eioxrd/2021_07_06/2.j…',
        updateAt: "2023-07-19T16:49:36.882Z",
        color: 'blue',
        createAt: "2023-07-20T06:13:19.776Z",
      },
      {
        _id: "64b8d3d876acb4403a68dbc2",
        id: 2,
        nameproduct: 'Nồi cơm',
        price: 120000,
        image: 'https://znews-photo.zingcdn.me/w860/Uploaded/mdf_eioxrd/2021_07_06/2.j…',
        color: 'blue',
        createAt: "2023-07-19T17:07:29.385Z",
        updateAt: "2023-07-19T17:07:29.386Z",
        __v: 0
      }
    ];
    // res.render('layouts/product', {product: [
    //   {
    //     nameproduct: 'Lò Vi Sóng',
    //     id: 1,
    //     price: 120000,
    //     image: 'https://znews-photo.zingcdn.me/w860/Uploaded/mdf_eioxrd/2021_07_06/2.j…',        
    //     updateAt: "2023-07-19T16:49:36.882Z",
    //     color: 'blue',
    //     createAt: "2023-07-20T06:04:09.670Z"
    //   },
    //   {
    //     id: 2,
    //     nameproduct: 'Nồi cơm',
    //     price: 120000,
    //     image: 'https://znews-photo.zingcdn.me/w860/Uploaded/mdf_eioxrd/2021_07_06/2.j…',        
    //     color: 'blue',
    //     createAt: "2023-07-19T17:07:29.385Z",
    //     updateAt: "2023-07-19T17:07:29.386Z",
    //     __v: 0
    //   }
    // ]});

    const thatProduct = product[0];
    
    res.render('layouts/product', {products: apiData});
  } catch (error) {
    return res.status(500).json({ message: 'Đã xảy ra lỗi', error: error.message });
  }
  
});

// Trang chủ
app.get('/', function(req, res){
  res.render('home');
});

app.listen(port, () => {
  console.log(`Server đang chạy http://localhost:${port}`);
});
