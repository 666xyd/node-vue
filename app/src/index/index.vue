<template>
    <div class="index">
        <!-- 轮播图 -->
        <div class="ads-swiper">
            <van-swipe :autoplay="3000" indicator-color="#db9e3f" :height="180">
                <van-swipe-item v-for="(item, index) in adsList" :key="index" @click="toAdsDetail(item)">
                    <van-image height="200" width="100%" fit="cover" :src="item.pic" />
                </van-swipe-item>
            </van-swipe>
        </div>

        <!-- 新闻资讯 -->
        <div class="indexCard">
            <div class="card-title fs-xl flex flex-between al-center fc-primary fw-700">
                <div class="flex al-center"><van-icon name="orders-o" size="18"/><span class="title-text">新闻资讯</span></div>
                <van-icon name="ellipsis" size="18" @click="$router.push({name: 'articleList'})"/>
            </div>
            <!--  资讯列表  -->
            <article-van></article-van>
        </div>

        <!-- 召唤师技能 -->
        <div class="indexCard">
            <div class="card-title fs-xl flex flex-between al-center fc-primary fw-700">
                <div class="flex al-center"><van-icon name="diamond-o" size="18"/><span class="title-text">召唤师技能</span></div>
            </div>
            <hero-skill></hero-skill>
        </div>

    </div>
</template>

<script>
    import articleVan from "../article/articleVan";
    import heroSkill from "../hero/heroSkill";
    import Hero from "../hero/hero";
    export default {
        name: "index",
        data(){
            return{
                adsList: [],
            }
        },
        components: {
            articleVan,
            heroSkill,
        },
        async created() {
            await this.getArticleList();
        },
        methods: {
            //获取所有文章列表
            getArticleList(){
                this.$http.get('rest/articleInfo').then((res)=>{
                    this.articleList = [];
                    let length = res.data.length > 5 ? 5 : res.data.length;
                    for(let i = 0; i < length; i++){
                        if(res.data[i].pic && this.adsList.length < 4){
                            this.adsList.push(res.data[i]);
                        }
                    }
                })
            },

            //点击广告
            toAdsDetail(item){
                this.$router.push( {name: 'articleDetail', params: {id: item._id} });
            }



        }
    }
</script>

<style scoped>

    .indexCard{
        margin-top: 0.923rem;
        background-color: white;
    }

    .card-title{
        padding: 0.923rem 1.538rem;
        border-bottom: 1px solid #e9e9e9;
    }

    .title-text{
        margin-left: 0.462rem;
    }

</style>