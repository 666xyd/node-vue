<template>
    <div class="dialog">
        <el-dialog :title="title" :modal-append-to-body="true" :visible.sync="popupShow">
            <el-form label-width="140px">
                <el-form-item label="文章分类：" class="required">
                    <el-input placeholder="请输入文章分类" v-model="name" style="width: 348px;"></el-input>
                    <alarm-text text="文章分类不可以为空" :empty="nameError"></alarm-text>
                </el-form-item>

                <el-form-item label="描述：" class="required">
                    <el-input placeholder="请输入描述" v-model="describe" style="width: 348px" type="textarea" autosize></el-input>
                    <alarm-text text="文章分类描述不可以为空" :empty="describeError"></alarm-text>
                </el-form-item>

                <el-form-item label="备注：">
                    <el-input placeholder="请输入备注" v-model="comment" style="width: 348px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <save-button textC="取 消" textS="保 存" @close="closePopup" @save="submit"></save-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import AlarmText from "../../components/AlarmText";
import SaveButton from "../../components/SaveButton";
export default {
    name: "articleClassify",
    components: {
        AlarmText,
        SaveButton,
    },
    data(){
        return {
            popupShow: this.value,          //新增装备分类弹窗是否显示

            name: '',                   //获取文章分类
            describe: '',                   //文章分类
            comment: '',                    //备注内容
            nameError: false,           //文章分类输入格式错误
            describeError: false,           //描述没有填入时的提示
            title: '',
        }
    },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        //是否是编辑弹窗
        isEdit: {
            type: Boolean,
            default: false,
        },
        //编辑的对象
        editItem: {
            type: Object,
            default: () => {
                return {
                    name: '',
                    comment: '',
                    describe: '',
                }
            }
        }
    },
    watch: {
        value(newValue){
            this.popupShow = newValue;
        },
        popupShow(newValue){
            this.$emit('input')
        }
    },
    created() {
        this.title = this.isEdit ? '编辑分类' : '新增分类';
        if(this.isEdit){
            this.name = this.editItem.name;
            this.describe = this.editItem.describe;
            this.comment = this.editItem.comment;
        }

    },
    methods: {
        //取消按钮
        closePopup(){
            this.popupShow = false;
        },
        //保存按钮
        async submit(){
            //提交前判断文章分类是否填写
            if(this.name === ''){
                this.nameError = true;
                return false;
            }else{
                this.nameError = false;
            }

            //提交前判断描述是否填写
            if(this.describe === ''){
                this.describeError = true;
                return false;
            }else{
                this.describeError = false;
            }

            let params = {
                name: this.name,
                describe: this.describe,
                comment: this.comment,
            }


            let res ;
            if(this.isEdit){
                //编辑
                res = await this.$http.put(`rest/articleClassify/${this.editItem._id}`,params);
            }else{
                //新增
                res = await this.$http.post('rest/articleClassify', params);
            }

            this.popupShow = false;
            this.$message({message: '保存成功', type: "success"});
            this.$emit('success');
        }
    }
}
</script>

<style scoped>

</style>