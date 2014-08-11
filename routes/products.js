var express = require('express');
var api = require('../controllers/product-api.js');
var configAPI = require('../controllers/config-api.js');
var router = express.Router();

/* GET products listing. */
router.get('/', function(req, res) {
    res.render('product', { title: 'products list'});
});

router.get('/format', function(req, res){
    var name = req.params.name;
    configAPI.findConfigByName("buloongFormat", function(err, data){
        if (err)
            res.send(err);
        console.log("get format data: ");
        console.log(data);
        res.json(data);
    });
});

router.put('/types', function(req, res){
    var selectedFormat = req.params.selectedFormat;
    var selectedLength = req.params.selectedLength;
    var queryString = { 'format': + selectedFormat, 
                        ' length': + selectedLength};
    api.productlist(queryString, function(err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });
});

router.put('/length', function(req, res){
    var selectedFormat = req.params.selectedFormat;
    var queryString = {'format': + selectedFormat };
    api.productlist(queryString, function(err, data){
        if (err)
            res.send(err);
        res.json(data);
    });
});

router.put('/checkCode/:code', function(req, res){
    try {
        var newCode = req.params.code;
        var queryString = {'code': newCode};
        api.checkCode(queryString, function(err, data){
            if (err)
                res.send(err);
            else{
                // console.log("data :"+ data);
                var result = (data) ? true : false;
                // console.log("checkCode result=" + result);
                res.json({ "result" : result, "item": data});
            }
        });
    }
    catch(err) {
        console.log("check code err: "+ err);
        res.send(err);
    }
});

router.get('/all', function(req, res) {
    api.list({}, function(err, data){
        if (err)
            res.send(err);
        res.json(data);
    });
});

/// get all active products
router.get('/activeProducts', function(req, res) {
    api.list({"status": "true"}, function(err, data){
        if (err)
            res.send(err);
        res.json({items: data});
    });
});

router.post('/add', function(req, res) {
    try {
        console.log(req.body.productObject);
        var product = new api.getProductObject(req.body.productObject);
        product.validate(function(err) {
            if(err) {
                console.log(err);
                res.send(err);
            }
            else {
                //save data
                api.add(product, function(err, item) {
                    if (err) {
                        console.log("response err: " + err);
                        res.send(err);
                    }
                    else {
                        console.log("response items: " + item);
                        res.json({message: "added", item: item});
                    }
                })
            }
        });
    }
    catch(err) { console.log("post err: "+ err); }
});
/*
 * PUT to update product.
 */
router.put('/update', function(req, res) {
    try {
        console.log(req.body.productObject);
        var product = new api.getProductObject(req.body.productObject);
        product.validate(function(err) {
            if(err) {
                res.json({ err: err });
            } else {
                api.update(product, function(err, saved) {
                    if (err) {
                        console.log(err);
                        res.send(err);
                    }
                    else {
                        console.log("saveditem="+ saved);
                        res.json({message: "updated", result: saved});
                    }
                })
            }
        });
    }
    catch(err) {
        console.log("update err: "+ err);
        res.send(err);
    }
});

/*
 * DELETE to delete product.
 */
router.delete('/delete/:id', function(req, res) {

});

module.exports = router;