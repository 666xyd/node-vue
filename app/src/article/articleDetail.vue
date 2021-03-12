<template>
    <div class="article-detail bg-white">
        <div class="article-header">
            <p class="article-title fw-700 fs-xl fc-primary">{{article.title}}</p>
            <p class="article-date">{{article.date}}</p>
        </div>
        <div class="content" v-html="article.content"></div>
        <!-- 用户操作组件 -->
        <operation :article="article" ></operation>
    </div>
</template>

<script>
    import operation from "../components/operation";
    export default {
        name: "articleDetail",
        data(){
            return{
                article: {},
                viewNum: null,
            }
        },
        components: {
            operation
        },
        async created() {
            this.getArticle();
        },
        methods: {
            //获得该文站信息
            getArticle(){
                this.$http.get(`rest/articleInfo/articleId/${this.$route.params.id}`).then((res)=>{
                    this.article = res.data;
                    this.viewNum = this.article.view;
                    this.pushRecord();
                    let article = document.getElementsByClassName('article-detail')[0];
                    //对所有图片进行居中处理
                    this.$nextTick(()=>{
                        let imgTotal = article.getElementsByTagName('img');
                        for(let i = 0; i < imgTotal.length; i++){
                            imgTotal[i].parentNode.classList.add('text-center');
                        }
                    })
                });
            },

            //将该文章放进用户浏览记录里面  和  更新文章的浏览数量
            async pushRecord(){
                let user = {};
                await this.getStore('user_info').then((res)=>{
                    user = res[0];
                })
                let params = {
                    name: this.$route.name,
                    id: this.$route.params.id
                }
                this.$http.post(`rest/appUserInfo/recordUpdate/${user.phone}`, params)

                //更新文章浏览数量
                this.$http.put(`rest/articleInfo/${this.$route.params.id}`, {view: this.viewNum+1}).then((res)=>{
                    window.console.log('执行了')
                })
            },

            //点击操作按钮
            // clickItem(){
            //     this.getArticle();
            // }
        }

    }
</script>

<style scoped>

    .article-detail{
        padding: 1.538rem 1.846rem;
    }

    .article-detail p{
        margin: 0;
    }

    .article-header{
        text-align: center;
        margin-bottom: 1.231rem;
    }

    .article-title{
        margin-bottom: 0.462rem!important;
        line-height: 1.846rem;
    }

    .content{
        margin-bottom: 1.846rem;
    }

    .content >>> p{
        margin: 0;
        white-space: pre-line;
        text-indent: 2em;
        padding: 0px 10px;
        line-height: 1.538rem;
    }

    .content  >>> img{
        max-width: 100%;
    }

    .article-detail >>> .text-center{
        padding: 0;
        text-align: center;
        text-indent: 0;
    }


</style>