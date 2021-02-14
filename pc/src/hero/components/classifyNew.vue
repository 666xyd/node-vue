<template>
    <div class="dialog">
        <el-dialog :title="title" :modal-append-to-body="true" :visible.sync="popupShow">
            <el-form label-width="140px">
                <el-form-item label="分类名称：" class="required">
                    <el-input placeholder="请输入分类名称" v-model="classify" style="width: 348px;"></el-input>
                    <alarm-text text="分类名称不可以为空" :empty="classifyError"></alarm-text>
                </el-form-item>

                <el-form-item label="描述：" class="required">
                    <el-input placeholder="请输入描述" v-model="describe" style="width: 348px"></el-input>
                    <alarm-text text="分类描述不可以为空" :empty="describeError"></alarm-text>
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
    import utils from "@/utils";
    export default {
        name: "classifyNew",
        data(){
            return {
                popupShow: this.value,          //新增分类弹窗是否显示
                title: '',

                classify: '',                   //分类名称
                describe: '',                   //分类描述
                comment: '',                    //备注内容
                classifyError: false,           //分类名称输入格式错误
                describeError: false,           //描述没有填入时的提示
            }
        },
        components: {
            AlarmText,
            SaveButton,
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
                        classify: '',
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
                this.classify = this.editItem.classify;
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
                //提交前判断分类名称是否填写
                if(this.classify === ''){
                    this.classifyError = true;
                    return false;
                }else{
                    this.classifyError = false;
                }

                //提交前判断描述是否填写
                if(this.describe === ''){
                    this.describeError = true;
                    return false;
                }else{
                    this.describeError = false;
                }

                let params = {
                    classify: this.classify,
                    comment: this.comment,
                    describe: this.describe,
                    time: utils.getCurrentTime(),
                }

                let res = null;

                if(this.isEdit){
                    //编辑
                    res = await this.$http.put(`categories/${this.editItem._id}`,params);
                }else{
                    //新增
                    res = await this.$http.post('categories', params);
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