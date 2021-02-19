<template>
    <div class="initMain setting">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="英雄获取方式" name="first">
                <setting-hero-get></setting-hero-get>
            </el-tab-pane>
            <el-tab-pane label="皮肤获取方式" name="second">
                <setting-skin-get></setting-skin-get>
            </el-tab-pane>
            <el-tab-pane label="皮肤性质" name="third">
                <setting-skin-character></setting-skin-character>
            </el-tab-pane>
            <el-tab-pane label="装备分类" name="fourth">
                <setting-equipment></setting-equipment>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import settingHeroGet from "./components/settingHeroGet";
    import settingSkinGet from "./components/settingSkinGet";
    import settingSkinCharacter from "./components/settingSkinCharacter";
    import settingEquipment from "./components/settingEquipment";
    export default {
        name: "settingClassify",
        data(){
            return{
                activeName: 'first',
            }
        },
        components: {
            settingHeroGet,
            settingSkinGet,
            settingSkinCharacter,
            settingEquipment
        },
        created() {

        },
        methods: {
            handleClick(tab) {

            }
        },
    }
</script>

<style scoped>

    .setting >>> .el-tabs__item.is-active {
        color: #00c191;
    }

    .setting >>> .el-tabs__active-bar{
        background-color: #00c191;
    }

    .setting >>> .el-tabs__item:hover{
        color: #00c191;
    }
</style>