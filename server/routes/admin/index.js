module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })


    //新增
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
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



    app.use('/admin/api/rest/:resource', async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource);
        req.Model = require(`../../models/${modelName}`)
        next()
    },router)
}