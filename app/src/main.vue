<template>
    <div class="main">
        <Header></Header>
        <transition :name="transitionName">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import './app.public.css';
    import Header from "./components/Header";
    export default {
        name: "wap",
        components: {
            Header
        },
        data(){
            return{
                transitionName: '',
            }
        },
        watch: {
            $route(to, from){
                if(to.meta.index > from.meta.index){
                    //设置动画名称
                    this.transitionName = 'slide-left';
                }else{
                    this.transitionName = 'slide-right';
                }
            }
        }
    }
</script>

<style scoped>

</style>