<template>
    <div class="article-new initMain">
        <p class="title">文章信息</p>
        <div class="article-info">
            <el-form label-width="80px">
                <!--  文章分类  -->
                <el-form-item label="文章分类：">
                    <el-select placeholder="请选择文章分类" v-model="name" multiple>
                        <el-option v-for="item in articleClassify" :key="item.id" :value="item.name" :label="item.name"></el-option>
                    </el-select>
                    <alarm-text text="请选择文章分类" :empty="nameError"></alarm-text>
                    <span class="add">+新增文章分类</span>
                </el-form-item>

                <!--  文章封面  -->
                <el-form-item label="文章封面：">
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

                <el-form-item label="文章标题：" class="required">
                    <el-input placeholder="请输入标题" v-model="title"></el-input>
                    <alarm-text text="请输入文章标题" :empty="titleError"></alarm-text>
                </el-form-item>

                <el-form-item label="攻略内容：">
                    <vue-editor id="editor" v-model="content" :useCustomImageHandler="true" @image-added="handleImageAdded"></vue-editor>
                </el-form-item>



            </el-form>
        </div>

        <!--底部按钮-->
        <div class="button-bg">
            <div class="button-control">
                <el-button style="color: #666;" v-if="$route.name === 'articleEdit' " @click="toDelete">删除</el-button>
                <el-button style="color: #666;" @click="toCancel">取 消</el-button>
                <el-button type="primary" @click="submit()">保 存</el-button>
            </div>
        </div>

    </div>
</template>

<script>
    import { VueEditor } from 'vue2-editor';
    import AlarmText from "@/components/AlarmText";
    import utils from "@/utils";

    export default {
        name: "articleNew",
        data(){
            return{
                articleClassify: [],
                name: [],
                nameError: false,
                title: '',
                titleError: false,
                pic: '',
                content: '',
            }
        },
        components: {
            AlarmText,
            VueEditor,
        },
        watch: {
            async "$route.name"(){
                if(this.$route.params.id){
                    let res = await this.$http.get(`rest/articleInfo/articleId/${this.$route.params.id}`);
                    let item = res.data;
                    this.name = item.name;
                    this.pic = item.pic;
                    this.title = item.title;
                    this.content = item.content;
                }else{
                    this.name = '';
                    this.pic = '';
                    this.title = '';
                    this.content = '';
                }
            }
        },
        async created() {
            this.getClassifyList();
            if(this.$route.params.id){
                let res = await this.$http.get(`rest/articleInfo/articleId/${this.$route.params.id}`)
                let item = res.data;
                //编辑
                this.name = item.name;
                this.pic = item.pic;
                this.title = item.title;
                this.content = item.content;
            }
        },
        methods: {
            //获取文章分类列表
            getClassifyList(){
                this.$http.get('rest/articleClassify').then((res)=>{
                    this.articleClassify = [];
                    for(let i = 0; i < res.data.length; i++){
                        this.articleClassify.push({name: res.data[i].name, id: i});
                    }
                })
            },

            async handleImageAdded(file, Editor, cursorLocation, resetUploader){
                let formData = new FormData();
                formData.append("file", file);
                let res = await this.$http.post('upload', formData);
                Editor.insertEmbed(cursorLocation, "image", res.data.url);
                resetUploader();
            },

            //删除
            async toDelete(){
                let res = await this.$http.get(`rest/articleInfo/articleId/${this.$route.params.id}`);
                this.$confirm(`是否删除文章--《${res.data.title}》?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( async () => {
                    await this.$http.delete(`rest/articleInfo/${res.data._id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$router.push({name: 'articleList'});
                })
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

            //保存
            submit(){
                if(this.name.length === 0){
                    this.nameError = true;
                    return false;
                }else{
                    this.nameError = false;
                }

                if(this.title === ''){
                    this.titleError = true;
                    return false;
                }else{
                    this.titleError = false;
                }

                let params = {
                    name: this.name,
                    pic: this.pic,
                    title: this.title,
                    content: this.content,
                    date: utils.getCurrentTime(),
                    like: 0,
                    view: 0,
                    agree: 0,
                }

                let res;
                if(this.$route.params.id){
                    //编辑攻略
                    res = this.$http.put(`rest/articleInfo/${this.$route.params.id}`, params)
                }else{
                    //新增
                    res = this.$http.post('rest/articleInfo', params);
                }
                this.$message({message: '保存成功', type: "success"});
                this.$router.push({name: 'articleList'});
            }
        }
    }
</script>

<style scoped>

    .article-new{
        margin-bottom: 80px;
    }

    .title{
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 20px;
    }

    .article-info{
        margin-left: 70px;
    }

    .article-info >>> .el-input__inner{
        width: 348px!important;
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
        height: 98px;
        display: block;
    }

    .add{
        font-size: 12px;
        margin-left: 8px;
        color: #00c191;
        cursor: pointer;
    }
</style>