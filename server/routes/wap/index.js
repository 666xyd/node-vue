module.exports = app => {
    const express = require('express');
    const jwt = require('jsonwebtoken');
    const assert = require('http-assert');
    const md5 = require('blueimp-md5');
    const moment = require('moment');
    const Base64 = require('js-base64').Base64;
    const request = require('request');
    const router = express.Router({
        mergeParams: true
    });

    //生成随机验证码
    function randomCode(length){
        let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let result = "";
        for(let i = 0; i < length; i++){
            let index = Math.ceil(Math.random()*9);
            result += chars[index];
        }
        return result;
    };

    //发送验证码
    function sendCode(phone, code, callback){
        const ACCOUNT_SID = '8a216da878005a8001782603906f0ecd';
        const AUTH_TOKEN = 'c92652c52e9e45a4baf3a12781f72e75';
        const Rest_URL = 'https://app.cloopen.com:8883';
        const AppID = '8a216da878005a8001782603916f0ed4';

        //准备请求url
        let sigParameter = '';
        let time = moment().format('YYYYMMDDHHmmss');
        sigParameter = md5(ACCOUNT_SID + AUTH_TOKEN + time);
        let url = Rest_URL+'/2013-12-26/Accounts/'+ACCOUNT_SID+'/SMS/TemplateSMS?sig='+sigParameter;

        //准备请求体
        let body = {
            to : phone,
            appId: AppID,
            templateId: '1',
            "datas": [code, "1"],
        }

        //准备请求头
        let authorization = ACCOUNT_SID + ':' + time;
        authorization = Base64.encode(authorization);
        let headers = {
            'Accept' :'application/json',
            'Content-Type' :'application/json;charset=utf-8',
            'Content-Length': JSON.stringify(body).length+'',
            'Authorization' : authorization
        }

        //发送请求
        request({
            method : 'POST',
            url : url,
            headers : headers,
            body : body,
            json : true
        }, function (error, response, body) {
            callback(body.statusCode==='000000');
        })
    };

    //新增
    router.post('/', async (req, res) => {
        let user_info = require('../../models/AppUserInfo')
        if(req.Model === user_info){
            //判断是否是新增用户
            let item = await user_info.find({"phone": req.body.phone});
            if(item.length !== 0){
                //已经有了该用户的信息，就不再向数据库发送数据
                res.send('已有该用户信息');
            }else{
                const model = await req.Model.create(req.body)
                res.send(model);
            }
        }else{
            //其他类型的新增
            const model = await req.Model.create(req.body)
            res.send(model)
        }

    })

    //获取列表
    router.get('/', async (req, res) => {
        const list = await req.Model.find();
        res.send(list);
    })

    //根据英雄分类返回不同的列表
    router.get('/classify/:classify', async (req, res) => {
        const list = await req.Model.find({"classify": {$regex: req.params.classify}});
        res.send(list);
    })

    //根据英雄姓名返回信息
    router.get('/name/:name', async (req, res) => {
        const list = await req.Model.find({"name": {$regex: req.params.name}});
        res.send(list);
    })

    //根据英雄id返回信息
    router.get('/heroId/:id', async (req, res) =>{
        const item = await req.Model.findById(req.params.id);
        res.send(item);
    })

    //根据英雄姓名返回该英雄所有的皮肤
    router.get('/findByHeroName/:name', async  (req, res) =>{
        const list = await req.Model.find({"name": req.params.name});
        res.send(list);
    })

    //根据文章分类返回文章列表
    router.get('/articleClassify/:classify', async (req, res) => {
        const list = await req.Model.find({"name": {$regex: req.params.classify}});
        res.send(list);
    })

    //根据文章id返回该文章信息
    router.get('/articleId/:id', async (req, res) => {
        const item = await req.Model.findById(req.params.id);
        res.send(item);
    })

    //根据攻略id返回该攻略信息
    router.get('/strategyId/:id', async (req, res) => {
        const item = await req.Model.findById(req.params.id);
        res.send(item);
    })

    //根据用户手机号码返回该用户信息
    router.get('/userPhone/:phone', async (req, res) => {
        const item = await req.Model.find({"phone": req.params.phone});
        res.send(item);
    })

    //根据文章id返回该文章的所有评论
    router.get('/evaluateArticleId/:id', async (req, res) => {
        const item = await req.Model.find({"id": req.params.id}).sort({"date": -1});
        res.send(item);
    })

    //用户新增收藏
    router.post('/likeUpdate/:phone', async (req, res) => {
        const item = await req.Model.update({phone: req.params.phone},{$addToSet:{like: req.body}});
        res.send(item);
    })

    //用户删除收藏
    router.post('/likeDelete/:phone', async (req, res) => {
        const item = await req.Model.update({phone: req.params.phone},{$pull: {like: req.body}});
        res.send(item);
    })

    //用户新增点赞
    router.post('/agreeUpdate/:phone', async (req, res) => {
        const item = await req.Model.update({phone: req.params.phone},{$addToSet:{agree: req.body}});
        res.send(item);
    })

    //用户删除点赞
    router.post('/agreeDelete/:phone', async (req, res) => {
        const item = await req.Model.update({phone: req.params.phone},{$pull: {agree: req.body}});
        res.send(item);
    })

    //新增用户浏览记录
    router.post('/recordUpdate/:phone', async (req, res) => {
        const item = await req.Model.update({phone: req.params.phone},{$addToSet:{record: req.body}});
        res.send(item);
    })

    //用户新增不喜欢
    router.post('/dislikeUpdate/:phone', async (req, res) => {
        const item = await req.Model.update({phone: req.params.phone},{$addToSet:{dislike: req.body}});
        res.send(item);
    })

    //用户删除不喜欢
    router.post('/dislikeDelete/:phone', async (req, res) => {
        const item = await req.Model.update({phone: req.params.phone},{$pull: {dislike: req.body}});
        res.send(item);
    })

    //编辑
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send(model);
    })

    //删除
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body);
        res.send({
            success: true,
        })
    })

    //图片上传
    const multer = require('multer');
    const upload = multer({dest: __dirname + '/../../uploads'})
    app.post('/wap/api/upload', upload.single('file'), async (req, res) => {
        let file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`;
        res.send(file);
    })

    // 获取验证码
    app.get('/wap/api/loginCode',async (req, res)=>{
        let code = randomCode(6);
        // sendCode("13433724756", code, function (success){
        //     if(success){
        //         res.send({message: '短信验证码发送成功！', code: code});
        //     }else{
        //         res.send({message: '短信验证码发送失败！'});
        //     }
        // })
        res.send({message: '短信验证码发送成功！', code: code});
    })

    app.use('/wap/api/rest/:resource', async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource);
        req.Model = require(`../../models/${modelName}`)
        next()
    },router)
}