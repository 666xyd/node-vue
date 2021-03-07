<template>
    <div class="article-detail">
        <div class="article-header">
            <p class="article-title fw-700 fs-xl fc-primary">{{article.title}}</p>
            <p class="article-date">{{article.date}}</p>
        </div>
        <div class="content" v-html="article.content"></div>
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
        components: {

        },
        async created() {
            await this.getArticle();
        },
        methods: {
            //获得该文站信息
            getArticle(){
                this.$http.get(`rest/articleInfo/articleId/${this.$route.params.id}`).then((res)=>{
                    this.article = res.data;
                    let article = document.getElementsByClassName('article-detail')[0];
                    //对所有图片进行居中处理
                    this.$nextTick(()=>{
                        let imgTotal = article.getElementsByTagName('img');
                        for(let i = 0; i < imgTotal.length; i++){
                            window.console.log(imgTotal[i].parentNode.classList);
                            imgTotal[i].parentNode.classList.add('text-center');
                        }

                    })
                })
            }
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