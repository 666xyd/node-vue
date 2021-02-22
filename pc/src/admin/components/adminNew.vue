<template>
    <div class="dialog">
        <el-dialog :title="title" :modal-append-to-body="true" :visible.sync="popupShow">
            <el-form label-width="140px">
                <el-form-item label="管理员名称：" class="required">
                    <el-input placeholder="请输入管理员名称" v-model="name" style="width: 348px;"></el-input>
                    <span class="changePassword" v-if="isEdit" @click="changePassword = !changePassword">{{changePassword ? '取消修改' : '修改密码'}}</span>
                    <alarm-text text="管理员名称不可以为空" :empty="nameError"></alarm-text>
                </el-form-item>

                <el-form-item label="头像：">
                    <el-upload
                        class="avatar-uploader"
                        :action="$http.defaults.baseURL + '/upload'"
                        :headers="getAuthHeaders()"
                        :show-file-list="false"
                        :on-success="res => pic = res.url">
                        <img v-if="pic" :src="pic" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item :label="isEdit ? '旧密码：' : '密码：'" class="required" v-if="changePassword || !isEdit">
                    <el-input placeholder="请输入密码" v-model="password" style="width: 348px" type="password" maxlength="18" show-password></el-input>
                    <alarm-text :text="passwordText" :empty="passwordError"></alarm-text>
                </el-form-item>

                <el-form-item label="新密码：" class="required" v-if="changePassword">
                    <el-input placeholder="请输入密码" v-model="newPassword" style="width: 348px" maxlength="18" type="password" show-password></el-input>
                    <alarm-text :text="newPasswordText" :empty="newPasswordError"></alarm-text>
                </el-form-item>

                <el-form-item label="再次输入新密码：" class="required" v-if="changePassword">
                    <el-input placeholder="请再次输入新密码" v-model="again" style="width: 348px" maxlength="18" type="password" show-password></el-input>
                    <alarm-text text="再次输入新密码不一致" :empty="againError"></alarm-text>
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
            pic: '',
            password: '',
            passwordError: false,
            passwordText: '',
            phone: '',
            phoneError: false,
            oldName: '',
            newPassword: '',
            newPasswordText: '',
            newPasswordError: false,
            again: '',
            againError: false,

            title: '新增管理员',
            changePassword: false,
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
            this.phone = this.editItem.phone;
            this.pic = this.editItem.pic;
            this.title = '编辑管理员';
            this.oldName = this.editItem.name;
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

            if(utils.is_phone(this.phone)){
                this.phoneError = false;
            }else{
                this.phoneError = true;
                return false;
            }

            if(this.password.length < 6 && (!this.isEdit || this.changePassword)){
                this.passwordText = '密码不得少于6位';
                this.passwordError = true;
                return false;
            }else{
                this.passwordError = false;
            }

            if(!this.isEdit){
                //新增
                let params = {
                    name: this.name,
                    password: this.password,
                    phone: this.phone,
                    pic: this.pic,
                    date: utils.getCurrentTime(),
                }
                let res =  await this.$http.post('rest/adminInfo', params);
                this.popupShow = false;
                this.$message({message: '保存成功', type: "success"});
                this.$emit('success');
            }else{
                //编辑
                let params = {};
                if(this.changePassword){
                    //要修改密码了
                    await this.$http.post('changePassword', {name: this.oldName, password: this.password});

                    if(this.newPassword.length < 6 && this.changePassword) {
                        this.newPasswordError = true;
                        this.newPasswordText = '新密码不得少于6位';
                        return false;
                    }else{
                        this.newPasswordError = false;
                    }

                    if(this.again !== this.newPassword && this.changePassword){
                        this.againError = true;
                        return false;
                    }else{
                        this.againError = false;
                    }

                    params = {
                        name: this.name,
                        phone: this.phone,
                        pic: this.pic,
                        password: this.newPassword,
                    }
                }else{
                    //不要修改密码
                    params = {
                        name: this.name,
                        phone: this.phone,
                        pic: this.pic,
                    }
                }
                let res = await this.$http.put(`rest/adminInfo/${this.editItem._id}`, params);
                this.popupShow = false;
                this.$message({message: '保存成功', type: "success"});
                this.$emit('success');
                if(localStorage.name === this.oldName){
                    localStorage.pic = this.pic;
                    window.location.reload();
                }
            }

        }
    }
}
</script>

<style scoped>
.avatar-uploader >>>  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader  >>> .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 98px;
    height: 98px;
    line-height: 98px;
    text-align: center;
}
.avatar {
    width: 98px;
    height: 98px;
    display: block;
}

.changePassword{
    font-size: 12px;
    color: #00c191;
    margin-left: 8px;
    cursor:pointer;
}
</style>