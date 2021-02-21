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

    //根据英雄id返回信息
    router.get('/heroId/:id', async (req, res) =>{
        const item = await req.Model.findById(req.params.id);
        res.send(item);
    })

    //根据皮肤id返回信息
    router.get('/skinId/:id', async (req, res) =>{
        const item = await req.Model.findById(req.params.id);
        res.send(item);
    })

    //在皮肤列表根据英雄姓名或皮肤姓名返回信息
    router.get('/skinName/:name', async (req, res) => {
        const nameList = await req.Model.find({"name": {$regex: req.params.name}});
        const skinList = await req.Model.find({"skin": {$regex: req.params.name}});
        const list = nameList.concat(skinList);
        res.send(list);
    })

    //皮肤列表  根据英雄姓名返回该英雄所有的皮肤
    router.get('/findByHeroName/:name', async  (req, res) =>{
        const list = await req.Model.find({"name": req.params.name});
        res.send(list);
    })

    //装备列表  根据装备分类返回不同的列表
    router.get('/equipmentClassify/:classify', async (req, res) => {
        const list = await req.Model.find({"classify": {$regex: req.params.classify}});
        res.send(list);
    })

    //装备列表  根据装备id返回装备信息
    router.get('/equipmentId/:id', async (req, res) =>{
        const item = await req.Model.findById(req.params.id);
        res.send(item);
    })

    //根据装备名称返回列表
    router.get('/equipmentName/:name', async (req, res) => {
        const list = await req.Model.find({"name": {$regex: req.params.name}});
        res.send(list);
    })

    //根据召唤师技能名称返回列表
    router.get('/heroSkill/:name', async (req, res) => {
        const list =await req.Model.find({"name": {$regex : req.params.name}});
        res.send(list);
    })

    //根据攻略id返回该攻略信息
    router.get('/strategyId/:id', async (req, res) => {
        const item = await req.Model.findById(req.params.id);
        res.send(item);
    })

    //根据攻略题目返回攻略信息
    router.get('/strategyTitle/:title', async (req, res) => {
        const list =await req.Model.find({"title": {$regex : req.params.title}});
        res.send(list);
    })

    //根据文章id返回该文章信息
    router.get('/articleId/:id', async (req, res) => {
        const item = await req.Model.findById(req.params.id);
        res.send(item);
    })

    //根据文章分类返回文章列表
    router.get('/articleClassify/:classify', async (req, res) => {
        const list = await req.Model.find({"name": {$regex: req.params.classify}});
        res.send(list);
    })

    //根据文章题目返回文章信息
    router.get('/articleTitle/:title', async (req, res) => {
        const list = await req.Model.find({"title": {$regex : req.params.title}});
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

    //图片上传
    const multer = require('multer');
    const upload = multer({dest: __dirname + '/../../uploads'})
    app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
        let file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`;
        res.send(file);
    })
}