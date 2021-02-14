<template>
    <div class="save-button">
        <!-- 取消 -->
        <span v-if="closeShow">
            <router-link v-if="urlC" :to="{name: urlC}">
                <el-button>{{textC}}</el-button>
            </router-link>
            <el-button @click="closeListShow" v-else>{{textC}}</el-button>
        </span>
        <!-- 保存 -->
        <span v-if="saveShow" style="margin-left: 10px">
            <router-link v-if="url" :to="{name: url,params: id}">
                <el-button type="primary">{{textS}}</el-button>
            </router-link>
            <el-button type="primary" @click="saveInfo" v-else>{{textS}}</el-button>
        </span>
    </div>

</template>

<script>
    export default {
        name: "SaveButton",
        props: {
            textC: String,
            textS: String,
            closeShow: {
                type: Boolean,
                default: true,
            },
            saveShow: {
                type: Boolean,
                default: true,
            },
            urlC: {
                type: String,
                default: '',
            },
            url: {
                type: String,
                default: '',
            },
            id: {
                type: [Number,String],
                default: null,
            }
        },
        methods: {
            closeListShow() {
                this.$emit('close');
            },
            saveInfo() {
                this.$emit('save');
            }
        },
    }
</script>

<style scoped>
    .save-button {
        font-size: 14px;
    }

    .el-button {
        width: 68px;
        height: 36px;
        padding: 0;
    }
</style>
