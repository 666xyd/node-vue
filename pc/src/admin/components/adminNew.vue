<template>
    <div class="dialog">
        <el-dialog :title="title" :modal-append-to-body="true" :visible.sync="popupShow">
            <el-form label-width="140px">
                <el-form-item label="管理员名称：" class="required">
                    <el-input placeholder="请输入管理员名称" v-model="name" style="width: 348px;"></el-input>
                    <alarm-text text="管理员名称不可以为空" :empty="nameError"></alarm-text>
                </el-form-item>

                <el-form-item label="密码：" class="required">
                    <el-input placeholder="请输入密码" v-model="password" style="width: 348px" ></el-input>
                    <alarm-text :text="passwordText" :empty="passwordError"></alarm-text>
                </el-form-item>

                <el-form-item label="手机号码：" class="required">
                    <el-input placeholder="请输入手机号码" v-model="phone" style="width: 348px;" maxlength="11" show-word-limit></el-input>
                    <alarm-text text="手机格式错误" :empty="phoneError"></alarm-text>
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
import utils from "@/utils";
export default {
    name: "adminNew",
    components: {
        AlarmText,
        SaveButton,
    },
    data(){
        return {
            popupShow: this.value,          //新增获取方式弹窗是否显示

            name: '',
            nameError: false,
            password: '',
            passwordError: false,
            passwordText: '',
            phone: '',
            phoneError: false,

            title: '新增管理员',
        }
    },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        isEdit: {
            type: Boolean,
            default: false,
        },
        editItem: {
            type: Object,
            default: () => {
                return {

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
        if(this.isEdit === true){
            this.name = this.editItem.name;
            this.password = this.editItem.password;
            this.phone = this.editItem.phone;
            this.title = '编辑管理员';
        }
    },
    methods: {
        //取消按钮
        closePopup(){
            this.popupShow = false;
        },
        //保存按钮
        async submit(){
            if(this.name === ''){
                this.nameError = true;
                return false;
            }else{
                this.nameError = false;
            }
            
            if(this.password === ''){
                this.passwordError = true;
                this.passwordText = '请输入密码';
                return false;
            }else if(this.password.length < 6){
                this.passwordError = true;
                this.passwordText = '密码最少为6位';
                return false;
            }else if(this.password.length > 18){
                this.passwordError = true;
                this.passwordText = '密码最多为18位';
                return false;
            }else{
                this.passwordError = false;
            }

            if(utils.is_phone(this.phone)){
                this.phoneError = false;
            }else{
                this.phoneError = true;
                return false;
            }

            let params = {
                name: this.name,
                password: this.password,
                phone: this.phone,
                date: utils.getCurrentTime(),
            }

            let res;

            if(this.isEdit){
                //编辑
                res = await this.$http.put(`rest/adminInfo/${this.editItem._id}`, params)
            }else{
                res =  await this.$http.post('rest/adminInfo', params);
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