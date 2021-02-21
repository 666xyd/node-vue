import Vue from 'vue';
import VueRouter from 'vue-router';
import Pc from '../main.vue';

//英雄管理
import heroList from '../hero/heroList';                  //英雄列表
import heroNew from '../hero/heroNew';                    //新增英雄
import heroDetail from "../hero/heroDetail";              //英雄详情
import heroSkill from "../hero/heroSkill";                //召唤师技能
import heroClassify from "../hero/heroClassify";          //分类列表
import skinList from '../hero/skinList';                  //皮肤列表
import skinNew from "../hero/skinNew";                    //新增皮肤
import skinDetail from "../hero/skinDetail";              //皮肤详情

//装备管理
import equipmentList from "../equipment/equipmentList";            //装备列表
import equipmentNew from "../equipment/equipmentNew";              //新增装备

//攻略管理
import strategyList from "../strategy/strategyList";               //攻略列表
import strategyNew from "../strategy/strategyNew";                 //新增攻略
import strategyEdit from "../strategy/strategyNew";                //编辑攻略
import strategyDetail from "@/strategy/strategyDetail";            //攻略详情

//文章管理
import articleList from "../article/articleList";                  //文章列表
import articleNew from "../article/articleNew";                    //新增文章
import articleEdit from "../article/articleNew";                   //编辑文章
import articleDetail from "../article/articleDetail";              //文章详情

//系统参数
import settingClassify from "../setting/settingClassify";                          //系统分类
// import settingHeroGet from "../setting/components/settingHeroGet";                 //英雄获取方式
// import settingSkinGet from "../setting/components/settingSkinGet";                 //皮肤获取方式
// import settingSkinCharacter from "../setting/components/settingSkinCharacter";     //皮肤性质
// import settingEquipment from "../setting/components/settingEquipment";             //装备分类

Vue.use(VueRouter)

const routes = [
    {
        path: '/pc', component: Pc,
        children: [
            //英雄管理
            {path: 'hero/list', name: 'heroList', component: heroList,},       //英雄列表
            {path: 'hero/new', name: 'heroNew', component: heroNew},           //新增英雄
            {path: 'hero/edit/:id', name: 'heroEdit', component: heroNew},                  //编辑英雄
            {path: 'hero/detail/:name/:id', name: 'heroDetail', component: heroDetail},           //英雄详情
            {path: 'hero/skill', name: 'heroSkill', component: heroSkill},                  //召唤师技能
            {path: 'hero/classify', name: 'heroClassify', component: heroClassify},                     //分类列表
            {path: 'skin/list', name: 'skinList', component: skinList},        //皮肤列表
            {path: 'skin/new', name: 'skinNew', component: skinNew},           //新增皮肤
            {path: 'skin/edit/:id', name: 'skinEdit', component: skinNew},         //编辑皮肤
            {path: 'skin/detail/:id', name: 'skinDetail', component: skinDetail},  //皮肤详情


            //装备管理
            {path: 'equipment/list', name: 'equipmentList', component: equipmentList},             //装备列表
            {path: 'equipment/new', name: 'equipmentNew', component: equipmentNew},                //新增装备
            {path: 'equipment/edit/:id', name: 'equipmentEdit', component: equipmentNew},              //编辑装备

            //攻略管理
            {path: 'strategy/list', name: 'strategyList', component: strategyList},                //攻略列表
            {path: 'strategy/new', name: 'strategyNew', component: strategyNew},                   //新增攻略
            {path: 'strategy/edit/:id', name: 'strategyEdit', component: strategyEdit},            //编辑攻略
            {path: 'strategy/detail/:id', name: 'strategyDetail', component: strategyDetail},      //攻略详情

            //文章管理
            {path: 'article/list', name: 'articleList', component: articleList},                   //文章列表
            {path: 'article/new', name: 'articleNew', component: articleNew},                      //新增文章
            {path: 'article/edit/:id', name: 'articleEdit', component: articleEdit},               //编辑文章
            {path: 'article/detail/:id', name: 'articleDetail', component: articleDetail},         //文章详情

            //系统参数
            {
                path: 'setting/classify', name: 'settingClassify', component: settingClassify,     //系统分类
                // children:[
                //     {path: 'hero/get', name: 'settingHeroGet', component: settingHeroGet},
                //     {path: 'skin/get', name: 'settingSkinGet', component: settingSkinGet},
                //     {path: 'skin/character', name: 'settingSkinCharacter', component: settingSkinCharacter},
                //     {path: 'equipment/classify', name: 'settingEquipment', component: settingEquipment},
                // ],
            },
        ]
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
