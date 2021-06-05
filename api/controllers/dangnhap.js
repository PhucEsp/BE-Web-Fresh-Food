'use strict'

const util = require('util')
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const db = require('../db')
const { throws } = require('assert')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT TAIKHOAN FROM DANGNHAP'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM DANGNHAP WHERE TAIKHOAN = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    loginKH:(req,res)=>{
        try{
            let data = req.body;
            let sql =' SELECT * FROM DANGNHAP WHERE TAIKHOAN=?';
            db.query(sql,[data.TAIKHOAN],(err,response)=>{
                let DANGNHAP = response[0];
                if(DANGNHAP){
                    const validPass = bcrypt.compareSync(req.body.MATKHAU, DANGNHAP.MATKHAU)
                    if(validPass){
                        if(DANGNHAP.MAQUYEN == 3){
                            res.json("Valid");
                        }
                        else{
                            res.json('Access Deny');
                            return false;
                        }
                    }
                    else{
                        res.json('Wrong Password');
                        return false;
                    }
                }
                else{
                    res.json('User not found');
                    return false;
                }
            })
        }
        catch(err){
            res.status(400).send('Connect to Server FAILED');
        }
    },
    loginNV:(req,res)=>{
        try{
            let data = req.body;
            let sql =' SELECT * FROM DANGNHAP WHERE TAIKHOAN=?';
            db.query(sql,[data.TAIKHOAN],(err,response)=>{
                let DANGNHAP = response[0];
                if(DANGNHAP){
                    const validPass = bcrypt.compareSync(data.MATKHAU, DANGNHAP.MATKHAU)
                    if(validPass){
                        if(DANGNHAP.MAQUYEN == 2){
                            res.json("Valid");
                        }
                        else{
                            res.json('Access Deny');
                            return false;
                        }
                    }
                    else{
                        res.json('Wrong Password');
                        return false;
                    }
                }
                else{
                    res.json('User not found');
                    return false;
                }
            })
        }
        catch(err){
            res.status(400).send('Connect to Server FAILED');
        }
    },

    loginAdmin:(req,res)=>{
        try{
            let data = req.body;
            let sql =' SELECT * FROM DANGNHAP WHERE TAIKHOAN=?';
            db.query(sql,[data.TAIKHOAN],(err,response)=>{
                let DANGNHAP = response[0];
                if(DANGNHAP){
                    const validPass = bcrypt.compareSync(data.MATKHAU, DANGNHAP.MATKHAU)
                    if(validPass){
                        if(DANGNHAP.MAQUYEN == 1 || DANGNHAP.MAQUYEN == 2){
                            const respone = {
                                message: 'Valid',
                                role: DANGNHAP.MAQUYEN
                            }
                            res.json(respone);
                        }
                        else{
                            const respone = {
                                message: 'Access Deny'
                            }
                            res.json(respone);
                            return false;
                        }
                    }
                    else{
                        const respone = {
                            message: 'Wrong Password'
                        }
                        res.json(respone);
                        return false;
                    }
                }
                else{
                    const respone = {
                        message: 'User not found',
                    }
                    res.json(respone);
                    return false;
                }
            })
        }
        catch(err){
            res.status(400).send('Connect to Server FAILED');
        }
    },
    update: (req, res) => {
        let data = {
            TAIKHOAN: req.body.TAIKHOAN,
            MATKHAU: bcrypt.hashSync(req.body.MATKHAU,10),
            MAQUYEN: req.body.MAQUYEN
        }
        let sql = 'UPDATE DANGNHAP SET ? WHERE TAIKHOAN = ?'
        db.query(sql, [data, req.params.id], (err, response) => {
            if (err) throw err
            res.json(data)
        })
    },
    store: (req, res) => {
        let data = {
            TAIKHOAN: req.body.TAIKHOAN,
            MATKHAU: req.body.MATKHAU,
            MAQUYEN: req.body.MAQUYEN
        }
        // let data = req.body;
        const TAIKHOAN = data.TAIKHOAN;
        const MATKHAU = data.MATKHAU;
        let RegExp = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;      
        
        
        if( TAIKHOAN.length < 6){
            res.json({
                message: 'TAIKHOAN must be required at least 6 characters'
            });
        }
        if(RegExp.test(TAIKHOAN)){
            res.json({
                message: 'Invalid TAIKHOAN! only accept alphabet, number and underscore'
            });
        }
        // check password
        if(MATKHAU.length < 6){
            res.json({message:'MATKHAU must be required at least 6 characters'
        });
        }
        // check done ^^
        try {
            let sql = 'INSERT INTO DANGNHAP SET ?'
            const DANGNHAP = {
                TAIKHOAN: data.TAIKHOAN,
                MATKHAU: bcrypt.hashSync(data.MATKHAU,10),
                MAQUYEN: data.MAQUYEN
            }
            db.query(sql, [DANGNHAP], (err, response) => {
                if (err) throw err
                res.json(DANGNHAP)
            })
        } catch (error) {
            res.json(error.message);
        }

    },
    delete: (req, res) => {
        let sql = 'DELETE FROM DANGNHAP WHERE TAIKHOAN = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            res.json("delete success")
        })
    }
}