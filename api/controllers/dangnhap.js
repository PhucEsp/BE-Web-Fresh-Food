'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')
const { throws } = require('assert')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM DANGNHAP'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    
    detail: (req, res) => {
        let sql = 'SELECT * FROM DANGNHAP WHERE ID = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    login:(req,res)=>{
        try{
            let data = req.body;
            let sql =' SELECT * FROM DANGNHAP WHERE ID=?';
            db.query(sql,[req.body.ID],(err,res)=>{
                let user = res[0];
                if(user){
                    const validPass = bcrypt.compareSync(data.MATKHAU, user.MATKHAU)
                    if(validPass){
                        res.json('Valid');
                        return true;
                    }
                    else{
                        res.json('Wrong Password');
                        return false;
                    }
                }
                else{
                    res.json('ID not found');
                    return false;
                }
            })
        }
        catch(err){
            res.status(400).send('Connect to Server FAILED');
        }
    },
    update: (req, res) => {
        let data = req.body;
        let productId = req.params.productId;
        let sql = 'UPDATE DANGNHAP SET ? WHERE ID = ?'
        db.query(sql, [data, id], (err, response) => {
            if (err) throw err
            res.json({message: 'Update success!'})
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO DANGNHAP SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({message: 'Insert success!'})
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM DANGNHAP WHERE ID = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            res.json({message: 'Delete success!'})
        })
    }
}