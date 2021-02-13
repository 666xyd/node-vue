<template>
    <div class="path">
        <div class="title">{{pathList[pathList.length - 1]}}</div>
        <p class="tip">{{text}}</p>
    </div>
</template>

<script>
    import bread from "../bread";
    export default {
        name: "pathHeader",
        data() {
            return {
                pathList: ["1"],
                text: ""
            }
        },
        watch: {
            "$route"(){
                this.showPath();
            }
        },
        created() {
            this.showPath();
        },
        methods: {
            showPath() {
                let desc = bread[this.$route.name];
                if(desc){
                    this.pathList = desc.title.split('/');
                    this.text = desc.text;
                }
            },
        }
    }
</script>

<style scoped>
    .path{
        padding: 12px 24px;
        background-color: white;
    }

    .title {
        font-size: 18px;
        color: #000000;
        font-weight: 700;
        opacity: .85;
        margin: 10px 0 4px;
    }

    .tip {
        font-size: 12px;
        color: #999999;
    }
</style>