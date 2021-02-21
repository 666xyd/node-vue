<template>
    <div>
        <!-- 侧边栏 -->
        <div class="sidebar" :style="{width: isCollapse?'54px':'230px'}">
            <!--  顶部logo  -->

            <!--  选项 -->
            <div class="side-menu" >
                <el-menu style="width: 230px;" background-color="#1E2025" text-color="#fff" :default-active="activeRouter"
                         active-text-color="#fff" :collapse="isCollapse" unique-opened :collapse-transition="false">
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

            <!-- 底部向左收起 -->
            <div class="sidebar-bottom" @click="collapse">
                <div v-if="!isCollapse">
                    <i class="el-icon-s-fold"></i>
                </div>
                <div v-else>
                    <i class="el-icon-s-unfold"></i>
                </div>
            </div>
        </div>

        <div :style="{marginLeft: isCollapse?'52px':'230px'}"></div>

        <!-- 主要内容 -->
        <div :class="isCollapse ? 'main54' : 'main'">
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
                                name: '召唤师技能',
                                url: 'heroSkill'
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
                    {
                        id: 4,
                        title: '系统管理',
                        icon: 'el-icon-setting',
                        list: [],
                        children: [
                            {
                                name: '系统分类',
                                url: 'settingClassify',
                            },
                            {
                                name: '管理员列表',
                                url: 'adminList',
                            }
                        ],
                    }
                ],
                explain_title: '',
                explain_word: '',
                activeRouter: '',
                isCollapse: false,
            }
        },
        watch: {
            "$route.name"(newValue){
                this.pageChange();
            }
        },
        created() {
            // window.console.log('route', this.$route.name);
            this.pageChange();
        },
        methods: {
            getExplain(){

            },
            pageChange() {
                //设置element-ui中的导航菜单栏选中状态
                this.activeRouter = this.$route.name;
            },
            //解决新增单据页面用户取消跳转时导航栏激活状态没有回退的bug
            //如果用pageChange，激活状态不会回退，因为activeRouter没有改变
            pageChangeR() {
                this.activeRouter = '';
                setTimeout(() => {
                    this.activeRouter = this.$route.name;
                }, 0);
            },
            collapse(){
                this.isCollapse = !this.isCollapse;
            }
        }
    }
</script>

<style scoped>
    /*除侧边栏之外的部分 滚动*/
    .main {
        padding-left: 230px;
        background: #F5F7FA;
        height: 100vh;
        overflow-y: auto;
        min-width: 1042px;
    }

    .main54{
        padding-left: 54px;
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

    .side-menu >>> .el-submenu .el-menu-item{
        background-color: black!important;
    }

    /*副标题被hover时的背景颜色*/
    .side-menu >>> .el-submenu .el-menu-item:hover{
        background: linear-gradient(to right,rgba(3,170,114,.15) 0%,rgba(5,184,124,.15) 100%);
    }

    .sidebar-bottom {
        position: absolute;
        bottom: 0;
        font-size: 14px;
        cursor: pointer;
        height: 50px;
        width: 100%;
        color: #666;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #1E2025;
        border-top: 1px solid #666;
    }

    .sidebar-bottom i{
        font-size: 22px;
        color: white;
    }

</style>
