<template>
    <div class="article-list">
        <van-tabs v-model="active" animated  @click="articleTab">
            <van-tab v-for="(item, index) in articleClassifyList" :title="item.name" :key="index">
                <div class="content-list" v-if="articleList.length">
                    <template v-for="(article, index) in articleList" >
                        <div :key="index" class="flex flex-between list-item fs-lg" @click="toArticleDetail(article)">
                            <div class="flex al-center" style="width: 80%">
                                <span class="item-tag article-tag " :class="'color-' + article.color">{{item.name === '全部' ? `${article.name[0]}` : `${item.name}`}}</span>
                                <span class="van-ellipsis" style="max-width: 80%">{{article.title}}</span>
                            </div>

                            <span>{{article.date.split(' ')[0]}}</span>
                        </div>
                    </template>
                </div>
                <div v-else class="article-empty">
                    <van-empty description="暂无该类型资讯" />
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
export default {
    name: "articleList",
    data(){
        return{
            active: 0,
            articleClassifyList: [{name: '全部', id: 0}],
            articleList: [],
        }
    },
    async created() {
        await this.getArticleList();
        await this.getArticleClassify();
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
                    }else if(res.data[i].name[0] === '热门') {
                        this.$set(res.data[i], 'color', 'red');
                    }else if(res.data[i].name[0] === '新闻') {
                        this.$set(res.data[i], 'color', 'green');
                    }else if(res.data[i].name[0] === '活动') {
                        this.$set(res.data[i], 'color', 'blue');
                    }else if(res.data[i].name[0] === '赛事') {
                        this.$set(res.data[i], 'color', 'orange');
                    }
                    this.articleList.push(res.data[i]);
                }
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
                        if(name === '公告'){
                            this.$set(res.data[i], 'color', 'yellow');
                        }else if(name === '热门') {
                            this.$set(res.data[i], 'color', 'red');
                        }else if(name === '新闻') {
                            this.$set(res.data[i], 'color', 'green');
                        }else if(name === '活动') {
                            this.$set(res.data[i], 'color', 'blue');
                        }else if(name === '赛事') {
                            this.$set(res.data[i], 'color', 'orange');
                        }
                        this.articleList.push(res.data[i]);
                    }
                })
            }
        },

        //进入到文章详情页
        toArticleDetail(item){
            this.$router.push({name: 'articleDetail', params: {id: item._id}});
        },

    }
}
</script>

<style scoped>


.article-list >>> .van-tabs__line{
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

.color-red{
    color: #ff3636;
    border-color: #ff3636;
}

.color-orange{
    color: #f09a37;
    border-color: #f09a37;
}

.color-green{
    color: #1e96ab;
    border-color: #1e96ab;
}

.color-blue{
    border-color: #4d9cff;
    color: #4d9cff;
}

.color-yellow{
    color: #db9e3f;
    border-color: #db9e3f;
}

.article-empty >>> .van-empty{
    padding: 27px 0;
}

.article-empty >>> .van-empty__image{
    width: 9.231rem;
    height: 9.231rem;
}
</style>