<template>
    <div class="initMain strategyNew">
        <p style="font-size: 20px; font-weight: bold;margin-bottom: 20px">攻略信息</p>
        <div style="margin-left: 70px">
            <el-form label-width="80px">
                <el-form-item label="攻略封面：">
                    <el-upload
                        class="avatar-uploader"
                        :action="$http.defaults.baseURL + '/upload'"
                        :show-file-list="false"
                        :headers="getAuthHeaders()"
                        :on-success="res => pic = res.url">
                        <img v-if="pic" :src="pic" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="攻略标题：" class="required">
                    <el-input placeholder="请输入标题" v-model="title"></el-input>
                    <alarm-text text="请输入攻略标题" :empty="titleError"></alarm-text>
                </el-form-item>

                <el-form-item label="攻略内容：">
                    <vue-editor id="editor" v-model="content" :useCustomImageHandler="true" @image-added="handleImageAdded"></vue-editor>
                </el-form-item>
            </el-form>
        </div>


        <!--底部按钮-->
        <div class="button-bg">
            <div class="button-control">
                <el-button style="color: #666;" v-if="$route.name === 'strategyEdit'" @click="toDelete">删除</el-button>
                <el-button style="color: #666;" @click="toCancel">取 消</el-button>
                <el-button type="primary" @click="submit">保 存</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { VueEditor } from 'vue2-editor';
    import AlarmText from "../components/AlarmText";
    import utils from "@/utils";
    export default {
        name: "strategyNew",
        data(){
            return {
                pic: '',
                content: '',
                contentError: false,
                title: '',
                titleError: false,
            }
        },
        components: {
            AlarmText,
            VueEditor,
        },
        created() {
            if(this.$route.params.id){
                //获取该攻略的信息
                this.$http.get(`rest/strategyInfo/strategyId/${this.$route.params.id}`).then((res) => {
                    let item = res.data;
                    this.pic = item.pic;
                    this.title = item.title;
                    this.content = item.content;
                })
            }
        },
        watch: {
            async "$route.name"(){
                if(this.$route.params.id){
                    let res = await this.$http.get(`rest/strategyInfo/strategyId/${this.$route.params.id}`);
                    let item = res.data;
                    this.pic = item.pic;
                    this.title = item.title;
                    this.content = item.content;
                }else{
                    this.pic = '';
                    this.title = '';
                    this.content = '';
                }
            }
        },
        methods: {

            async handleImageAdded(file, Editor, cursorLocation, resetUploader){
                let formData = new FormData();
                formData.append("file", file);
                let res = await this.$http.post('upload', formData);
                Editor.insertEmbed(cursorLocation, "image", res.data.url);
                resetUploader();
            },

            //取消
            toCancel(){
                this.$confirm(`是否取消编辑?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( () => {
                    this.$router.back();
                })
            },

            //删除
            async toDelete(){
                let res = await this.$http.get(`rest/strategyInfo/strategyId/${this.$route.params.id}`);
                this.$confirm(`是否删除攻略--《${res.data.title}》?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( async () => {
                    await this.$http.delete(`rest/strategyInfo/${res.data._id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$router.push({name: 'strategyList'});
                })
            },

            //保存
            submit(){

                if(this.title === ''){
                    this.titleError = true;
                    return false;
                }else{
                    this.titleError = false;
                }

                let params = {
                    pic: this.pic,
                    title: this.title,
                    content: this.content,
                    date: utils.getCurrentTime(),
                }

                let res;
                if(this.$route.params.id){
                    //编辑攻略
                    res = this.$http.put(`rest/strategyInfo/${this.$route.params.id}`, params)
                }else{
                    //新增
                    res = this.$http.post('rest/strategyInfo', params);
                }
                this.$message({message: '保存成功', type: "success"});
                this.$router.push({name: 'strategyList'});
            }
        }
    }
</script>

<style scoped>
    .strategyNew{
        margin-bottom: 80px;
    }

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
        width: 198px;
        height: 98px;
        line-height: 98px;
        text-align: center;
    }

    .avatar {
        height: 198px;
        display: block;
    }

    .strategyNew >>> .el-input__inner{
        width: 548px;
    }
</style>