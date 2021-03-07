import Vue from 'vue'
import VueRouter from 'vue-router'
import Wap from '../main.vue';

//首页
import index from '../index/index';

//文章
import articleDetail from "../article/articleDetail";
import articleList from "../article/articleList";

//攻略
import strategyList from "../strategy/strategyList";
import strategyDetail from "../strategy/strategyDetail";

//英雄信息
import hero from '../hero/hero';
import heroDetail from "../hero/heroDetail";

//装备信息
import equip from '../equip/equip';


Vue.use(VueRouter)

const routes = [
    {
        path: '/app', component: Wap,
        children: [
            //首页
            {path: 'index', name: 'index', component: index, meta: {index: 1.0}},

            //文章
            {path: 'article/list', name: 'articleList', component: articleList, meta: {index: 40}},             //文章列表
            {path: 'article/detail/:id', name: 'articleDetail', component: articleDetail, meta: {index: 400}},         //文章详情

            //攻略
            {path: 'strategy/list', name: 'strategyList', component: strategyList, meta: {index: 50}},            //攻略列表
            {path: 'strategy/detail/:id', name: 'strategyDetail', component: strategyDetail, meta: {index: 500}},            //攻略详情

            //英雄
            {path: 'hero', name: 'hero', component: hero, meta: {index: 2.0}},
            {path: 'hero/detail/:id', name: 'heroDetail', component: heroDetail, meta: {index: 20}},    //英雄详情

            //装备
            {path: 'equip', name: 'equip', component: equip, meta: {index: 3}},
        ]
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
