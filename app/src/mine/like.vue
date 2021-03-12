<template>
    <div class="mine-like">
        <p class="fc-primary fs-xl fw-700 flex al-center title"><van-icon name="like-o" size="16" style="margin-right: 0.308rem"/>我的收藏</p>
        <div class="like-list" v-if="articleList.length">
            <div v-for="(item, index) in articleList" :key="index">
                <part-item :item="item"></part-item>
            </div>
        </div>
        <div v-else>
            <van-empty description="您还没有收藏的文章呢" />
            <p style="text-align: center" class="fc-primary ">
                <van-button plain type="primary" round  color="#db9e3f" size="small"
                            @click="$router.push({name: 'articleList'})">去看看</van-button>
            </p>
        </div>
    </div>
</template>

<script>
import partItem from "./components/partItem";
export default {
    name: "like",
    data(){
        return{
            list: [],
            articleList: [],
        }
    },
    components: {
        partItem,
    },
    async created() {
        await this.getUserInfo();
    },
    methods: {
        //获取用户数据
        getUserInfo(){
            this.$http.get(`rest/appUserInfo/userPhone/${localStorage.phone}`).then((res)=>{
                this.list = res.data[0].like;
                this.getArticleList();
            });
        },

        //获取所有的文章
        getArticleList(){
            for(let i = 0; i < this.list.length; i++){
                this.$http.get(`rest/articleInfo/${this.list[i].id.split(' ')[0]}Id/${this.list[i].id.split(' ')[1]}`).then((res)=>{
                    if(res.data){
                        res.data.type = this.list[i].id.split(' ')[0];
                        this.articleList.push(res.data);
                    }

                })
            }
        },
    },
}
</script>

<style scoped>
    .mine-like{
        padding: 1.846rem;
    }

    .title{
        margin-bottom: 1.846rem;
    }
</style>