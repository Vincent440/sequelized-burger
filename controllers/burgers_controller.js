/* eslint-disable no-undef */
const express = require("express");

const router = express.Router();

// Requiring our models
var db = require("../models");


router.get("/",(req,res)=>{
    db.Burger.findAll().then(burgers=>{
        res.render('index',{burgers});
    })
});

router.put("/burgers/update",(req,res)=>{
    db.Burger.update({devoured:true},{//updating the boolean in the database , however doesn't reload the page as expected.
        where: {
            id: req.body.id
        }
    }).then(()=>{
       res.status(200).end();

    });
});

router.post("/burgers/create",(req, res)=> {
    
    db.Burger.create({
        burger_name : req.body.burger_name
    }).then(()=>{
      res.status(200).end();
    }).catch(err=>{
        if (err)throw err;
    });
});
//Secret update all to uneaten button. 
router.put("/burgers/resetall",(req,res)=>{
    db.Burger.update({devoured:false},{//updating the boolean in the database , however doesn't reload the page as expected.
        where: {
            devoured: true
        }
    }).then(()=>{
       res.status(200).end();

    });
});

// Export routes for server.js to use.
module.exports = router;
