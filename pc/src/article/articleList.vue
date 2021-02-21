<template>
    <div class="article-list initMain">
        <div class="list-content">
            <div class="list-form al-center">
                <AddButton title="新增文章" :cmb="false" @add="add"></AddButton>
                <Search title="搜索文章题目" v-model="searchText" @search="search"></Search>
            </div>

            <!-- 文章分类及列表 -->
            <div class="list-main flex" style="width: 100%">
                <!-- 左侧文章分类 -->
                <div class="classify">
                    <div class="article-type">
                        <div class="article-type-title">文章分类</div>
                        <div style="overflow: hidden">
                            <transition name="fade">
                                <!-- 树形控件 -->
                                <el-tree ref="elTree" node-key="id" :data="classifyList" :props="defaultProps"
                                         @node-click="handleNodeClick"></el-tree>
                            </transition>
                        </div>
                    </div>
                </div>

                <!-- 右侧文章列表 -->
                <div class="list" style="width: calc(100% - 180px)">
                    <el-table :data="articleList" :default-sort = "{prop: 'date', order: 'descending'}">
                        <el-table-column label="文章标题">
                            <template slot-scope="scope">
                                {{scope.row.title}}
                            </template>
                        </el-table-column>

                        <el-table-column label="创作日期" prop="date" sortable></el-table-column>

                        <el-table-column label="文章类型">
                            <template slot-scope="scope">
                                <span v-for="(item, index) in scope.row.name" :key="index" style="padding: 0 4px;">{{item}}</span>
                            </template>
                        </el-table-column>

                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" style="margin-right: 18px" @click="toEdit(scope.row)">编辑</el-button>
                                <span class="edit" @click="toDetail(scope.row)">详情</span>
                                <span class="delete" @click="toDelete(scope.row)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <pagination :total="articleList.length" :page_count.sync="page_count" :page.sync="page"></pagination>
                </div>
           </div>
        </div>
    </div>
</template>

<script>
    import AddButton from "@/components/AddButton";
    import Search from "@/components/Search";
    import Pagination from "@/components/Pagination";
    export default {
        name: "articleList",
        data(){
            return{
                classifyList: [{name: "全部", id: 0}],
                defaultProps: {children: 'child', label: 'name'},
                articleList: [],
                id: null,
                params: {
                    category_id: 0,
                },
                page_count: this.$store.state.per_num,   //每页数据条数
                page: 1,     //页码
                searchText: '',
            }
        },
        components: {
            AddButton,
            Pagination,
            Search
        },
        created() {
            this.getClassifyList();
            this.getArticleList();

        },
        methods: {
            //获取分类列表
            getClassifyList(){
                this.$http.get('rest/articleClassify').then((res)=>{
                    this.classifyList = [{name: "全部", id: 0}];
                    for(let i = 0; i < res.data.length; i++){
                        this.classifyList.push({name: res.data[i].name, id: i + 1});
                    }
                    this.$nextTick(() => {
                        this.$refs.elTree && this.$refs.elTree.setCurrentKey(this.params.category_id)
                    })
                })
            },

            //获取文章列表
            getArticleList(){
                this.$http.get('rest/articleInfo').then((res)=>{
                    this.articleList = res.data;
                })
            },

            search(){
                //这里需要nexttick，不用的话点清空搜索内容时，仍然停留在搜索内容的结果
                this.$nextTick(()=>{
                    if(this.searchText){
                        this.$http.get(`rest/articleInfo/articleTitle/${this.searchText}`).then((res)=>{
                            this.articleList = res.data;
                            this.params.category_id = 0;
                            this.getClassifyList()
                        })
                    }else{
                        //内容清空
                        this.getArticleList();
                    }
                })
            },

            //新增文章
            add(){
                this.$router.push({name: 'articleNew'});
            },

            handleNodeClick(val){
                this.searchText = '';
                this.params.category_id = val.id;
                if(val.id === 0){
                    //点击的是'全部'
                    this.getArticleList();
                }else {
                    this.$http(`rest/articleInfo/articleClassify/${val.name}`).then((res)=>{
                        this.articleList = res.data;
                    })
                }
            },

            //编辑
            toEdit(row){
                this.$router.push({name: 'articleEdit', params: {id: row._id}});
            },

            //详情
            toDetail(row){
                this.$router.push({name: 'articleDetail', params: {id: row._id}});
            },

            //删除
            async toDelete(row){
                let res = await this.$http.get(`rest/articleInfo/articleId/${row._id}`);
                this.$confirm(`是否删除文章--《${res.data.title}》?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( async () => {
                    await this.$http.delete(`rest/articleInfo/${res.data._id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$nextTick(() => {
                        this.$refs.elTree && this.$refs.elTree.setCurrentKey(this.params.category_id)
                    })
                    this.handleNodeClick(this.classifyList[this.params.category_id]);

                })
            }
        }
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

    .article-type {
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

    .article-type-title {
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
    .article-list >>> .el-tree {
        background: #F5F7FA;
    }

    .article-list >>> .el-tree-node {
        white-space: normal;
    }

    .article-list >>> .el-tree-node__content {
        height: auto;
        padding: 10px 8px;
    }

    .article-list >>> .el-tree-node__content:hover {
        background: #FFF;
        color: #00C191;
        font-weight: bold;
    }

    .article-list >>> .el-tree .is-current {
        color: #00C191;
        font-weight: bold;
    }

    .article-list >>> .el-tree-node__expand-icon {
        padding: 0 6px 0 3px;
    }

    .edit ,.delete{
        color: #00C191;
        margin-right: 18px;
        cursor: pointer;
    }
</style>