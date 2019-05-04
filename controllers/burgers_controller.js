/* eslint-disable no-undef */
const express = require("express");

const router = express.Router();

// Requiring our models
var db = require("../models");


router.get("/",(req,res)=>{

    db.Burger.findAll().then(burgerData=>{
        res.render('index',{burgerData});
    }).catch(err=>{
        if (err)throw err;
    });

});

/*
router.put("/burgers/update/:id",(req,res)=>{
    var condition = "id = " + req.params.id;
    burger.update({devoured:true},condition,result=>{
        res.status(200).end();
    });
});
*/
router.post("/burgers/create",(req, res)=> {
    
    db.Burger.create({
        burger_name : req.body.burger_name
    }).then(result=>{
      res.status(200).end();
    });
});


// Export routes for server.js to use.
module.exports = router;
