<template>
    <div class="index bg-white">
        <!-- 新闻资讯 -->
        <div class="indexCard">
            <div class="card-title fs-xl flex flex-between al-center fc-primary fw-700">
                <div class="flex al-center"><van-icon name="orders-o" size="18"/><span class="title-text">新闻资讯</span></div>

                <van-icon name="ellipsis" size="18"/>
            </div>
            <van-tabs v-model="active" animated  @click="articleTab">
                <van-tab v-for="(item, index) in articleClassifyList" :title="item.name" :key="index">
                    <div class="content-list">
                        <template v-for="(article, index) in articleList">
                            <div :key="index" class="flex flex-between list-item fs-lg" >
                                <div class="flex al-center">
                                    <span class="item-tag article-tag">{{item.name === '全部' ? `${article.name[0]}` : `${item.name}`}}</span>
                                    <span>{{article.title}}</span>
                                </div>

                                <span>{{article.date.split(' ')[0]}}</span>
                            </div>
                        </template>
                    </div>
                </van-tab>
            </van-tabs>
        </div>

    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                active: 0,
                articleClassifyList: [{name: '全部', id: 0}],
                articleList: [],
            }
        },
        async created() {
            await this.getArticleClassify();
            await this.getArticleList();
        },
        methods: {
            //获取文章分类列表
            getArticleClassify(){
                this.$http.get('rest/articleClassify').then((res)=>{
                    for(let i = 0; i < res.data.length; i++){
                        this.articleClassifyList.push({name: res.data[i].name, id: i+1});
                    }
                })
            },

            //获取所有文章列表
            getArticleList(){
                this.$http.get('rest/articleInfo').then((res)=>{
                    this.articleList = [];
                    let length = res.data.length > 5 ? 5 : res.data.length;
                    for(let i = 0; i < length; i++){
                        if(res.data[i].name[0] === '公告'){
                            this.$set(res.data[i], 'color', 'yellow');
                        }
                        this.articleList.push(res.data[i]);
                    }
                    window.console.log(this.articleList);
                })
            },

            //点击不同文章分类
            articleTab(title,name){
                if(title === 0){
                    //点击的是全部
                    this.getArticleList();
                }else{
                    //点击的是其他分类
                    this.$http.get(`rest/articleInfo/articleClassify/${name}`).then((res)=>{
                        this.articleList = [];
                        let length = res.data.length > 5 ? 5 : res.data.length;
                        for(let i = 0; i < length; i++){
                            this.articleList.push(res.data[i]);
                        }
                    })
                }
            },


        }
    }
</script>

<style scoped>

    .card-title{
        padding: 0.923rem 1.538rem;
        border-bottom: 1px solid #e9e9e9;
    }

    .title-text{
        margin-left: 0.462rem;
    }

    .indexCard >>> .van-tabs__line{
        background-color: #db9e3f;
    }

    .list-item{
        padding: 0.923rem 1.846rem;
        color: #343440;
    }

    .item-tag{
        border: 1px solid white;
        padding: 0.154rem 0.231rem;
        border-radius: 0.308rem;
        font-size: 1rem;
        margin-right: 0.308rem;
    }
</style>