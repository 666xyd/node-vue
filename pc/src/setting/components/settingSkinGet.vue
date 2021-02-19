<template>
    <div class="setting-page">
        <div class="form">
            <AddButton title="新增皮肤获取方式" @add="add"></AddButton>
        </div>

        <div class="way-list">
            <el-table :data="wayList">
                <el-table-column label="获取方式" min-width="10%">
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
        <get-way-new v-model="popupShow" v-if="popupShow" @success="success" type="skinGetWay"
                     :is-edit="isEdit" :edit-item="editItem"></get-way-new>
    </div>
</template>

<script>
import AddButton from '../../components/AddButton';
import getWayNew from "@/hero/components/getWayNew";

export default {
    name: "settingSkinGet",
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
        getWayNew
    },
    created() {
        this.getWayList();
    },
    methods: {
        //获取获取方式列表
        getWayList(){
            this.$http.get('rest/skinGetWay').then((res)=>{
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
            this.$confirm(`是否删除获取方式--${row.name}?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await this.$http.delete(`rest/skinGetWay/${row._id}`)
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