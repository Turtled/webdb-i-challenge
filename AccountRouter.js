const express = require('express')
const router = express.Router();
const accountDB = require('./data/dbConfig');

router.get('/', (req, res) => {
    accountDB.select('*').from('accounts')
        .then(accounts => res.status(200).json(accounts))
        .catch(err => res.status(500).json({ error: err, message:"Something went wrong with select * accounts query" }))
});

router.get('/:id', validateAccountId, (req, res) => {
    accountDB('accounts').where({id: req.params.id})
        .then(account => {
                res.status(200).json(account)
        })
        .catch(err => res.status(500).json({ error: 'Could not find account with ID ' + req.params.id }))
});

router.delete('/:id', validateAccountId, (req, res) => {
    accountDB("accounts").where({id: req.params.id}).del()
        .then(id => {
            res.status(200).json(id)
        })
        .catch(err => res.status(500).json({ error: err }))
});

router.put('/:id', validateAccountId, (req, res) => {
    if (req.body) {
        if(!req.body.name){
            req.body.name = "";
        }
        if(!req.body.budget){
            req.body.budget = 0;
        }
            accountDB('accounts').where({id: req.params.id}).update({name: req.body.name, budget: req.body.budget})
                .then(account => {
                    res.status(200).json(account);
                })
                .catch(err => res.status(500).json({ message: err }))
    } else {
        res.status(500).json({ error: err })
    }
});

router.post('/', (req, res) => {
    if (req.body) {
        console.log("req.body ISN'T undefined: ", req.body);
        if(!req.body.name){
            req.body.name = "";
        }
        if(!req.body.budget){
            req.body.budget = 0;
        }
            accountDB('accounts').insert({name: req.body.name, budget: req.body.budget})
                .then(account => {
                    res.status(200).json(account);
                })
                .catch(err => res.status(500).json({ message: err }))
    } else {
        console.log("req.body is undefined: ", req.body);
        res.status(500).json({ message: "req.body came in undefined" })
    }
});

// custom middleware

function validateAccountId(req, res, next) {
    if (!isNaN(parseInt(req.params.id))) {
        console.log("valid ID");
        next();
    } else {
        console.log("not a valid ID");
        res.status(500).json({ message: "No id param in request" });
    }
};

module.exports = router;