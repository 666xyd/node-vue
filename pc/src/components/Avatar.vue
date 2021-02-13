<template>
    <div class="avatar" :class="{background:!portrait}" :style="{height: width * 0.02 +'rem',width: width * 0.02 +'rem'}">
        <img class="avatar-img" v-if="portrait" :src="portrait" alt="">
        <template v-else>
            <img class="avatar-bg" :class="{avatarBg:opacity}"
                 :style="{height: width * 0.02 +'rem',width: width * 0.02 +'rem'}" :src="avatar">
            <span class="avatar-text" :style="{fontSize:font + 'px'}">{{text[0]}}</span>
        </template>
    </div>
</template>

<script>
    export default {
        name: "Avatar",
        data() {
            return {}
        },
        props: {
            portrait: {
                type: [String, Boolean],
            },
            text: {
                type: String,
                default: ""
            },
            width: {
                type: Number,
                default: 40
            },
            font: {
                type: Number,
                default: 20
            },
            avatar: {
                type: String,
                default: 'https://dxs-pictures.gd2.qingstor.com/image/collection/warehouse.gif'
            },
            opacity:{
                type:Boolean,
                default:true
            }
        }
    }
</script>

<style scoped>
    .avatar {
        position: relative;
        z-index: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50% !important;
        overflow: hidden;
        color: #fff;
        font-size: 60px;
        font-weight: bold;
        /*去掉阴影*/
        /*box-shadow:0 8px 8px 2px rgba(0,193,145,0.2);*/
    }

    .avatar.background {
        background: linear-gradient(45deg, rgba(0, 193, 145, 1), rgba(27, 169, 186, 0.8));
    }

    .avatar-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .avatar-bg {
        position: absolute;
    }

    .avatarBg {
        opacity: 0.3;
    }

    .avatar-text {
        z-index: 1;
    }
</style>
