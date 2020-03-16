const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
    db.select("*")
    .from("accounts")
    .then(rows => {
        if(rows){
            res.status(200).json({data: rows})
        } else {
            res.status(404).json({errorMessage: "No data found"})
        }
    })
    .catch(err => {
        res.status(500).json({errorMessage: "Server could not return the data"})
    })
})

router.get("/:id", (req, res) => {
    db('accounts').where({id: req.params.id}).first()
    .then(account => {
        if(account){
            res.status(200).json(account)
        } else{
            res.status(404).json({errorMessage: "Account does not exist"})
        }
        })
    .catch(err => {
        res.status(500).json({errorMessage: "Could not get the account data"})
    })
})

router.post("/", (req,res) => {
    db('accounts').insert(req.body, "id")
    .then(newAccount => {
        res.status(201).json(newAccount)
    })
    .catch(err => {
        res.status(500).json({errorMessage: "Could not post the account data"})
    })
})

router.put("/:id", (req, res) => {
    db('accounts').where({id: req.params.id}).update(req.body)
    .then(account => {
        if(account){
            res.status(200).json(account)
        } else{
            res.status(404).json({errorMesage: "Account does not exist"})
        }
        
    })
    .catch(err => {
        res.status(500).json({errorMessage: "Could not updat the account info"})
    })
})

router.delete("/:id", (req, res) => {
    db('accounts').where({id: req.params.id}).del()
    .then(account => {
        if(account){
            res.status(200).json({message: "Account successfully deleted"})
        } else{
            res.status(404).json({errorMessage: "Account not found"})
        }
        
    })
    .catch(err => {
        res.status(500).json({errorMessage: "Could not delete the account"})
    })
})


module.exports = router;