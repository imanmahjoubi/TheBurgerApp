var express = require('express');
var burger = require('../models/burger.js');
var router = express.Router();

//Create
router.post('/api/burgers', function(req, res) {
    console.log(req.body.burger_name, req.body.devoured);
    burger.create(
        //create: function(colsArray, valsArray, cb)
        ['burger_name', 'devoured', 'image_url'],
        [req.body.burger_name, req.body.devoured, req.body.image_url],
        function(data) {
            res.json({id: data.insertId});
        }
    );
});

//Read
router.get('/', function(req, res) {
    console.log('route hit');
    burger.all(function(data) {
        var handlebarsObj = {
            burgers: data 
        };
        console.log(handlebarsObj);
        res.render('index', handlebarsObj);
    });
});

//Update
router.put('/api/burgers/:id', function(req, res) {
    var condition = "id=" + req.params.id;
    // update: function(colValObj, condition, cb)
    burger.update(
        {devoured: req.body.devoured},
        condition,
        function(data) {
            if (data.affectedRows === 0) {
                return res.status(404).end();
            } else {
                return res.status(200).end();
            }
        }
    );
});

//Delete
router.delete('/api/burgers/:id', function(req, res) {
    var condition = "id=" + req.params.id;
    //delete: function(condition, cb)
    burger.delete(condition, function(data) {
        if (data.affectedRows === 0) {
            return res.status(404).end();
        } else {
            return res.status(200).end();
        }
    });
});

module.exports = router;