<template>
    <div class="header">
        <div class="nameAndImg v-center">
            <Avatar :width="120" :text="name"></Avatar>
            <span class="name">{{name}}</span>
            <i class="el-icon-caret-bottom"></i>
        </div>
    </div>
</template>

<script>
    import Avatar from "./Avatar";
    export default {
        name: "Header",
        components: {
            Avatar,
        },
        data(){
            return {
                name: '许先生',
            }
        }

    }
</script>

<style scoped>
    .header{
        height: 64px;
        line-height: 64px;
        border-bottom: 1px solid #F5F7FA;
        background-color: white;
        box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
        position: relative;
    }

    .nameAndImg{
        position: absolute;
        right: 38px;
        cursor: pointer;
        height: 64px;
    }

    .name{
        font-size: 14px;
        color: #333;
        margin-left: 8px;
    }
</style>