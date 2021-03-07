module.exports = app => {
    const express = require('express');
    const router = express.Router({
        mergeParams: true
    });

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

    app.use('/wap/api/rest/:resource', async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource);
        req.Model = require(`../../models/${modelName}`)
        next()
    },router)
}