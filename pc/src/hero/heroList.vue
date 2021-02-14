<template>
    <div class="hero-list initMain">
        <div class="list-content">
            <div class="list-form al-center">
                <AddButton title="新增分类" :cmb="false" @add="add"></AddButton>
                <Search title="搜索英雄名称"></Search>
            </div>

            <!-- 英雄分类及列表 -->
            <div class="list-main flex" style="width: 100%">
                <!-- 左侧英雄分类 -->
                <div class="classify">
                    <div class="hero-type">
                        <div class="hero-type-title">英雄分类</div>
                        <div style="overflow: hidden">
                            <transition name="fade">
                                <!-- 树形控件 -->
                                <el-tree ref="elTree" node-key="id" :data="heroTypeList" :props="defaultProps"
                                         @node-click="handleNodeClick"></el-tree>
                            </transition>
                        </div>
                    </div>
                </div>

                <!-- 右侧英雄列表 -->
                <div class="list" style="width: calc(100% - 180px)">
                    <el-table :data="heroList">
                        <el-table-column label="英雄名称" min-width="15%">
                            <template slot-scope="scope">
                                {{scope.row.name}}
                            </template>
                        </el-table-column>
                        <el-table-column label="英雄定位" min-width="15%">
                            <template slot-scope="scope">
                                <span v-for="(item, index) in scope.row.classify" :key="index" style="padding: 0 4px;">{{item}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="英雄售价" min-width="28%">
                            <template slot-scope="scope">
                                <span v-if="scope.row.money">￥{{scope.row.money}}</span>
                                <span v-if="scope.row.chip">、{{scope.row.chip}}碎片</span>
                                <span v-if="scope.row.coupon">、{{scope.row.coupon}}点券</span>
                                <span v-if="scope.row.way.includes('砖石抽奖')">仅可通过消费获得</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="上架时间" min-width="17%">
                            <template slot-scope="scope">
                                {{scope.row.date}}
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" min-width="25%">
                            <el-button type="primary" size="small" style="margin-right: 18px">编辑</el-button>
                            <span class="edit">详情</span>
                            <span class="delete">删除</span>
                        </el-table-column>
                    </el-table>
                </div>
            </div>

        </div>

        <!-- 新增分类弹窗 -->
        <classify-new v-if="popupShow" v-model="popupShow" @success="success"></classify-new>
    </div>
</template>

<script>
    import AddButton from "../components/AddButton";
    import Search from "../components/Search";
    import classifyNew from "./components/classifyNew";
    export default {
        name: "heroList",
        components: {
            AddButton,
            Search,
            classifyNew,
        },
        data(){
            return {
                heroTypeList: [{name: "全部", id: 0}],
                defaultProps: {children: 'child', label: 'name'},                        //树形选择器
                popupShow: false,                                                        //分类弹窗是否显示
                heroList: [],         //英雄列表
                id: null,
                params: {
                    page_count: this.$store.state.per_num,   //每页数据条数
                    page: 1,     //页码
                    category_id: 0,
                },
            }
        },
        created() {
            this.getClassifyList();
            this.getHeroList();
        },
        methods: {
            //新增分类
            add(){
                this.popupShow = true;
            },
            //获取分类列表
            getClassifyList(){
                this.$http.get('rest/heroCategories').then((res)=>{
                    this.heroTypeList = [{name: "全部", id: 0}];
                    for(let i = 0 ; i < res.data.length; i++){
                        this.heroTypeList.push({name: res.data[i].classify, id: i + 1});
                    }
                    this.$nextTick(() => {
                        this.$refs.elTree && this.$refs.elTree.setCurrentKey(this.params.category_id)
                    })
                })
            },
            //获取英雄列表
            getHeroList(){
                this.$http.get('rest/heroInfo').then((res)=>{
                    this.heroList = res.data;
                    window.console.log(this.heroList);
                })
            },
            //点击树形控件
            handleNodeClick(val) {
                if(val.id === 0){
                    //点击的是'全部'
                    this.getHeroList();
                }else {
                    this.$http(`rest/heroInfo/${val.name}`).then((res)=>{
                        this.heroList = res.data;
                    })
                }
            },
            //新建分类时点击保存
            success(){
                this.getClassifyList();
            }
        },
    }
</script>

<style scoped>

    .list-form{
        margin-bottom: 20px;
    }

    /*商品分类*/
    .classify{
        min-width: 156px;
        width: 156px;
        overflow: hidden;
        margin-right: 16px;
        margin-bottom: 18px;
    }

    .hero-type {
        width: 156px;
        height: 600px;
        overflow-x: hidden;
        overflow-y: auto;
        /*隐藏滚动条*/
        margin-right: -40px;
        padding-bottom: 24px;
        box-sizing: border-box;
        background: #F5F7FA;
        border-radius: 4px 4px 0 0;
    }

    /*隐藏时的样式*/
    .fade-enter, .fade-leave-to {
        transform: translate3d(0, -2rem, 0);
    }

    .hero-type-title {
        width: 100%;
        color: #333;
        font-size: 14px;
        font-weight: bold;
        background: #F5F7FA;
        padding: 17px 16px;
        position: sticky;
        top: 0;
        z-index: 10;
    }

    /*树形控件*/
    .hero-list >>> .el-tree {
        background: #F5F7FA;
    }

    .hero-list >>> .el-tree-node {
        white-space: normal;
    }

    .hero-list >>> .el-tree-node__content {
        height: auto;
        padding: 10px 8px;
    }

    .hero-list >>> .el-tree-node__content:hover {
        background: #FFF;
        color: #00C191;
        font-weight: bold;
    }

    .hero-list >>> .el-tree .is-current {
        color: #00C191;
        font-weight: bold;
    }

    .hero-list >>> .el-tree-node__expand-icon {
        padding: 0 6px 0 3px;
    }

    .edit ,.delete{
        color: #00C191;
        margin-right: 18px;
        cursor: pointer;
    }
</style>