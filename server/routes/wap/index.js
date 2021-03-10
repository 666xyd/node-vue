module.exports = app => {
    const express = require('express');
    const jwt = require('jsonwebtoken');
    const assert = require('http-assert');
    const router = express.Router({
        mergeParams: true
    });

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

    app.use('/wap/api/rest/:resource', async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource);
        req.Model = require(`../../models/${modelName}`)
        next()
    },router)
}