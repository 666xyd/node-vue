<template>
    <div class="article-detail initMain">
        <div class="articleInfo">
            <p class="title">{{article.title}}</p>
            <p class="date">{{article.date}}</p>
            <div class="content" v-html="article.content"></div>
        </div>
        <!--底部按钮-->
        <div class="button-bg">
            <div class="button-control">
                <el-button style="color: #666;" @click="toDelete">删除</el-button>
                <el-button type="primary" @click="toEdit">编 辑</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "articleDetail",
    data(){
        return{
            article: {},
        }
    },
    async created() {
        let res =  await this.$http.get(`rest/articleInfo/articleId/${this.$route.params.id}`)
        this.article = res.data;
        let page = document.getElementsByClassName('initMain')[0];
        //对所有图片进行居中处理
        this.$nextTick(()=>{
            let imgTotal = page.getElementsByTagName('img');
            for(let i = 0; i < imgTotal.length; i++){
                window.console.log(imgTotal[i].parentNode.classList);
                imgTotal[i].parentNode.classList.add('text-center');
            }

        })

    },
    methods: {
        async toDelete(){
            this.$confirm(`是否删除攻略--《${this.article.title}》?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then( async () => {
                await this.$http.delete(`rest/articleInfo/${this.article._id}`)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.$router.push({name: 'articleList'});
            })
        },
        toEdit(){
            this.$router.push({name: 'articleEdit', params: {id: this.article._id}})
        }
    },
}
</script>

<style scoped>

.article-detail{
    margin-bottom: 80px;
}

.articleInfo{
    margin-top: 20px;
}

.title{
    text-align: center;
    font-size: 32px;
    font-weight: bold;
}

.date{
    text-align: center;
    margin-top: 12px;
    color: #666666;
}

.articleInfo {
    width: 100%;
}

.content{
    width: 100%;
    margin-top: 24px;
    padding: 0 180px;
    letter-spacing: 1px;
}

.content >>> p{
    white-space: pre-line;
    text-indent: 2em;
    padding: 4px 10px;
}

.content >>> img{
    max-width: calc(100% - 2em);
}

.article-detail >>> .text-center{
    text-align: center;
}
</style>