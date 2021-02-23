<template>
    <div class="header">
        <van-tabs v-model="activeName" @click="clickTab" title-active-color="white" animated>
            <van-tab  v-for="(item, index) in headerList" :title="item.title" :name="item.url" :key="index"></van-tab>
        </van-tabs>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data(){
            return {
                headerList: [
                    {
                        title: '首页',
                        url: 'index'
                    },
                    {
                        title: '英雄信息',
                        url: 'hero',
                    },
                    {
                        title: '装备信息',
                        url: 'equip',
                    }
                ],
                activeName: 'index',
            }
        },
        components: {

        },
        created() {
            if(this.$route.name.includes('index')){
                this.activeName = 'index';
            }else if(this.$route.name.includes('hero')){
                this.activeName = 'hero';
            }else if(this.$route.name.includes('equip')){
                this.activeName = 'equip';
            }
        },
        methods: {
            clickTab(name,title){
                this.$router.push({name: `${name}`});
            }
        }
    }
</script>

<style scoped>
    .header >>> .van-tab{
        background-color: #db9e3f;
    }

    .header >>> .van-tabs__line{
        background-color: white;
    }
</style>