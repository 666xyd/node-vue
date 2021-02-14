<template>
    <div class="classify-list initMain">
        <div class="list-content">
            <div class="list-form al-center">
                <add-button title="新增分类" @add="add"></add-button>
                <search title="搜索分类名称" v-model="searchText" @search="search"></search>
            </div>

            <!-- 分类列表 -->
            <div class="list-main" style="width: 100%">
                <div class="list">
                    <el-table :data="list.slice((page - 1) * page_count, page * page_count)">
                        <el-table-column label="分类名称" min-width="10%">
                            <template slot-scope="scope">
                                {{scope.row.classify || '--'}}
                            </template>
                        </el-table-column>
                        <el-table-column label="描述" min-width="35%">
                            <template slot-scope="scope">
                                {{scope.row.describe}}
                            </template>
                        </el-table-column>
                        <el-table-column label="创建时间" min-width="15%">
                            <template slot-scope="scope">
                                {{scope.row.time}}
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" min-width="20%">
                            <template slot-scope="scope">
                                {{scope.row.comment || '--'}}
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" min-width="20%">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" style="margin-right: 18px" @click="editClassify(scope.row)">编辑</el-button>
                                <span class="delete" @click="deleteClassify(scope.row)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>

                    <!-- 分页器 -->
                    <pagination :total="list.length" :page_count.sync="page_count" :page.sync="page"></pagination>
                </div>
            </div>

        </div>

        <!-- 新增分类弹窗 -->
        <classify-new v-if="popupShow" v-model="popupShow" @success="success" :is-edit="isEdit" :edit-item="editItem"></classify-new>

    </div>
</template>

<script>
    import AddButton from "../components/AddButton";
    import Search from "../components/Search";
    import classifyNew from "../hero/components/classifyNew";
    import pagination from "../components/Pagination";
    import utils from "../utils";
    export default {
        name: "heroClassify",
        components: {
            AddButton,
            Search,
            classifyNew,
            pagination,
        },
        data(){
            return {
                popupShow: false,              //新增分类弹窗是否显示
                list: [],              //分类列表
                //分页器
                page_count: this.$store.state.per_num,   //每页数据条数
                page: 1,                       //页码
                isEdit: false,                 //是否要编辑
                editItem: {},                  //编辑的对象
                searchText: '',                //搜索的内容
            }
        },
        created() {
            this.getClassifyList();
        },
        methods: {
            //新增分类
            add(){
                this.isEdit = false;
                this.popupShow = true;
            },

            //获取分类列表
            getClassifyList(){
                this.$http.get('rest/heroCategories').then((res)=>{
                    this.list = res.data;
                })
            },

            //编辑分类
            editClassify(row){
                this.popupShow = true;
                this.isEdit = true;
                this.editItem = row;
            },

            //删除分类
            deleteClassify(row){
                this.$confirm(`是否删除分类--${row.classify}?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( async () => {
                    let res = await this.$http.delete(`rest/heroCategories/${row._id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getClassifyList();
                })
            },

            //搜索框搜索
            search(){
                this.$nextTick(()=>{
                    if(this.searchText){
                        //有搜索内容
                        this.$http.get(`rest/heroCategories/classify/${this.searchText}`).then((res)=>{
                            this.list = res.data;
                        })
                    }else{
                        //清空搜索内容
                        this.getClassifyList();
                    }
                })

            },

            //新增分类点击保存时刷新列表
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

    .delete{
        color: #00C191;
        margin-right: 18px;
        cursor: pointer;
    }
</style>