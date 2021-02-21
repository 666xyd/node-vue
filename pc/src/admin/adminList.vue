<template>
    <div class="admin-list initMain">
        <div class="list-form al-center">
            <add-button title="添加管理员" @add="add"></add-button>
            <search title="搜索管理员姓名"></search>
        </div>

        <div class="list-main">
            <el-table :data="adminList.slice((page - 1) * page_count, page * page_count)" :default-sort = "{prop: 'date', order: 'descending'}">
                <el-table-column label="管理员姓名">
                    <template slot-scope="scope">
                        {{scope.row.name}}
                    </template>
                </el-table-column>

<!--                <el-table-column label="密码">-->
<!--                    <template slot-scope="scope">-->
<!--                        {{scope.row.password}}-->
<!--                    </template>-->
<!--                </el-table-column>-->

                <el-table-column label="手机号">
                    <template slot-scope="scope">
                        {{scope.row.phone}}
                    </template>
                </el-table-column>

                <el-table-column label="添加时间" prop="date" sortable></el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="toEdit(scope.row)" type="primary" size="small">编辑</el-button>
                        <span @click="toDelete(scope.row)" class="delete">删除</span>
                    </template>
                </el-table-column>
            </el-table>
            <pagination :total="adminList.length" :page_count.sync="page_count" :page.sync="page"></pagination>
        </div>

        <admin-new v-model="popupShow" v-if="popupShow" :is-edit="isEdit" :edit-item="editItem" @success="success"></admin-new>
    </div>
</template>

<script>
    import AddButton from "@/components/AddButton";
    import Search from "@/components/Search";
    import adminNew from "@/admin/components/adminNew";
    import Pagination from "@/components/Pagination";
    export default {
        name: "adminList",
        data(){
            return{
                popupShow: false,
                adminList: [],
                page_count: this.$store.state.per_num,   //每页数据条数
                page: 1,     //页码
                searchText: '',      //搜索框内容
                isEdit: false,
                editItem: {},
            }
        },
        components: {
            AddButton,
            Search,
            adminNew,
            Pagination
        },
        created() {
            this.getAdminList();
        },
        methods: {
            add(){
                this.popupShow = true;
                this.isEdit = false;
            },

            //获取管理员列表
            getAdminList(){
                this.$http.get('rest/adminInfo').then((res) => {
                    this.adminList = res.data;
                })
            },

            //编辑
            toEdit(row){
                this.popupShow = true;
                this.isEdit = true;
                this.editItem = row;
                window.console.log(this.editItem);
            },

            //删除
            toDelete(row){
                this.$confirm(`是否删除管理员--${row.name}?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await this.$http.delete(`rest/adminInfo/${row._id}`);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getAdminList();
                })

            },

            success(){
                this.getAdminList();
            }
        }
    }
</script>

<style scoped>

.list-form{
    margin-bottom: 20px;
}

.delete{
    color: #00c191;
    font-size: 14px;
    cursor: pointer;
    margin-left: 18px;
}
</style>