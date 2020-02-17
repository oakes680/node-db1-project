const express = require('express');


const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    db.select('*').from('posts')
    .from("accounts")
    .limit(3)
    .orderBy("budget", "desc")
    .then(accounts => {
        res.status(200).json(accounts)
    }).catch(error => {
        console.log(error)
        res.status(500).json({error: 'failed son'})
    })
    
});


router.post('/', (req, res) => {
    const accountInfo = req.body
    db('accounts').insert(accountInfo, "id")
    .then(ids => {
        res.status(201).json(ids)
    }).catch(error => {
        console.log(error)
        res.status(500).json({error: 'failed son'})
    })
});


router.delete('/:id', (req, res) => {
    db('accounts')
    .where({id: req.params.id})
    .delete()
    .then(count => {
        res.status(200).json(count)
    }).catch(error => {
        console.log(error)
        res.status(500).json({error: 'failed to update son'})
    })
});

router.put('/:id', (req, res) => {
    const id = req.params.id
    db('accounts')
    .where( {id})
    .update(req.body)
    .then(count => {
        res.status(201).json(count)
    }).catch(error => {
        console.log(error)
        res.status(500).json({error: 'failed to update son'})
    })
});


module.exports = router;


function getById(id) {
    return db("posts")
      .where({ id })
      .first();
  }