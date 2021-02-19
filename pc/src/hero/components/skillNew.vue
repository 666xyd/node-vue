<template>
    <div class="dialog">
        <el-dialog :title="title" :modal-append-to-body="true" :visible.sync="popupShow">
            <el-form label-width="140px">
                <el-form-item label="技能名称：" class="required">
                    <el-input placeholder="请输入召唤师技能名称" v-model="name" style="width: 348px;"></el-input>
                    <alarm-text text="召唤师技能名称不可以为空" :empty="nameError"></alarm-text>
                </el-form-item>

                <el-form-item label="技能图标：" class="required">
                    <el-upload
                        class="avatar-uploader"
                        :action="$http.defaults.baseURL + '/upload'"
                        :show-file-list="false"
                        :on-success="res => icon = res.url" >
                        <img v-if="icon" :src="icon" class="avatar" style="width: 58px; height: 58px;">
                        <i v-else class="el-icon-plus avatar-uploader-icon" style="width: 58px; height: 58px;"></i>
                    </el-upload>
                    <alarm-text text="召唤师技能图标不可以为空" :empty="iconError"></alarm-text>
                </el-form-item>

                <el-form-item label="技能图片：" class="required">
                    <el-upload
                        class="avatar-uploader"
                        :action="$http.defaults.baseURL + '/upload'"
                        :show-file-list="false"
                        :on-success="res => pic = res.url" >
                        <img v-if="pic" :src="pic" class="avatar" style="width: 282px; height: 172px;">
                        <i v-else class="el-icon-plus avatar-uploader-icon" style="width: 282px; height: 172px;line-height: 172px;"></i>
                    </el-upload>
                    <alarm-text text="召唤师技能图片不可以为空" :empty="picError"></alarm-text>
                </el-form-item>

                <el-form-item label="解锁等级：" class="required">
                    <el-input placeholder="请输入解锁等级" v-model="level" style="width: 348px"></el-input>
                    <alarm-text text="解锁等级不可以为空" :empty="levelError"></alarm-text>
                </el-form-item>

                <el-form-item label="描述：" class="required">
                    <el-input placeholder="请输入描述" type="textarea" v-model="describe" style="width: 348px" :autosize="{ minRows: 1, maxRows: 5}"></el-input>
                    <alarm-text text="获取方式描述不可以为空" :empty="describeError" ></alarm-text>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <save-button textC="取 消" textS="保 存" @close="closePopup" @save="submit"></save-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import SaveButton from "../../components/SaveButton";
    import AlarmText from "../../components/AlarmText";
    export default {
        name: "skillNew",
        data(){
            return {
                popupShow: this.value,
                name: '',
                nameError: false,
                icon: '',
                iconError: false,
                pic: '',
                picError: false,
                describe: '',
                describeError: false,
                level: '',
                levelError: false,
                title: '',
            }
        },
        props: {
            value: {
                type: Boolean,
                default: false,
            },
            isEdit: {
                type:Boolean,
                default: false,
            },
            editItem: {
                type: Object,
                default: () => {
                    return {
                        name: '',
                        pic: '',
                        icon: '',
                        level: '',
                        describe: '',
                    }
                }
            }
        },
        components: {
            SaveButton,
            AlarmText,
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
            if(this.isEdit){
                //编辑
                this.title = '编辑召唤师技能';
                this.name = this.editItem.name;
                this.pic = this.editItem.pic;
                this.icon = this.editItem.icon;
                this.level = this.editItem.level;
                this.describe = this.editItem.describe;
            }else{
                this.title = '新增召唤师技能';
            }
        },
        methods: {
            closePopup(){
                this.popupShow = false;
            },

            async submit(){
                if(this.name === ''){
                    this.nameError = true;
                    return false;
                }else{
                    this.nameError = false;
                }

                if(this.icon === ''){
                    this.iconError = true;
                    return false;
                }else{
                    this.iconError = false;
                }

                if(this.pic === ''){
                    this.picError = true;
                    return false;
                }else{
                    this.picError = false;
                }

                if(this.level === ''){
                    this.levelError = true;
                    return false;
                }else{
                    this.levelError = false;
                }

                //提交前判断描述是否填写
                if(this.describe === ''){
                    this.describeError = true;
                    return false;
                }else{
                    this.describeError = false;
                }

                let params = {
                    name:this.name,
                    icon: this.icon,
                    pic: this.pic,
                    level: this.level,
                    describe: this.describe,
                }

                let res

                if(this.isEdit){
                    //编辑
                    res = await this.$http.put(`rest/heroSkill/${this.editItem._id}`,params);
                }else{
                    //新增
                    res = await this.$http.post('rest/heroSkill', params);
                }

                this.popupShow = false;
                this.$message({message: '保存成功', type: "success"});
                this.$emit('success');
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

    .dialog .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 58px;
        height: 58px;
        line-height: 58px;
        text-align: center;
    }

    .dialog .avatar {
        display: block;
    }
</style>