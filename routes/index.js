/**
 * Created by Administrator on 2016/11/11.
 */
var express=require('express');
var route=express.Router();
var multer=require('multer');
var fs=require('fs');
var form=multer();
//首页
route.get('/',function (req,res) {
    res.render('index');
})
//添加留言页面
route.get('/add',function (req,res) {
    res.render('add');
})
route.post('/add',form.array(),function (req,res) {
    var content=req.body.content;
    var message={
        content:content,
        time: new Date(),
       ip:req.ip
    }
    //判断文件是否存在
    fs.exists('data',function (exists) {
        if(!exists){
            fs.mkdirSync('data');
        }
    })
    fs.appendFile('./data/message.txt',JSON.stringify(message)+',',function (err) {
        if(err){
           console.log('文件不存在') ;
        }
    })
    res.status(200).json({message:"留言发送成功"});
})
route.get('/message',function (req,res) {
    fs.exists('./data/message.txt',function (exists) {
        fs.readFile('data/message.txt',function (err,data) {
            if(!err){
                var result='['+data;
                result=result.substr(0,result.length-1);
                result=result+']';
                //{数据1},{数据2},{数据3},之前的数据
                //[{数据1}],[{数据2}],[{数据3}]变化之后的数据
                res.status(200).send(result);
            }else{
               res.status(200).send('[]');
            }
        })
    })
})
module.exports=route;