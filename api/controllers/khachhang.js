'use strict'

const util = require('util')
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const db = require('../db')
const { throws } = require('assert')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM KHACHHANG'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM KHACHHANG WHERE MAKH = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = {
            MAKH: req.body.MAKH,
            HOTEN :req.body.HOTEN,
            SDT: req.body.SDT,
            MAIL :req.body.MAIL,
            DIACHI :req.body.DIACHI,
            TAIKHOAN: req.body.TAIKHOAN
        }
        let tk = req.params.id;

        const MAKH = data.MAKH;
        const HOTEN = data.HOTEN;
        const DIACHI = data.DIACHI;
        const SDT = data.SDT;
        const MAIL = data.MAIL;
        const TAIKHOAN = data.TAIKHOAN;
        let RegExp = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
        // check Username
        if( MAKH.length < 6){
            return res.json({
                message: 'MAKH must be required at least 6 characters'
            });
        }
        if(RegExp.test(MAKH)){
            return res.json({
                message: 'Invalid MAKH! only accept alphabet, number and underscore'
            });
        }
        // check password
        if(!HOTEN){
            return res.json({
                message: 'HOTEN is NOT NULL'
            });
        }
        if(!SDT){
            return res.json({
                message: 'SDT is NOT NULL'
            });
        }
        if(!DIACHI){
            return res.json({
                message: 'DIACHI is NOT NULL'
            });
        }
        //update KhachHang
        let sql = 'UPDATE KHACHHANG SET ? WHERE MAKH = ?';
        db.query(sql, [data, tk], (err, response) => {
            if (err) throw err
            res.json(data)
        })
    },
    store: (req, res) => {
        let data = {
            MAKH: req.body.MAKH,
            HOTEN: req.body.HOTEN,
            SDT: req.body.SDT,
            MAIL: req.body.MAIL,
            DIACHI: req.body.DIACHI,
            TAIKHOAN: req.body.TAIKHOAN, 
        }
        // let data = req.body;
        const MAKH = data.MAKH;
        const HOTEN = data.HOTEN;
        const DIACHI = data.DIACHI;
        const SDT = data.SDT;
        const MAIL = data.MAIL;
        const TAIKHOAN = data.TAIKHOAN;
        let RegExp = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
        
                
        
        // check Username
        if( MAKH.length < 6){
            return res.json({
                message: 'MAKH must be required at least 6 characters'
            });
        }
        if(RegExp.test(MAKH)){
            return res.json({
                message: 'Invalid MAKH! only accept alphabet, number and underscore'
            });
        }

        if(!HOTEN){
            return res.json({
                message: 'HOTEN is NOT NULL'
            });
        }
        if(!SDT){
            return res.json({
                message: 'SDT is NOT NULL'
            });
        }
        if(!DIACHI){
            return res.json({
                message: 'DIACHI is NOT NULL'
            });
        }
        // check done ^^
        try {
            //insert table KHACHHANG
            let sql = 'INSERT INTO KHACHHANG SET ?';
            const KHACHHANG = {
                MAKH: data.MAKH,
                HOTEN: data.HOTEN,
                SDT: data.SDT,
                MAIL: data.MAIL,
                DIACHI: data.DIACHI,
                TAIKHOAN: data.TAIKHOAN
            }
            db.query(sql, [KHACHHANG], (err, response) => {
                if (err) throw err
                res.json(data);
            })
        } catch (error) {
            error.message;
        }

                
    },
    storeDN: (req, res) => {
        let data = {
            TAIKHOAN: req.body.TAIKHOAN,
            MATKHAU: req.body.MATKHAU,
            MAQUYEN : 3,
            HOTEN: req.body.HOTEN,
            SDT: req.body.SDT,
            MAIL: req.body.MAIL,
            DIACHI: req.body.DIACHI,

        }
        // let data = req.body;
        const TAIKHOAN = data.TAIKHOAN;
        const MATKHAU = data.MATKHAU;
        const HOTEN = data.HOTEN;
        const DIACHI = data.DIACHI;
        const SDT = data.SDT;
        const MAIL = data.MAIL;
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
        if(!SDT){
            return res.json({
                message: 'SDT is NOT NULL'
            });
        }
        if(!DIACHI){
            return res.json({
                message: 'DIACHI is NOT NULL'
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

            //insert table KHACHHANG
            sql = 'INSERT INTO KHACHHANG SET ?';
            const KHACHHANG = {
                TAIKHOAN: data.TAIKHOAN,
                HOTEN: data.HOTEN,
                SDT: data.SDT,
                MAIL: data.MAIL,
                DIACHI: data.DIACHI
            }
            db.query(sql, [KHACHHANG], (err, response) => {
                if (err) throw err
                res.json({message: 'Insert KHACHHANG success!'});
                return;
            })
        } catch (error) {
            error.message;
        }


    },
    delete: (req, res) => {
        let sql = 'DELETE FROM KHACHHANG WHERE MAKH = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            res.json({message: 'Delete success!'})
        })
    }
}