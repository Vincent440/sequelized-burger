/* eslint-disable no-undef */
const express = require("express");

const router = express.Router();

var db = require("../models");// Requiring our models

router.get("/",(req,res)=>{
    db.Burger.findAll({
        attributes: ["id", "burger_name", "devoured"],
        order: [ ['burger_name','ASC'] ],
        include: [ {model: db.User, attributes: ["user_name"] }]
    }
    ).then(burgers=>{
        res.render("index",{burgers});
    })
});

router.put("/burgers/update",(req,res)=>{
    db.Burger.update({
        devoured:true
    },{ where: { id: req.body.burgerId }
    }).then(()=>{
        db.User.create({
            user_name: req.body.user_name,
            burgerId: req.body.burgerId
        }).then(()=>{
            res.status(200).end();
        });
    });
});

router.post("/burgers/create",(req, res)=> {
    db.Burger.create({ burger_name : req.body.burger_name })
    .then(()=>{
      res.status(200).end();
    }).catch(err=>{
        if (err)throw err;
    });
});

router.put("/burgers/resetall",(req,res)=>{
    //Secret update all to uneaten button. This needs to be updated to dump all the users in the users table upon updating to not eaten.
    db.Burger.update({ devoured:false },{
        where: { devoured: true }
    }).then(()=>{
       res.status(200).end();
    });
});

module.exports = router;//Export routes for server.js to use.