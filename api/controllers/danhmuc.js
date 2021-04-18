'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')
const { throws } = require('assert')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM DANHMUC'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM DANHMUC WHERE ID = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detailsp: (req, res) => {
        let sql = 'SELECT * FROM SANPHAM WHERE MADM = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    update: (req, res) => {
        let data = req.body;
        let TENDM = data.TENDM;
        if(!TENDM){
            return res.json({
                message: 'Tên Danh Mục Không được rỗng'
            });
        }
        let sql = 'UPDATE DANHMUC SET ? WHERE ID = ?'
        db.query(sql, [data, req.params.id], (err, response) => {
            if (err) throw err
            res.json(data)
        })
    },
    store: (req, res) => {
        let data = req.body;
        let TENDM = data.TENDM;

        if(!TENDM){
            return res.json({
                message: 'Tên Danh Mục Không được rỗng'
            });
        }

        let sql = 'INSERT INTO DANHMUC SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json(data)
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM DANHMUC WHERE ID = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            res.json({message: 'Delete success!'})
        })
    }
}