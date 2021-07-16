'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')
const { throws } = require('assert')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM GIOHANG'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    getCartProducts: (req, res) => {
        const makh = req.body.MAKH;
        let sql = `SELECT GIOHANG.ID, GIOHANG.MAKH, GIOHANG.MASP, SANPHAM.TENSP, SANPHAM.DONVITINH, GIOHANG.SOLUONG, SANPHAM.GIA, SANPHAM.HINHANH FROM SANPHAM JOIN GIOHANG ON (GIOHANG.MAKH = ? AND GIOHANG.MASP = SANPHAM.ID )`
        db.query(sql,[req.params.id], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM GIOHANG WHERE ID = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    detailkh: (req, res) => {
        let sql = 'SELECT * FROM GIOHANG WHERE MAKH = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    update: (req, res) => {
        let data = req.body;
        let MASP = data.MASP;
        let MAKH = data.MAKH;
        let SOLUONG = data.SOLUONG;
        if(!MASP){
            return res.json({
                message: 'Mã Sản Phẩm không được rỗng'
            });
        }
        if(!MAKH){
            return res.json({
                message: 'Mã Khách Hàng không được rỗng'
            });
        }
        if(SOLUONG===0){
            return res.json({
                message: 'Số lượng phải lớn hơn 0'
            });
        }
        let sql = 'UPDATE GIOHANG SET ? WHERE ID = ?'
        db.query(sql, [data,req.params.id], (err, response) => {
            if (err) throw err
            res.json('update success')
        })
    },
    store: (req, res) => {

        let data = req.body;
        let MASP = data.MASP;
        let MAKH = data.MAKH;
        let SOLUONG = data.SOLUONG;
        
        if(!MASP){
            return res.json({
                message: 'Mã Sản Phẩm không được rỗng'
            });
        }
        if(!MAKH){
            return res.json({
                message: 'Mã Khách Hàng không được rỗng'
            });
        }
        if(SOLUONG===0){
            return res.json({
                message: 'Số lượng phải lớn hơn 0'
            });
        }
        
        let sql_1=  `SELECT * FROM GIOHANG WHERE MAKH = ${MAKH} AND MASP = ${MASP}`
        
        db.query(sql_1,[MAKH,MASP],(err,response)=>{ 
            if (err) throw err
            const check = response;
            if(Object.keys(response).length) {
                const newData = {
                    ...data, 
                    SOLUONG: parseInt(SOLUONG, 10)  +  parseInt(check[0].SOLUONG, 10) ,
                }
                let sql = 'UPDATE GIOHANG SET ? WHERE ID = ?'
                db.query(sql, [newData,check[0].ID], (err, response) => {
                    if (err) throw err
                    res.json('update success')
                })
            }
            else {
                let sql = 'INSERT INTO GIOHANG SET ?'
                db.query(sql, [data], (err, response) => {
                    if (err) throw err
                    res.json(data)
                })
            }
        })
       
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM GIOHANG WHERE ID = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            res.json({message: 'Delete success!'})
        })
    }
}