var express = require('express');
var api = require('../controllers/product-api.js');
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

router.get('/list', function(req, res) {
    api.productlist("", function(err, data){
        if (err)
            res.send(err);
        res.json(data);
    });
});

router.post('/add', function(req, res) {
    console.log(req.body.productObject);
    //validation data
    try {
        var product = new api.getproductObject(req.body.productObject);
        product.validate(function(error) {
            if(error) {
                console.log(error);
                res.send(error);
            }
            else {
                //save data
                api.add(product, function(err, items) {
                    if (err) {
                        console.log("response error: " + err);
                        res.send(err);
                    }
                    else {
                        console.log("response items: " + items);
                        res.json(items);
                    }
                })
            }
        });
    }
    catch(err) { console.log("post error: "+ err); }
});


/*
 * PUT to update product.
 */
router.put('/update/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    try {
        var product = new api.getproductObject(req.body.updateproductObject);
        product.validate(function(error) {
            if(error) {
                res.json({ error: error });
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
    catch(err) { console.log("post error: "+ err); }
});

/*
 * DELETE to delete product.
 */
router.delete('/delete/:id', function(req, res) {

});

module.exports = router;