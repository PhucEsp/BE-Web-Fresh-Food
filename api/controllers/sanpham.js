'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')
const { throws } = require('assert')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM SANPHAM'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    random10:(req, res) => {
        let sql = 'SELECT * FROM SANPHAM WHERE MADM = ? order by RAND() LIMIT 10;'
        db.query(sql,[req.params.id] , (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM SANPHAM WHERE ID = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    random10:(req, res) => {
        let sql = 'SELECT * FROM SANPHAM WHERE MADM = ? order by RAND() LIMIT 10;'
        db.query(sql,[req.params.id] , (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    update: (req, res) => {
        let data = req.body;
        let sql = 'UPDATE SANPHAM SET ? WHERE ID = ?'
        db.query(sql, [data, data.ID], (err, response) => {
            if (err) throw err
            res.json(data)
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO SANPHAM SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json(data)
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM SANPHAM WHERE ID = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            res.json({message: 'Delete success!'})
        })
    }
}