var express = require('express');
var api = require('../controllers/product-api.js');
var configAPI = require('../controllers/config-api.js');
var router = express.Router();

/* GET products listing. */
router.get('/', function(req, res) {
    // var db = req.db;
    // db.collection('products').find().toArray(function (err, items) {
        // if (err)
            // res.send(err);
        // res.json(items);
    // });
    // var productList = new api.getproductList();
    // console.log("productList= " + productList);
    // var list;
    // api.productlist(function(err, items){
    //     if (err)
    //         res.send(err);
    //     list = items;
    // });
    // res.render('product', { title: 'products list', list : list});
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
    var newCode = req.params.code;
    var queryString = {'code': newCode};
    api.checkCode(queryString, function(err, data){
        if (err)
            res.send(err);
        else{
            // console.log("data :"+ data);
            var result = (data) ? true : false;
            console.log("checkCode result=" + result);
            res.json({ "result" : result, "item": data});
        }
    });
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
    console.log(req.body.productObject);
    //validation data
    try {
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
router.put('/update/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    try {
        var product = new api.getproductObject(req.body.updateproductObject);
        product.validate(function(err) {
            if(err) {
                res.json({ err: err });
            } else {
                //save data
                api.update(product, function(err, savedItem) {
                    if (err) {
                        console.log(err);
                        res.send(err);
                    }
                    else {
                        console.log("saveditem="+ savedItem);
                        res.json({success: "saved", list: savedItem});
                    }
                })
            }
        });
    }
    catch(err) { console.log("post err: "+ err); }
});

/*
 * DELETE to delete product.
 */
router.delete('/delete/:id', function(req, res) {

});

module.exports = router;