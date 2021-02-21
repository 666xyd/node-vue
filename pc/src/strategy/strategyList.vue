<template>
    <div class="strategyList initMain">
        <div class="search">
            <Search title="搜索攻略题目" v-model="searchText" @search="search"></Search>
        </div>

        <el-table :data="strategyList.slice((page - 1) * page_count, page * page_count)" :default-sort = "{prop: 'date', order: 'descending'}">
            <el-table-column label="攻略标题">
                <template slot-scope="scope">
                    {{scope.row.title}}
                </template>
            </el-table-column>

            <el-table-column label="创作时间" sortable prop="date"></el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" style="margin-right: 18px" @click="toEdit(scope.row)">编辑</el-button>
                    <span class="edit" @click="toDetail(scope.row)">详情</span>
                    <span class="delete" @click="deleteStrategy(scope.row)">删除</span>
                </template>
            </el-table-column>
        </el-table>
        <pagination :total="strategyList.length" :page_count.sync="page_count" :page.sync="page"></pagination>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination";
    import Search from "@/components/Search";
    export default {
        name: "strategyList",
        data(){
            return {
                strategyList: [],
                page_count: this.$store.state.per_num,   //每页数据条数
                page: 1,     //页码
                searchText: '',
            }
        },
        components: {
            Pagination,
            Search
        },
        created() {
            this.getStrategyList();

        },
        methods: {
            //获取攻略列表页面
            getStrategyList(){
                this.$http.get('rest/strategyInfo').then((res)=>{
                    this.strategyList = res.data;
                    window.console.log(this.strategyList);
                })
            },

            toEdit(row){
                this.$router.push({name: 'strategyEdit', params: {id: row._id}});
            },

            deleteStrategy(row){
                this.$confirm(`是否删除攻略--《${row.title}》?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( async () => {
                    await this.$http.delete(`rest/strategyInfo/${row._id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getStrategyList();
                })
            },

            toDetail(row){
                this.$router.push({name: 'strategyDetail', params: {id: row._id}});
            },

            search(){
                //这里需要nexttick，不用的话点清空搜索内容时，仍然停留在搜索内容的结果
                this.$nextTick(()=>{
                    if(this.searchText){
                        //有输入内容
                        this.$http.get(`rest/strategyInfo/strategyTitle/${this.searchText}`).then((res)=>{
                            this.strategyList = res.data;
                        })
                    }else{
                        //内容清空
                        this.getStrategyList();
                    }
                })
            }
        }
    }
</script>

<style scoped>

    .edit ,.delete{
        color: #00C191;
        margin-right: 18px;
        cursor: pointer;
    }

    .search{
        margin-bottom: 12px;
    }

    .search >>> .search{
        margin-left: 0;
    }
</style>