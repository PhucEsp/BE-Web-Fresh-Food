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
            res.json(data)
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
        
        let sql = 'INSERT INTO GIOHANG SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json(data)
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