<template>
    <div class="bg-white hero-list">
        <van-tabs v-model="active" animated @click="clickTab">
            <van-tab v-for="(item, index) in classList" :title="item.name" :key="index">
                <van-grid square :column-num="4" :icon-size="48">
                    <van-grid-item v-for="(item, index) in heroList" :key="index" :icon="item.pic[0]" :text="item.name"
                                   @click="clickHero(item)"/>
                </van-grid>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
export default {
    name: "hero",
    data(){
        return {
            classList: [{name: '全部', id: 0}],
            heroList: [],
            active: 0,
        }
    },
    created() {
        this.getHeroList();
        this.getClassifyList();
    },
    methods: {
        //获取英雄列表
        getHeroList(){
            this.$http.get('rest/heroInfo').then((res)=>{
                this.heroList = res.data;
            })
        },

        //获取英雄分类列表
        getClassifyList(){
            this.$http.get('rest/heroCategory').then((res)=>{
                for(let i = 0; i < res.data.length; i++){
                    this.classList.push({name: res.data[i].classify, id: i + 1})
                }
            })
        },

        clickTab(title,name){
            if(title === 0){
                //全部
                this.getHeroList();
            }else{
                //不同分类的不同英雄
                this.$http.get(`rest/heroInfo/classify/${name}`).then((res)=>{
                    this.heroList = res.data;
                })
            }
        },

        clickHero(item){
            this.$router.push({name: 'heroDetail', params: {id: item._id}});
        }
    }
}
</script>

<style scoped>

.hero-list >>> .van-tabs__line{
    background-color: #db9e3f;
}
</style>