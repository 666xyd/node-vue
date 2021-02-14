<template>
    <!-- 登录按钮 -->
    <el-button :class="disabled?'button-disabled':''" @click="submit">{{title}}</el-button>
</template>

<script>
    export default {
        name: "SubmitButton",
        props: {
            title: {
                type: String,
                default: "登录"
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        methods:{
            submit(){
                this.$emit('submit');
            }
        }
    }
</script>

<style scoped>
    .el-button {
        width: 340px;
        padding: 12px 145px 14px 147px;
        color: #FFF!important;
        font-size: 20px;
        border: none;
        border-radius: 24px;
        box-shadow: 0 5px 11px rgba(26, 166, 179, 0.41);
        background: linear-gradient(to right, #1BA9BA 0%, #00C191 100%) !important;
    }

    .button-disabled {
        opacity: 0.5;
    }
</style>