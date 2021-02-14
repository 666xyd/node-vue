import Vue from 'vue';
import VueRouter from 'vue-router';
import Pc from '../main.vue';

//英雄管理
import heroList from '../hero/heroList';                  //英雄列表
import heroNew from '../hero/heroNew';                    //新增英雄
import heroClassify from "../hero/heroClassify";          //分类列表
import skinList from '../hero/skinList';                  //皮肤列表
import skinNew from "../hero/skinNew";                    //新增皮肤

//装备管理
import equipmentList from "../equipment/equipmentList";            //装备列表
import equipmentNew from "../equipment/equipmentNew";              //新增装备

//攻略管理
import strategyList from "../strategy/strategyList";               //攻略列表
import strategyNew from "../strategy/strategyNew";                 //新增攻略

//文章管理
import articleList from "../article/articleList";                  //文章列表
import articleNew from "../article/articleNew";                    //新增文章

Vue.use(VueRouter)

const routes = [
    {
        path: '/pc', component: Pc,
        children: [
            //英雄管理
            {path: 'hero/list', name: 'heroList', component: heroList,},       //英雄列表
            {path: 'hero/new', name: 'heroNew', component: heroNew},           //新增英雄
            {path: 'hero/classify', name: 'heroClassify', component: heroClassify},                     //分类列表
            {path: 'skin/List', name: 'skinList', component: skinList},        //皮肤列表
            {path: 'skin/new', name: 'skinNew', component: skinNew},           //新增皮肤

            //装备管理
            {path: 'equipment/list', name: 'equipmentList', component: equipmentList},             //装备列表
            {path: 'equipment/new', name: 'equipmentNew', component: equipmentNew},                //新增装备

            //攻略管理
            {path: 'strategy/list', name: 'strategyList', component: strategyList},                //攻略列表
            {path: 'strategy/new', name: 'strategyNew', component: strategyNew},                   //新增攻略

            //文章管理
            {path: 'article/list', name: 'articleList', component: articleList},                   //文章列表
            {path: 'article/new', name: 'articleNew', component: articleNew},                      //新增文章
        ]
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
