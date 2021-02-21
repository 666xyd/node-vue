<template>
    <div class="hero-list initMain">
        <div class="list-content">
            <div class="list-form al-center">
                <AddButton title="新增分类" :cmb="false" @add="add"></AddButton>
                <Search title="搜索英雄名称" @search="search" v-model="searchText"></Search>
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
                    <el-table :data="heroList.slice((page - 1) * page_count, page * page_count)"  :default-sort = "{prop: 'date', order: 'descending'}">
                        <el-table-column label="英雄名称" min-width="15%">
                            <template slot-scope="scope">
                                <div class="imgAndName">
                                    <img :src="scope.row.pic[0]">
                                    <span>{{scope.row.name}}</span>
                                </div>
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
                        <el-table-column label="上架时间" min-width="17%" sortable prop="date"></el-table-column>
                        <el-table-column label="操作" min-width="25%">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" style="margin-right: 18px" @click="toEdit(scope.row)">编辑</el-button>
                                <span class="edit" @click="toDetail(scope.row)">详情</span>
                                <span class="delete" @click="deleteHero(scope.row)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <pagination :total="heroList.length" :page_count.sync="page_count" :page.sync="page"></pagination>
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
    import Pagination from "../components/Pagination";
    export default {
        name: "heroList",
        components: {
            AddButton,
            Search,
            classifyNew,
            Pagination
        },
        data(){
            return {
                heroTypeList: [{name: "全部", id: 0}],
                defaultProps: {children: 'child', label: 'name'},                        //树形选择器
                popupShow: false,                                                        //分类弹窗是否显示
                heroList: [],         //英雄列表
                id: null,
                params: {
                    category_id: 0,
                },
                page_count: this.$store.state.per_num,   //每页数据条数
                page: 1,     //页码
                searchText: '',      //搜索框内容
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
                })
            },
            //点击树形控件
            handleNodeClick(val) {
                this.searchText = '';
                this.params.category_id = val.id;
                if(val.id === 0){
                    //点击的是'全部'
                    this.getHeroList();
                }else {
                    this.$http(`rest/heroInfo/classify/${val.name}`).then((res)=>{
                        this.heroList = res.data;
                    })
                }
            },
            //搜索框搜索
            search(){
                //这里需要nexttick，不用的话点清空搜索内容时，仍然停留在搜索内容的结果
                this.$nextTick(()=>{
                    if(this.searchText){
                        //有输入内容
                        this.$http(`rest/heroInfo/name/${this.searchText}`).then((res)=>{
                            this.heroList = res.data;
                            this.getClassifyList(); //这一步的目的主要是为了让树形回到‘全部’
                        })
                    }else{
                        //内容清空
                        this.getHeroList();
                    }
                })
            },

            //编辑英雄
            toEdit(row){
                this.$router.push({name: 'heroEdit', params: {id: row._id}});
            },

            //删除英雄
            deleteHero(row){
                this.$confirm(`是否删除英雄--${row.name}?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await this.$http.delete(`rest/heroInfo/${row._id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$nextTick(() => {
                        this.$refs.elTree && this.$refs.elTree.setCurrentKey(this.params.category_id)
                    })
                    this.handleNodeClick(this.heroTypeList[this.params.category_id]);
                })
            },

            //新建分类时点击保存
            success(){
                this.getClassifyList();
            },

            //英雄详情
            toDetail(row){
                this.$router.push({name: 'heroDetail', params: {id: row._id, name: row.name}});
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

    .imgAndName{
        display: flex;
        align-items: center;
    }

    .imgAndName img{
        width: 38px;
        height: 38px;
        margin-right: 8px;
        border-radius: 4px;
    }
</style>