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
    getNV: (req, res) => {
        let sql = 'SELECT * FROM NHANVIEN, DANGNHAP WHERE NHANVIEN.TAIKHOAN = DANGNHAP.TAIKHOAN AND DANGNHAP.MAQUYEN = 2'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    getAdmin: (req, res) => {
        let sql = 'SELECT * FROM NHANVIEN, DANGNHAP WHERE NHANVIEN.TAIKHOAN = DANGNHAP.TAIKHOAN AND DANGNHAP.MAQUYEN = 1'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },

    detail: (req, res) => {
        let sql = 'SELECT * FROM NHANVIEN WHERE MANV = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = {
            MANV: req.body.MANV,
            HOTEN :req.body.HOTEN,
            DIACHI :req.body.DIACHI,
            TAIKHOAN: req.body.TAIKHOAN
        }
        const MANV = data.MANV;
        const HOTEN = data.HOTEN;
        const DIACHI = data.DIACHI;
        const TAIKHOAN = data.TAIKHOAN;
        let RegExp = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
        
                
        
        // check Username
        if( MANV.length < 6){
            return res.json({
                message: 'MANV must be required at least 6 characters'
            });
        }
        if(RegExp.test(MANV)){
            return res.json({
                message: 'Invalid MANV! only accept alphabet, number and underscore'
            });
        }

        if(!HOTEN){
            return res.json({
                message: 'HOTEN is NOT NULL'
            });
        }

        let tk = req.params.id;
        //update Nhanvien
        let sql = 'UPDATE NHANVIEN SET ? WHERE MANV = ?';
        db.query(sql, [data, tk], (err, response) => {
            if (err) throw err
            res.json(data)
        })
    },
    store: (req, res) => {
        let data = {
            MANV: req.body.MANV,
            HOTEN: req.body.HOTEN,
            DIACHI: req.body.DIACHI,
            TAIKHOAN: req.body.TAIKHOAN
        }
        // let data = req.body;
        const MANV = data.MANV;
        const HOTEN = data.HOTEN;
        const DIACHI = data.DIACHI;
        const TAIKHOAN = data.TAIKHOAN;
        let RegExp = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
        
                
        
        // // check Username
        // if( MANV.length < 6){
        //     return res.json({
        //         message: 'MANV must be required at least 6 characters'
        //     });
        // }
        // if(RegExp.test(MANV)){
        //     return res.json({
        //         message: 'Invalid MANV! only accept alphabet, number and underscore'
        //     });
        // }
 
        if(!HOTEN){
            return res.json({
                message: 'HOTEN is NOT NULL'
            });
        }
        // check done ^^
        try {
            //insert table NHANVIEN
            let sql = 'INSERT INTO NHANVIEN SET ?';
            db.query(sql, [data], (err, response) => {
                if (err) throw err
                res.json(data);
            })
        } catch (error) {
            error.message;
        }

                
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM NHANVIEN WHERE MANV = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            res.json({message: 'Delete success!'})
        })
    }
}