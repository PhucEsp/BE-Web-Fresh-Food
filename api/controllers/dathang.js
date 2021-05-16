'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')
const { throws } = require('assert')
const { response } = require('express')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM DATHANG'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM DATHANG WHERE ID = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    detailkh: (req, res) => {
        let sql = 'SELECT * FROM DATHANG WHERE MAKH = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    update: (req, res) => {
        let data = req.body;
        let MANV = data.MANV;
        let MAKH = data.MAKH;
        let DIACHI = data.DIACHI;
        if(!MANV){
            return res.json({
                message: 'Mã Nhân Viên không được rỗng'
            });
        }
        if(!MAKH){
            return res.json({
                message: 'Mã Khách Hàng không được rỗng'
            });
        }
        if(!DIACHI){
            return res.json({
                message: 'Địa chỉ không được rỗng'
            });
        }
        let sql = 'UPDATE DATHANG SET ? WHERE ID = ?'
        db.query(sql, [data, req.params.id], (err, response) => {
            if (err) throw err
            res.json(data)
        })
    },
    comform: (req, res) => {
        let ID = req.body.ID;
        let MANV = req.body.MANV;
        let sql = 'UPDATE DATHANG SET TRANGTHAI = 1,MANV=? WHERE ID = ?'
        db.query(sql, [MANV,ID], (err, response) => {
            if (err) throw err
            res.json(ID)
        })
    },
    store: (req, res) => {
        let data = req.body;
        let MAKH = data.MAKH;
        let DIACHI = data.DIACHI;

        if(!MAKH){
            return res.json({
                message: 'Mã Khách Hàng không được rỗng'
            });
        }
        if(!DIACHI){
            return res.json({
                message: 'Địa chỉ không được rỗng'
            });
        }

        let sql = 'INSERT INTO DATHANG SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json(data)
        })
    },
    

    // order: (req, res) => {
    //     var data ={
    //         //MANV : req.body.MANV,
    //         MAKH : req.body.MAKH
    //     }
    //     var dathang={
    //         MAKH : null,
    //         MANV : null,
    //         TONGTIEN: null,
    //         THOIGIAN : null,
    //         DIACHI : null,
    //         TRANGTHAI : null
    //     }
    //     var ctdh ={
    //         ID : null,
    //         MADH : null,
    //         MASP : null,
    //         GIA : null,
    //         SOLUONG : null
    //     }
    //     // lấy ra tất cả những sản phẩm trong giỏ hàng của 1 khách hàng
    //     var sql = 'SELECT * FROM GIOHANG WHERE MAKH = ?'
        
        
    //     db.query(sql, [data.MAKH], (err, response) => {
    //         if (err) throw err
    //         //check điều kiện để đảm bảo trong giỏ hàng của khách hàng có sản phẩm
    //         if(response){
    //             // lấy thông tin địa chỉ cho bảng đặt hàng từ bảng khách hàng
    //             sql = 'SELECT * FROM KHACHHANG WHERE MAKH = ?'
    //             db.query(sql, [data.MAKH], (err, response1) => {
    //                 if (err) throw err
    //                 dathang.MAKH = data.MAKH
    //                 dathang.MANV = null
    //                 dathang.TONGTIEN = null
    //                 dathang.THOIGIAN = new Date()
    //                 dathang.DIACHI = response1[0].DIACHI
    //                 dathang.TRANGTHAI = 0 ;
    //                 //Tạo bảng Đặt hàng để chứa các CTDH
    //                 // callback function()
    //                 // sql = 'INSERT INTO DATHANG SET ?'
    //                 // db.query(sql, [dathang])
    //                 function f1(){
    //                     sql = 'INSERT INTO DATHANG SET ?'
    //                     db.query(sql, [dathang])
    //                 }
    //                 f1();
                    
    //             })
    //             //lấy Mã Đặt hàng vừa tạo để tạo CTDH
    //             //sql = 'SELECT * FROM Fruit.DATHANG WHERE ID = ( SELECT MAX(ID) FROM Fruit.DATHANG where MAKH = 1 AND MANV = 1) ;'
    //             function f2(){
    //                 sql = 'SELECT MAX(ID) AS MAX FROM Fruit.DATHANG;'
    //                     db.query(sql, [], (err, response3) => {
    //                         if (err) throw err
    //                         var maxid = response3[0].MAX +1
    //                         var tongtien =0
    //                         sql = 'SELECT * FROM Fruit.SANPHAM WHERE ID = ? ;'
    //                         response.forEach(element => {
    //                             db.query(sql, [element.MASP], (err, response4) => {
    //                                 if (err) throw err
    //                                 ctdh.ID = null
    //                                 ctdh.MADH = maxid
    //                                 ctdh.MASP = element.MASP
    //                                 ctdh.GIA = response4[0].GIA
    //                                 ctdh.SOLUONG = element.SOLUONG
    //                                 tongtien = tongtien + (response4[0].GIA*element.SOLUONG)
    //                                 //thêm từng ctdh
    //                                 sql = 'INSERT INTO CTDH SET ?'
    //                                 db.query(sql, [ctdh], (err, response5) => {
    //                                     if (err) throw err
    //                                 })
    //                                 //cập nhật lại tổng tiền 
    //                                 sql = 'UPDATE Fruit.DATHANG SET TONGTIEN = ? WHERE ID = ?'
    //                                 db.query(sql, [tongtien,maxid], (err, response6) => {
    //                                     if (err) throw err
        
    //                                 })
    //                             })
                                
    //                         });
    //                     })
    //                 }
    //             f2();
    //             sql = 'DELETE FROM GIOHANG WHERE MAKH = ?'
    //             db.query(sql, [data.MAKH], (err, response7) => {
    //                 if (err) throw err
    //                 res.json({message: 'Đặt hàng thành công'})
    //             })
    //         }
    //         else{
    //             res.json({message: 'Giỏ hàng của Khách hàng này rỗng'})
    //         }
    //     })
    // },

    order: (req, res) => {
        var data ={
            MAKH : req.body.MAKH,
            HOTEN : req.body.HOTEN,
            SDT: req.body.SDT,
            MAIL: req.body.MAIL,
            DIACHI: req.body.DIACHI
        }
        var dathang={
            MAKH : null,
            MANV : null,
            TONGTIEN: null,
            THOIGIAN : null,
            DIACHI : null,
            TRANGTHAI : null,
            HOTEN : null,
            SDT: null,
            MAIL: null
        }
        var ctdh ={
            ID : null,
            MADH : null,
            MASP : null,
            GIA : null,
            SOLUONG : null
        }
        // lấy ra tất cả những sản phẩm trong giỏ hàng của 1 khách hàng
        var sql = 'SELECT * FROM GIOHANG WHERE MAKH = ?'
        
        
        db.query(sql, [data.MAKH], (err, response) => {
            if (err) throw err
            //check điều kiện để đảm bảo trong giỏ hàng của khách hàng có sản phẩm
            if(response){
                // lấy thông tin địa chỉ cho bảng đặt hàng từ bảng khách hàng

                dathang.MAKH = data.MAKH
                dathang.MANV = null
                dathang.TONGTIEN = null
                dathang.THOIGIAN = new Date()
                dathang.TRANGTHAI = 1 ;
                dathang.HOTEN = data.HOTEN
                dathang.SDT = data.SDT
                dathang.MAIL = data.MAIL
                dathang.DIACHI = data.DIACHI
                    function f1(){
                        sql = 'INSERT INTO DATHANG SET ?'
                        db.query(sql, [dathang])
                    }
                    f1();
                    
                //})
                //lấy Mã Đặt hàng vừa tạo để tạo CTDH
                //sql = 'SELECT * FROM Fruit.DATHANG WHERE ID = ( SELECT MAX(ID) FROM Fruit.DATHANG where MAKH = 1 AND MANV = 1) ;'
                function f2(){
                    sql = 'SELECT MAX(ID) AS MAX FROM Fruit.DATHANG;'
                        db.query(sql, [], (err, response3) => {
                            if (err) throw err
                            var maxid = response3[0].MAX
                            var tongtien =0
                            sql = 'SELECT * FROM Fruit.SANPHAM WHERE ID = ? ;'
                            response.forEach(element => {
                                db.query(sql, [element.MASP], (err, response4) => {
                                    if (err) throw err
                                    ctdh.ID = null
                                    ctdh.MADH = maxid
                                    ctdh.MASP = element.MASP
                                    ctdh.GIA = response4[0].GIA
                                    ctdh.SOLUONG = element.SOLUONG
                                    tongtien = tongtien + (response4[0].GIA*element.SOLUONG)
                                    //thêm từng ctdh
                                    sql = 'INSERT INTO CTDH SET ?'
                                    db.query(sql, [ctdh], (err, response5) => {
                                        if (err) throw err
                                    })
                                    //cập nhật lại tổng tiền 
                                    sql = 'UPDATE Fruit.DATHANG SET TONGTIEN = ? WHERE ID = ?'
                                    db.query(sql, [tongtien,maxid], (err, response6) => {
                                        if (err) throw err
        
                                    })
                                })
                                
                            });
                        })
                    }
                f2();
                sql = 'DELETE FROM GIOHANG WHERE MAKH = ?'
                db.query(sql, [data.MAKH], (err, response7) => {
                    if (err) throw err
                    res.json({message: 'Đặt hàng thành công'})
                })
            }
            else{
                res.json({message: 'Giỏ hàng của Khách hàng này rỗng'})
            }
        })
    },

    cancel:(req, res) => {
        let MADH = req.body.ID
        var sql = 'DELETE FROM CTDH WHERE MADH = ?'
        db.query(sql, [MADH], (err, response) => {
            if (err) throw err
        })
        sql = 'UPDATE DATHANG SET TRANGTHAI = 5 WHERE ID = ?'
        db.query(sql, [MADH], (err, response1) => {
            if (err) throw err
            res.json({message: 'Cancel success!'})
        })

    },
    delete: (req, res) => {
        let sql = 'DELETE FROM DATHANG WHERE ID = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            res.json({message: 'Delete success!'})
        })
    }
    // order: (req, res) => {
    //     var data ={
    //         MAKH : req.body.MAKH
    //     }
    //     var dathang={
    //         MAKH : null,
    //         MANV : null,
    //         TONGTIEN: null,
    //         THOIGIAN : null,
    //         DIACHI : null,
    //         TRANGTHAI : null
    //     }
    //     var ctdh ={
    //         ID : null,
    //         MADH : null,
    //         MASP : null,
    //         GIA : null,
    //         SOLUONG : null
    //     }
    //     // lấy ra tất cả những sản phẩm trong giỏ hàng của 1 khách hàng
    //     var sql = 'SELECT * FROM GIOHANG WHERE MAKH = ?'
        
    //     db.query(sql, [data.MAKH], (err, response) => {
    //         if (err) throw err
    //         //check điều kiện để đảm bảo trong giỏ hàng của khách hàng có sản phẩm
    //         if(response){
    //             // lấy thông tin địa chỉ cho bảng đặt hàng từ bảng khách hàng
    //             sql = 'SELECT * FROM KHACHHANG WHERE MAKH = ?'
    //             db.query(sql, [data.MAKH], (err, response1) => {
    //                 if (err) throw err
    //                 dathang.MAKH = data.MAKH
    //                 dathang.MANV = null
    //                 dathang.TONGTIEN = null
    //                 dathang.THOIGIAN = new Date()
    //                 dathang.DIACHI = response1[0].DIACHI
    //                 dathang.TRANGTHAI = 0 ;
    //                 //Tạo bảng Đặt hàng để chứa các CTDH
    //                 // callback function()
    //                 // sql = 'INSERT INTO DATHANG SET ?'
    //                 // db.query(sql, [dathang])
    //                 function f1(){
    //                     sql = 'INSERT INTO DATHANG SET ?'
    //                     db.query(sql, [dathang])
    //                 }
    //                 f1();
                    
    //             })
    //             //lấy Mã Đặt hàng vừa tạo để tạo CTDH
    //             //sql = 'SELECT * FROM Fruit.DATHANG WHERE ID = ( SELECT MAX(ID) FROM Fruit.DATHANG where MAKH = 1 AND MANV = 1) ;'
    //             function f2(){
    //                 sql = 'SELECT MAX(ID) AS MAX FROM Fruit.DATHANG;'
    //                     db.query(sql, [], (err, response3) => {
    //                         if (err) throw err
    //                         var maxid = response3[0].MAX +1
    //                         var tongtien =0
    //                         sql = 'SELECT * FROM Fruit.SANPHAM WHERE ID = ? ;'
    //                         response.forEach(element => {
    //                             db.query(sql, [element.MASP], (err, response4) => {
    //                                 if (err) throw err
    //                                 ctdh.ID = null
    //                                 ctdh.MADH = maxid
    //                                 ctdh.MASP = element.MASP
    //                                 ctdh.GIA = response4[0].GIA
    //                                 ctdh.SOLUONG = element.SOLUONG
    //                                 tongtien = tongtien + (response4[0].GIA*element.SOLUONG)
    //                                 //thêm từng ctdh
    //                                 sql = 'INSERT INTO CTDH SET ?'
    //                                 db.query(sql, [ctdh], (err, response5) => {
    //                                     if (err) throw err
    //                                 })
    //                                 //cập nhật lại tổng tiền 
    //                                 sql = 'UPDATE Fruit.DATHANG SET TONGTIEN = ? WHERE ID = ?'
    //                                 db.query(sql, [tongtien,maxid], (err, response6) => {
    //                                     if (err) throw err
        
    //                                 })
    //                             })
                                
    //                         });
    //                     })
    //                 }
    //             f2();
    //             sql = 'DELETE FROM GIOHANG WHERE MAKH = ?'
    //             db.query(sql, [data.MAKH], (err, response7) => {
    //                 if (err) throw err
    //                 res.json({message: 'Đặt hàng thành công'})
    //             })
    //         }
    //         else{
    //             res.json({message: 'Giỏ hàng của Khách hàng này rỗng'})
    //         }
    //     })
    // },
  
}