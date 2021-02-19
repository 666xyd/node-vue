<template>
    <div class="setting-page">
        <div class="form">
            <AddButton title="新增皮肤性质" @add="add"></AddButton>
        </div>

        <div class="way-list">
            <el-table :data="wayList">
                <el-table-column label="皮肤性质" min-width="10%">
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

        <character-new v-model="popupShow" v-if="popupShow" @success="success" :is-edit="isEdit" :edit-item="editItem"></character-new>
    </div>
</template>

<script>
import AddButton from '../../components/AddButton';
import characterNew from "@/hero/components/characterNew";
export default {
    name: "settingHeroGet",
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
        characterNew
    },
    created() {
        this.getWayList();
    },
    methods: {
        //获取获取方式列表
        getWayList(){
            this.$http.get('rest/skinCharacter').then((res)=>{
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
            this.$confirm(`是否删除皮肤性质--${row.name}?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await this.$http.delete(`rest/skinCharacter/${row._id}`)
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