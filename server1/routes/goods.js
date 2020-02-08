var express = require('express')
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/good')
// 链接mongodb数据库
mongoose.connect('mongodb://127.0.0.1:27017/test')

//如何监听数据库
mongoose.connection.on("connected",function(){
    console.log("MongoDB connected success.")
});

mongoose.connection.on("connected",function(){
    console.log("MongoDB connected fail.")
});

mongoose.connection.on("connected",function(){
    console.log("MongoDB connected disconnected.")
});

router.get("/",function(req,res,next){ 
    let page = parseInt(req.param("page"));
    let pageSize =parseInt(req.param("pageSize"));
    let sort = req.param("sort");
    let skip = (page-1)*pageSize;
    let params  ={};
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    goodsModel.sort({'salePrice':sort})
    goodsModel.exec(function(err,doc){
        if(err){
            res.json({
                status:'1',
                mag:err.message
            });
        }else{
            res.json({
                status:'0',
                mag:'',
                result:{
                    count:doc.length,
                    list:doc
                }
            })
        }
    })
});

module.exports = router;