'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')
const { throws } = require('assert')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM BINHLUAN'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM BINHLUAN WHERE ID = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    detailsp: (req, res) => {
        let sql = 'SELECT KHACHHANG.HOTEN , BINHLUAN.THOIGIAN , BINHLUAN.NOIDUNG  FROM BINHLUAN,KHACHHANG  WHERE BINHLUAN.MAKH = KHACHHANG.MAKH AND BINHLUAN.MASP = ?'
        let sql1 = 'SELECT * FROM BINHLUAN WHERE MASP = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    update: (req, res) => {
        let data = req.body;
        let MASP = data.MASP;
        let MAKH = data.MAKH;
        let NOIDUNG = data.NOIDUNG;
        
        if(!MASP){
            return res.json({
                message: 'Mã Sản Phẩm không được rỗng'
            });
        }
        if(!MAKH){
            return res.json({
                message: 'Mã Khách hàng không được rỗng'
            });
        }
        if(!NOIDUNG){
            return res.json({
                message: 'Nội Dung không được rỗng'
            });
        }
        let sql = 'UPDATE BINHLUAN SET ? WHERE ID = ?'
        db.query(sql, [data, req.params.id], (err, response) => {
            if (err) throw err
            res.json(data)
        })
    },
    store: (req, res) => {
        let data = req.body;
        let MASP = data.MASP;
        let MAKH = data.MAKH;
        let NOIDUNG = data.NOIDUNG;
        
        if(!MASP){
            return res.json({
                message: 'Mã Sản Phẩm không được rỗng'
            });
        }
        if(!MAKH){
            return res.json({
                message: 'Mã Khách hàng không được rỗng'
            });
        }
        if(!NOIDUNG){
            return res.json({
                message: 'Nội Dung không được rỗng'
            });
        }

        let sql = 'INSERT INTO BINHLUAN SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json(data)
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM BINHLUAN WHERE ID = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            res.json({message: 'Xoá thành công'})
        })
    }
}