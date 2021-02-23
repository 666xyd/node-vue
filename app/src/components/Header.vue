<template>
    <div class="header bg-primary flex flex-center">
        <template v-for="(item, index) in headerList">
            <div :key="index" class="header-item fc-white">
                {{item.title}}
            </div>
        </template>
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
                        url: ''
                    },
                    {
                        title: '攻略中心',
                        url: '',
                    },
                    {
                        title: '赛事中心',
                        url: '',
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .header{
        height: 3.692rem;
        line-height: 3.692rem;
    }

    .header-item{
        width: 33.3%;
        text-align: center;
    }
</style>