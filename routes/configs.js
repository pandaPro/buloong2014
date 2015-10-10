var express = require('express');
var api = require('../controllers/config-api.js');
var router = express.Router();

/* GET configs listing. */
router.get('/', function(req, res) {
    // var db = req.db;
    // db.collection('configs').find().toArray(function (err, items) {
        // if (err)
            // res.send(err);
        // res.json(items);
    // });
    // var configList = new api.getconfigList();
    // console.log("configList= " + configList);
    // var list;
    // api.configlist(function(err, items){
    //     if (err)
    //         res.send(err);
    //     list = items;
    // });
    // res.render('config', { title: 'configs list', list : list});
    res.render('config', { title: 'configs list'});
});

router.get('/list', function(req, res) {
    api.list(function(err, data){
        if (err)
            res.send(err);
        res.json(data);
    });
});

router.get('/check/:name', function(req, res) {
    var name = req.params.name;
    api.findConfigByName(name, function(err, data){
        if (err)
            res.send(err);
        res.json(data);
    });
});

router.post('/add', function(req, res) {
    console.log(req.body.configObject);
    //validation data
    try {
        var config = new api.getConfigObject(req.body.configObject);
        config.validate(function(error) {
            if(error) {
                console.log(error);
                res.json({error: error});
            }
            else {
                //save data
                api.add(config, function(err, item) {
                    if (err) {
                        console.log("response error: " + err);
                        res.json({error: err});
                    }
                    else {
                        console.log("response item: " + item);
                        res.json({result: 1, message: "added", item: item});
                    }
                })
            }
        });
    }
    catch(err) { console.log("post error: "+ err); }
});


/*
 * PUT to update config.
 */
router.put('/update', function(req, res) {
    try {
        var config = new api.getConfigObject(req.body.updateConfigObject);
        if(!config._id){
            console.log("invalid id");
            res.send("invalid id");
        }
        else{
            config.validate(function(error) {
                if(error) {
                    res.json({ error: error });
                } else {
                    //save data
                    api.update(config, function(err, savedItem) {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        }
                        else {
                            console.log("saveditem="+ savedItem);
                            res.json({result: 1, message: "Updated"});
                        }
                    })
                }
            });
        }
    }
    catch(err) { 
        console.log("post error: "+ err);
        res.json({message: err});
    }
});

/*
 * DELETE to delete config.
 */
router.delete('/delete/:id', function(req, res) {

});

module.exports = router;