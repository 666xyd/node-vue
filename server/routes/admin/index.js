module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const Category = require('../../models/category')

    //新增分类
    router.post('/categories', async (req, res) => {
        const model = await Category.create(req.body)
        res.send(model)
    })

    //获取分类列表
    router.get('/categories', async (req, res) => {
        const list = await Category.find();
        res.send(list);
    })

    //编辑分类
    router.put('/categories/:id', async (req, res) => {
        const model = await Category.findByIdAndUpdate(req.params.id, req.body);
        res.send(model);
    })

    //删除分类
    router.delete('/categories/:id', async (req, res) => {
        await Category.findByIdAndDelete(req.params.id, req.body);
        res.send({
            success: true,
        })
    })
    app.use('/admin/api', router)
}