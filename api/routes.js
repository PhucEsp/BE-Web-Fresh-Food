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
    .get(binhluan.get)//OK
    .post(binhluan.store);//OK

  app.route('/binhluan/:id')
    .get(binhluan.detail)//OK
    .put(binhluan.update)//OK
    .delete(binhluan.delete);//OK
  app.route('/binhluan/sanpham/:id')
    .get(binhluan.detailsp) //tất cả bình luận của 1 sản phẩm //OK
  
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
  app.route('/dathang/ctdh/:id')
    .get(ctdh.detailCTDH)


    //Đăng nhập đã OK
  app.route('/dangnhap')
    .get(dangnhap.get)//OK
    .post(dangnhap.store)//OK
  
  app.route('/dangnhap/:id')
    .get(dangnhap.detail)//OK
    .put(dangnhap.update)//OK
    .delete(dangnhap.delete);//OK
  
  app.route('/dangnhap/khachhang')
    .post(dangnhap.loginKH);//OK
  app.route('/dangnhap/nhanvien')
    .post(dangnhap.loginNV);//OK
  app.route('/dangnhap/admin')
    .post(dangnhap.loginAdmin);//OK
    //Đánh Giá
  app.route('/danhgia')
    .get(danhgia.get)//OK
    .post(danhgia.store);//OK

  app.route('/danhgia/:id')
    .get(danhgia.detail)//OK
    .put(danhgia.update)//OK
    .delete(danhgia.delete);//OK
  app.route('/danhgia/sanpham/:id')
    .get(danhgia.detailsp)//tất cả đánh giá của 1 sản phẩm //OK
  app.route('/danhgia/kiemtra')
    .post(danhgia.checkRated)
    //Danh Mục
  app.route('/danhmuc')
    .get(danhmuc.get) // tất cả danh mục //OK
    .post(danhmuc.store); // tạo danh mục mới //OK

  app.route('/danhmuc/:id')
    .get(danhmuc.detail)//chi tiết danh mục // OK
    .put(danhmuc.update) //OK
    .delete(danhmuc.delete);//OK
  app.route('/danhmuc/sanpham/:id')
    .get(danhmuc.detailsp)// tất cả sản phẩm của 1 danh mục //OK


    //Đặt Hàng
  app.route('/dathang')
    .get(dathang.get)//OK
    .post(dathang.store);//OK

  app.route('/dathang/:id')
    .get(dathang.detail)//OK
    .put(dathang.update)//OK
    .delete(dathang.delete);//OK

  app.route('/dathang/khachhang/:id')
    .get(dathang.detailkh)//tất cả đặt hàng của 1 khách hàng
  app.route('/thongkedoanhthu/:id')
    .get(dathang.getStatistical)//tất cả đặt hàng của 1 khách hàng
    
  app.route('/dathang/khachhang')
    .post(dathang.order)//đặt hàng(đổ hết những sp trong giỏ hàng của 1 khách hàng vào ctdh của kh đó) gửi lên server MAKH
  app.route('/dathang/xacnhan')
    .post(dathang.confirm) // xác nhận đơn hàng, chuyển trạng thái đơn hàng từ chưa xác nhận-> xác nhận, đồng thời gán mã nhân viên đang đăng nhập xác nhận đơn hàng này vào đặt hàng. 
    app.route('/dathang/huy')
    .post(dathang.cancel) // 
    
    //Giỏ hàng
  app.route('/giohang')
    .get(giohang.get)//OK
    .post(giohang.store);

  app.route('/giohang/:id')
    .get(giohang.detail)
    .put(giohang.update)
    .delete(giohang.delete);
  app.route('/giohang/khachhang/:id')
    .get(giohang.detailkh)//giỏ hàng của 1 khách hàng
  app.route('/giohang/khachhang/sanpham/:id')
    .get(giohang.getCartProducts)

    //Khách hàng
  app.route('/khachhang')
  .get(khachhang.get) //OK
  .post(khachhang.store); //OK
  app.route('/taikhoan/khachhang')
  .post(khachhang.create);

  app.route('/khachhang/:id')
  .get(khachhang.detail) //OK
  .put(khachhang.update) // OK
  .delete(khachhang.delete); //OK
  app.route('/khachhangDN')
  .post(khachhang.storeDN); //OK thêm khách hàng: thêm Đăng nhập trước khi thêm KH

    //Nhân Viên
  app.route('/nhanvien') 
    .get(nhanvien.get) //OK
    .post(nhanvien.store); //OK

  app.route('/nhanvien/:id')
    .get(nhanvien.detail) //OK
    .put(nhanvien.update) //OK
    .delete(nhanvien.delete);//OOK

  app.route('/taikhoan/admin')
    .get(nhanvien.getAdmin)
  app.route('/taikhoan/nhanvien')
    .get(nhanvien.getNV)

    app.route('/nhanvienDN')
    .post(nhanvien.storeDN); //OK thêm nhân viên: thêm Đăng nhập trước khi thêm NV

    //Quyền
  app.route('/quyen')
  .get(quyen.get)
  .post(quyen.store);

  app.route('/quyen/:id')
  .get(quyen.detail)
  .put(quyen.update)
  .delete(quyen.delete);

    //Sản phẩmd
  app.route('/sanpham')
    .get(sanpham.get)
    .post(sanpham.store);

  app.route('/sanpham/:id')
    .get(sanpham.detail)
    .put(sanpham.update)
    .delete(sanpham.delete);

  app.route('/sanpham/random10/:id')
    .get(sanpham.random10)

  app.route('/sanpham/random10/:id')
    .get(sanpham.random10)
};