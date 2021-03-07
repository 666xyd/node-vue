<template>
    <div class="hero-skill">
        <van-grid :gutter="10" square :column-num="4" :icon-size="48" >
            <van-grid-item v-for="(item, index) in skillList" :key="index" :icon="item.icon" :text="item.name"
                           @click="clickTab(item)"/>
        </van-grid>

        <!-- 召唤师技能弹窗 -->
        <skill-detail v-model="popupShow" :skill="detailItem"></skill-detail>
    </div>
</template>

<script>
    import skillDetail from "./components/skillDetail";
    export default {
        name: "heroSkill",
        data(){
            return {
                skillList: [],
                popupShow: false,
                detailItem: {},
            }
        },
        created() {
            this.getSkillList();
        },
        components: {
            skillDetail,
        },
        methods: {
            //获取召唤师技能列表
            getSkillList(){
                this.$http.get('rest/heroSkill').then((res)=>{
                    this.skillList = res.data;
                })
            },

            //点击某一个召唤师技能
            clickTab(item){
                this.popupShow = true;
                this.detailItem = item;
            }
        },


    }
</script>

<style scoped>
    .hero-skill{
        padding: 0.923rem 0;
    }
</style>