<template>
    <div class="hero-detail initMain">
        <div class="skin-card" ref="card">
            <el-carousel indicator-position="outside" :height="imgWidth">
                <el-carousel-item v-for="item in skinImg" :key="item.id">
                    <img :src="item.pic">
                </el-carousel-item>
            </el-carousel>
        </div>

    </div>
</template>

<script>
    export default {
        name: "heroDetail",
        data(){
            return{
                hero: '',
                skin: [],
                skinImg: [],
                imgWidth: null,
            }
        },
        components: {

        },
        async created() {
            //英雄信息
            let hero = await this.$http.get(`rest/heroInfo/heroId/${this.$route.params.id}`);
            //皮肤信息
            let skin = await this.$http.get(`rest/skinInfo/findByHeroName/${this.$route.params.name}`);
            this.hero = hero.data;
            this.skin = skin.data;
            for(let i = 0; i < this.skin.length; i++){
                this.skinImg.push({pic: this.skin[i].pic, id: i});
            }
            this.imgWidth = (this.$refs.card.scrollWidth / 1920 * 880).toString();
            let card = document.getElementsByClassName('el-carousel__container')[0];
            card.style.height = this.imgWidth + 'px';
        },
        methods: {

        },
    }
</script>

<style scoped>
</style>