<template>
    <div class="alarm" v-show="empty">{{text}}</div>
</template>

<script>
    export default {
        name: "AlarmText",
        props:{
            empty:Boolean,
            text:String,
        }
    }
</script>

<style scoped>
    .alarm{
        font-size: 12px;
        color: #F56C6C;
        height: 16px;
        line-height: 16px;
        position: absolute;
    }

</style>
