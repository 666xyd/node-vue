<template>
    <div>
        <!-- 侧边栏 -->
        <div class="sidebar">
            <!--  顶部logo  -->

            <!--  选项 -->
            <div class="side-menu">
                <el-menu style="width: 230px;" background-color="#1E2025" text-color="#fff" default-active="1"
                         active-text-color="#fff">
                    <!-- 英雄管理 -->
                    <el-submenu v-for="(item,index) in all_menu_list" :key="index" :index="item.id + ''">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{item.title}}</span>
                        </template>
                        <router-link :to="{name:itemChild.url}" v-for="(itemChild,indexChild) in item.children" :key="indexChild">
                            <el-menu-item :index="itemChild.url" background-color="#383C46">
                                {{itemChild.name}}
                            </el-menu-item>
                        </router-link>
                    </el-submenu>
                </el-menu>
            </div>
        </div>

        <!-- 主要内容 -->
        <div class="main">
            <!-- 头部 -->
            <Header></Header>
            <path-header></path-header>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import './pc_public.css';
    import Header from './components/Header';
    import pathHeader from "./components/pathHeader";
    export default {
        name: 'app',
        components: {
            Header,
            pathHeader,
        },
        data(){
            return {
                all_menu_list: [
                    {
                        id: 0,
                        title: '英雄管理',
                        icon: 'el-icon-user',
                        list: ['英雄列表', '新增英雄', '英雄皮肤', '新增皮肤'],
                        children: [
                            {
                                name: '英雄列表',
                                url: 'heroList',
                            },
                            {
                                name: '新增英雄',
                                url: 'heroNew',
                            },
                            {
                                name: '分类列表',
                                url: 'heroClassify',
                            },
                            {
                                name: '皮肤列表',
                                url: 'skinList',
                            },
                            {
                                name: '新增皮肤',
                                url: 'skinNew',
                            },
                        ],
                    },
                    {
                        id: 1,
                        title: '装备管理',
                        icon: 'el-icon-suitcase',
                        list: ['装备列表', '新增装备'],
                        children: [
                            {
                                name: '装备列表',
                                url: 'equipmentList',
                            },
                            {
                                name: '新增装备',
                                url: 'equipmentNew',
                            }
                        ],
                    },
                    {
                        id: 2,
                        title: '攻略管理',
                        icon: 'el-icon-collection',
                        list: ['攻略列表', '新增攻略'],
                        children: [
                            {
                                name: '攻略列表',
                                url: 'strategyList',
                            },
                            {
                                name: '新增攻略',
                                url: 'strategyNew',
                            }
                        ],
                    },
                    {
                        id: 3,
                        title: '文章管理',
                        icon: 'el-icon-tickets',
                        list: ['文章列表', '新增文章'],
                        children: [
                            {
                                name: '文章列表',
                                url: 'articleList',
                            },
                            {
                                name: '新增文章',
                                url: 'articleNew',
                            }
                        ],
                    },
                ],
                explain_title: '',
                explain_word: '',
            }
        },
        watch: {
            "$route.name"(newValue){

            }
        },
        created() {
            // window.console.log('route', this.$route.name);
        },
        methods: {
            getExplain(){

            }
        }
    }
</script>

<style scoped>
    /*除侧边栏之外的部分 滚动*/
    .main {
        margin-left: 220px;
        width: calc(100% - 220px);
        background: #F5F7FA;
        height: 100vh;
        overflow-y: auto;
        min-width: 1042px;
    }

    /*侧边栏start*/
    .sidebar {
        overflow: hidden;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        background: #1E2025;
        z-index: 103;
        box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
    }

    .side-menu{
        overflow-y: scroll;
        overflow-x: hidden;
        /*隐藏滚动条*/
        margin-right: -30px;
        height: calc(100vh - 130px);
    }

    .side-menu >>> .el-submenu__title{
        padding-left: 18px!important;
    }

    .side-menu >>> .el-submenu__title i{
        color: white;
        margin-right: 8px;
    }

    .side-menu >>> .el-submenu__title:hover {
        opacity: 1 !important;
        background-color: #383c46 !important;
    }

    /*副标题被hover时的背景颜色*/
    .side-menu >>> .el-submenu .el-menu-item:hover{
        background: linear-gradient(to right,rgba(3,170,114,.15) 0%,rgba(5,184,124,.15) 100%);
    }

</style>
