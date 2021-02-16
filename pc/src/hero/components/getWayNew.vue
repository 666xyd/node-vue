<template>
    <div class="dialog">
        <el-dialog title="新增获取方式" :modal-append-to-body="true" :visible.sync="popupShow">
            <el-form label-width="140px">
                <el-form-item label="获取方式名称：" class="required">
                    <el-input placeholder="请输入获取方式名称" v-model="way" style="width: 348px;"></el-input>
                    <alarm-text text="获取方式名称不可以为空" :empty="wayError"></alarm-text>
                </el-form-item>

                <el-form-item label="描述：" class="required">
                    <el-input placeholder="请输入描述" v-model="describe" style="width: 348px"></el-input>
                    <alarm-text text="获取方式描述不可以为空" :empty="describeError"></alarm-text>
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
                popupShow: this.value,          //新增获取方式弹窗是否显示

                way: '',                   //获取方式名称
                describe: '',                   //获取方式描述
                comment: '',                    //备注内容
                wayError: false,           //获取方式名称输入格式错误
                describeError: false,           //描述没有填入时的提示
            }
        },
        props: {
            value: {
                type: Boolean,
                default: false,
            },
            type: {
                type: String,
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
        methods: {
            //取消按钮
            closePopup(){
                this.popupShow = false;
            },
            //保存按钮
            async submit(){
                //提交前判断分类名称是否填写
                if(this.way === ''){
                    this.wayError = true;
                    return false;
                }else{
                    this.wayError = false;
                }

                //提交前判断描述是否填写
                if(this.describe === ''){
                    this.describeError = true;
                    return false;
                }else{
                    this.describeError = false;
                }

                let params = {
                    name: this.way,
                    describe: this.describe,
                    comment: this.comment,
                }

                let res = await this.$http.post(`rest/${this.type}`, params);

                this.popupShow = false;
                this.$message({message: '保存成功', type: "success"});
                this.$emit('success');
            }
        }
    }
</script>

<style scoped>

</style>