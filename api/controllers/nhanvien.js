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
            HOTEN :req.body.HOTEN,
            DIACHI :req.body.DIACHI,
        }
        const MANV = data.MANV;
        const HOTEN = data.HOTEN;
        const DIACHI = data.DIACHI;
        const TAIKHOAN = data.TAIKHOAN;
        let RegExp = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

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
    storeDN: (req, res) => {
        let data = {
            TAIKHOAN: req.body.TAIKHOAN,
            MATKHAU: req.body.MATKHAU,
            MAQUYEN : 2,
            HOTEN: req.body.HOTEN,
            DIACHI: req.body.DIACHI,
            SDT: req.body.SDT,
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
        if(!data.SDT){
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

            let sql_pk = `select * from DANGNHAP where TAIKHOAN = ?`
            db.query(sql_pk, [data.TAIKHOAN], (err, response) => {
                if (err) throw err
                if(response.length) {
                    let api_res = {
                        "message": "Tài khoản đã tổn tại. Vui lòng chọn tài khoản khác",
                        "success": false
                    }
                    res.json(api_res);
                }
                else {
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
                        let api_res = {
                            "message": "Tạo tài khoản cho nhân viên thành công",
                            "success": true
                        }
                        res.json(api_res);
                    })
                }
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