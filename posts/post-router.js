const express = require('express');


const db = require('../data/dbConfig');

const router = express.Router();

// router.get('/', (req, res) => {
//   console.log('yo', req.query)
//     db.select('*')
//     .from("accounts")
//     .limit(3)
//     .orderBy("budget", "desc")

//     .then(accounts => {
//         res.status(200).json(accounts)
//     }).catch(error => {
//         console.log(error)
//         res.status(500).json({error: 'failed son'})
//     })
// });

router.get('/', (req, res) => {
  console.log('yo', req.query)
  const { name, budget } = req.query  
  getAll({name, budget})

    .then(accounts => {
        res.status(200).json(accounts)
    }).catch(error => {
        console.log(error)
        res.status(500).json({error: 'failed son'})
    })
});

// router.get("/:id", (req, res) => {
//     // a post by it's id
//     // select * from posts where id = :id
//     const id = req.params.id
//     db('accounts')
//     .where({ id })
//     .first()
//       .then(post => {
//         res.status(200).json(post);
//       })
//       .catch(error => {
//         console.log(error);
  
//         res.status(500).json({ error: "failed to get the post" });
//       });
//   });

//   function getById(id) {
//     return db("accounts")
//       .where({ id })
//       .first();
//   }

  router.get("/:id", (req, res) => {
    getById(req.params.id)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(error => {
        console.log(error);
  
        res.status(500).json({ error: "failed to get the post" });
      });
  });

  router.get("/:id", (req, res) => {
    // a post by it's id
    // select * from posts where id = :id
    const id = req.params.id
    db('accounts')
    .where({ id })
    .first()
      .then(post => {
        res.status(200).json(post);
      })
      .catch(error => {
        console.log(error);
  
        res.status(500).json({ error: "failed to get the post" });
      });
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
    return db("accounts")
      .where({ id })
      .first();
  }

  function getAll(query) {
    const boom = db("accounts")
    if(query.name) {
      boom.where('name', 'like', `%${query.name}%`)
    }
    if(query.budget) {
      boom.where('name', 'like', `%${query.budget}%`)
    }

    return boom
  }