'use strict'

const util = require('util')
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const db = require('../db')
const { throws } = require('assert')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM NHANVIEN'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM NHANVIEN WHERE TAIKHOAN = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = {
            TAIKHOAN: req.body.TAIKHOAN,
            MATKHAU: bcrypt.hashSync(req.body.MATKHAU,10),
            MAQUYEN: req.body.MAQUYEN
        }
        let data1 = {
            TAIKHOAN: req.body.TAIKHOAN,
            HOTEN :req.body.HOTEN,
            DIACHI :req.body.DIACHI
        }
        let tk = req.params.id;
        //update DangNhap
        let sql = 'UPDATE DANGNHAP SET ? WHERE TAIKHOAN = ?';
        db.query(sql, [data, tk], (err, response) => {
            if (err) throw err
        })
        //update Nhanvien
        sql = 'UPDATE NHANVIEN SET ? WHERE TAIKHOAN = ?';
        db.query(sql, [data1, tk], (err, response) => {
            if (err) throw err
            res.json({message: 'Update Nhanvien success!'})
        })
    },
    store: (req, res) => {
        let data = {
            TAIKHOAN: req.body.TAIKHOAN,
            MATKHAU: req.body.MATKHAU,
            HOTEN: req.body.HOTEN,
            DIACHI: req.body.DIACHI,
            MAQUYEN : 2 
        }
        // let data = req.body;
        const TAIKHOAN = data.TAIKHOAN;
        const MATKHAU = data.MATKHAU;
        const HOTEN = data.HOTEN;
        const DIACHI = data.DIACHI;
        const MAQUYEN = data.MAQUYEN;
        let RegExp = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
        
                
        
        // check Username
        if( TAIKHOAN.length < 6){
            return res.json({
                message: 'TAIKHOAN must be required at least 6 characters'
            });
        }
        if(RegExp.test(TAIKHOAN)){
            return res.json({
                message: 'Invalid TAIKHOAN! only accept alphabet, number and underscore'
            });
        }
        // check password
        if(MATKHAU.length < 6){
            return res.json({
                message: 'MATKHAU must be required at least 6 characters'
            });
        }
        if(!HOTEN){
            return res.json({
                message: 'HOTEN is NOT NULL'
            });
        }
        // check done ^^
        try {
            //insert table DANGNHAP
            var sql = 'INSERT INTO DANGNHAP SET ?'
            const DANGNHAP = {
                TAIKHOAN: data.TAIKHOAN,
                MATKHAU: bcrypt.hashSync(data.MATKHAU,10),
                MAQUYEN: data.MAQUYEN
            }
            db.query(sql, [DANGNHAP], (err, response) => {
                if (err) throw err
                 //res.json({message: 'Insert DANGNHAP success!'});
            })

            //insert table NHANVIEN
            sql = 'INSERT INTO NHANVIEN SET ?';
            const NHANVIEN = {
                TAIKHOAN: data.TAIKHOAN,
                HOTEN: data.HOTEN,
                DIACHI: data.DIACHI
            }
            db.query(sql, [NHANVIEN], (err, response) => {
                if (err) throw err
                res.json({message: 'Insert NHANVIEN success!'});
                return;
            })
        } catch (error) {
            error.message;
        }

                
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM NHANVIEN WHERE TAIKHOAN = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            res.json({message: 'Delete success!'})
        })
    }
}