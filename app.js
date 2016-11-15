/**
 * Created by Administrator on 2016/11/11.
 */
var express=require('express');
var fs=require('fs');
var multer=require('multer');
var route=require('./routes/index');
var bodyparser=require('body-parser');
var app=express();
var form=multer();
app.set('views','./views');
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:false}));
app.use('/',route);
app.listen(3016,function () {
    console.log('欢迎你，我的小可爱');
})

