<template>
    <div class="dialog">
        <el-dialog title="新增皮肤性质" :modal-append-to-body="true" :visible.sync="popupShow">
            <el-form label-width="140px">
                <el-form-item label="皮肤性质：" class="required">
                    <el-input placeholder="请输入皮肤性质" v-model="name" style="width: 348px;"></el-input>
                    <alarm-text text="皮肤性质不可以为空" :empty="nameError"></alarm-text>
                </el-form-item>

                <el-form-item label="描述：" class="required">
                    <el-input placeholder="请输入描述" v-model="describe" style="width: 348px"></el-input>
                    <alarm-text text="皮肤性质描述不可以为空" :empty="describeError"></alarm-text>
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
    name: "getWayNew",
    components: {
        AlarmText,
        SaveButton,
    },
    data(){
        return {
            popupShow: this.value,          //新增皮肤性质弹窗是否显示

            name: '',                   //获取皮肤性质
            describe: '',                   //皮肤性质
            comment: '',                    //备注内容
            nameError: false,           //皮肤性质输入格式错误
            describeError: false,           //描述没有填入时的提示
        }
    },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        value(newValue){
            this.popupShow = newValue;
        },
        popupShow(newValue){
            this.$emit('input')
        }
    },
    methods: {
        //取消按钮
        closePopup(){
            this.popupShow = false;
        },
        //保存按钮
        async submit(){
            //提交前判断皮肤性质是否填写
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

            let res = await this.$http.post('rest/skinCharacter', params);

            this.popupShow = false;
            this.$message({message: '保存成功', type: "success"});
            this.$emit('success');
        }
    }
}
</script>

<style scoped>

</style>