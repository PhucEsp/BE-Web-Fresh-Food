'use strict';
module.exports = function(app) {
  let binhluan = require('./controllers/binhluan');
  let blog = require('./controllers/blog');
  let ctdh = require('./controllers/ctdh');
  let dangnhap = require('./controllers/dangnhap');
  let danhgia = require('./controllers/danhgia');
  let danhmuc = require('./controllers/danhmuc');
  let dathang = require('./controllers/dathang');
  let giohang = require('./controllers/giohang');
  let khachhang = require('./controllers/khachhang');
  let nhanvien = require('./controllers/nhanvien');
  let quyen = require('./controllers/quyen');
  let sanpham = require('./controllers/sanpham');

  // todoList Routes

  ////// Khai Báo\\\\\\\\

    //Bình luận
  app.route('/binhluan')
    .get(binhluan.get)
    .post(binhluan.store);

  app.route('/binhluan/:id')
    .get(binhluan.detail)
    .put(binhluan.update)
    .delete(binhluan.delete);
  
  
    //Blog
  app.route('/blog')
    .get(blog.get)
    .post(blog.store);

  app.route('/blog/:id')
    .get(blog.detail)
    .put(blog.update)
    .delete(blog.delete);


  //Chi tiết đặt hàng
  app.route('/ctdh')
    .get(ctdh.get)
    .post(ctdh.store);

  app.route('/ctdh/:id')
    .get(ctdh.detail)
    .put(ctdh.update)
    .delete(ctdh.delete);


    //Đăng nhập đã OK
  app.route('/dangnhap')
    .get(dangnhap.get)//ok
    .post(dangnhap.store)//OK
  
  app.route('/dangnhap/:id')
    .get(dangnhap.detail)//OK
    .put(dangnhap.update)//OK
    .delete(dangnhap.delete);//OK
  
  app.route('/dangnhap/khachhang')
    .post(dangnhap.loginKH);//OK
  app.route('/dangnhap/nhanvien')
    .post(dangnhap.loginNV);//OK
  
    //Đánh Giá
  app.route('/danhgia')
    .get(danhgia.get)
    .post(danhgia.store);

  app.route('/danhgia/:id')
    .get(danhgia.detail)
    .put(danhgia.update)
    .delete(danhgia.delete);

    
    //Danh Mục
  app.route('/danhmuc')
    .get(danhmuc.get)
    .post(danhmuc.store);

  app.route('/danhmuc/:id')
    .get(danhmuc.detail)
    .put(danhmuc.update)
    .delete(danhmuc.delete);


    //Đặt Hàng
  app.route('/dathang')
  .get(dathang.get)
  .post(dathang.store);

  app.route('/dathang/:id')
  .get(dathang.detail)
  .put(dathang.update)
  .delete(dathang.delete);


    //Giỏ hàng
  app.route('/giohang')
  .get(giohang.get)
  .post(giohang.store);

  app.route('/giohang/:id')
  .get(giohang.detail)
  .put(giohang.update)
  .delete(giohang.delete);


    //Khách hàng
  app.route('/khachhang')
  .get(khachhang.get) //OK
  .post(khachhang.store); //OK

  app.route('/khachhang/:id')
  .get(khachhang.detail) //OK
  .put(khachhang.update) // OK
  .delete(khachhang.delete); //OK


    //Nhân Viên
  app.route('/nhanvien') 
    .get(nhanvien.get) //OK
    .post(nhanvien.store); //OK

  app.route('/nhanvien/:id')
    .get(nhanvien.detail) //OK
    .put(nhanvien.update) //OK
    .delete(nhanvien.delete);//OOK

  
    //Quyền
  app.route('/quyen')
  .get(quyen.get)
  .post(quyen.store);

  app.route('/quyen/:id')
  .get(quyen.detail)
  .put(quyen.update)
  .delete(quyen.delete);

    //Sản phẩm
  app.route('/sanpham')
    .get(sanpham.get)
    .post(sanpham.store);

  app.route('/sanpham/:id')
    .get(sanpham.detail)
    .put(sanpham.update)
    .delete(sanpham.delete);

};