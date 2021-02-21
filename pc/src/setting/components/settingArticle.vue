<template>
    <div class="setting-page">
        <div class="form">
            <AddButton title="新增文章分类" @add="add"></AddButton>
        </div>

        <div class="way-list">
            <el-table :data="wayList">
                <el-table-column label="文章分类" min-width="10%">
                    <template slot-scope="scope">
                        {{scope.row.name}}
                    </template>
                </el-table-column>

                <el-table-column label="描述" min-width="40%">
                    <template slot-scope="scope">
                        {{scope.row.describe}}
                    </template>
                </el-table-column>

                <el-table-column label="备注" min-width="25%">
                    <template slot-scope="scope">
                        {{scope.row.comment || '--'}}
                    </template>
                </el-table-column>

                <el-table-column label="操作" min-width="25%">
                    <template slot-scope="scope">
                        <el-button @click="toEdit(scope.row)" type="primary" size="small">编辑</el-button>
                        <el-button @click="toDelete(scope.row)" type="primary" size="small">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>
        <article-classify v-model="popupShow" v-if="popupShow" @success="success"
                     :is-edit="isEdit" :edit-item="editItem"></article-classify>
    </div>
</template>

<script>
import AddButton from '../../components/AddButton';
import articleClassify from "@/article/components/articleClassify";

export default {
    name: "settingArticle",
    data(){
        return{
            wayList: [],
            popupShow: false,
            editItem: {},
            isEdit: false,
        }
    },
    components: {
        AddButton,
        articleClassify,
    },
    created() {
        this.getWayList();
    },
    methods: {
        //获取获取方式列表
        getWayList(){
            this.$http.get('rest/articleClassify').then((res)=>{
                this.wayList = res.data;
            })
        },
        //编辑
        toEdit(row){
            this.popupShow = true;
            this.editItem = row;
            this.isEdit = true;
        },

        //删除
        toDelete(row){
            this.$confirm(`是否删除文章分类--${row.name}?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await this.$http.delete(`rest/articleClassify/${row._id}`)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.getWayList();
            })
        },

        add(){
            this.popupShow = true;
            this.isEdit = false;
        },

        success(){
            this.getWayList();
        }
    }
}
</script>

<style scoped>

.form{
    margin-bottom: 20px;
    margin-top: 12px;
}
</style>