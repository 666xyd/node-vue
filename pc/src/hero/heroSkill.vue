<template>
    <div class="hero-skill initMain">
        <div class="list-form al-center">
            <add-button title="新增技能" @add="addSkill"></add-button>
            <Search title="搜索召唤师技能名称" @search="search" v-model="searchText"></Search>
        </div>
        <div class="skill-list" v-if="skillList.length">
            <!-- 左侧技能图标 -->
            <div class="list-left">
                <template v-for="(item, index) in skillList">
                    <div :key="index" class="skillItem">
                        <img :src="item.icon" class="icon" @click="iconClick(item)" :class="clickItem === item ? 'icon-click' : ''">
                        <div class="fz14" :class="clickItem === item ? 'name-click' : ''">{{item.name}}</div>
                    </div>
                </template>
            </div>

            <!-- 右侧技能效果 -->
            <div class="list-right">
                <img :src="rightImg">
                <p style="color: #00c191">{{this.clickItem.name}}</p>
                <p style="color: #999999; margin: 12px 0 24px" class="fz14">LV.{{this.clickItem.level}}级解锁</p>
                <div style="height:75px; margin-bottom: 12px">
                    <p class="fz14">{{this.clickItem.describe}}</p>
                    <div style="margin-top: 12px">
                        <el-button type="primary" @click="editSkill">编辑</el-button>
                        <el-button type="primary" @click="deleteSkill">删除</el-button>
                    </div>
                </div>

            </div>
        </div>
        <div v-else class="empty">暂无该召唤师技能</div>
        <skill-new v-model="popupShow" v-if="popupShow" @success="success" :is-edit="isEdit" :edit-item="clickItem"></skill-new>
    </div>
</template>

<script>
    import AddButton from "../components/AddButton";
    import Search from "../components/Search";
    import skillNew from "./components/skillNew";
    export default {
        name: "heroSkill",
        components: {
            AddButton,
            Search,
            skillNew,
        },
        data(){
            return{
                popupShow: false,
                skillList: [],
                rightImg: '',
                clickItem: {},
                isEdit: false,
                searchText: '',
            }
        },
        async created() {
           this.getSkillList();
        },
        methods: {
            addSkill(){
                this.popupShow = true;
                this.isEdit = false;
            },

            //获取召唤师技能列表
            getSkillList(){
                this.$http.get('rest/heroSkill').then((res)=>{
                    this.skillList = res.data;
                    this.clickItem = this.skillList[0];
                    this.rightImg = this.skillList[0].pic;
                })
            },

            search(){
                if(this.searchText){
                    this.$http.get(`rest/heroSkill/heroSkill/${this.searchText}`).then((res)=>{
                        this.skillList = res.data;
                        if(this.skillList.length){
                            this.clickItem = this.skillList[0];
                            this.rightImg = this.skillList[0].pic;
                        }
                    })
                }else{
                    this.getSkillList();
                }

            },

            //成功新增召唤师技能
            success(){
                this.getSkillList();
            },

            //点击图标显示右侧的图片
            iconClick(item){
                this.clickItem = item;
                this.rightImg = item.pic;
            },

            //编辑
            editSkill(){
                this.popupShow = true;
                this.isEdit = true;
            },

            //删除
            deleteSkill(){
                this.$confirm(`是否删除技能--${this.clickItem.name}?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( () => {
                    this.$http.delete(`rest/heroSkill/${this.clickItem._id}`);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getSkillList();
                })
            },
        },
    }
</script>

<style scoped>

    .skill-list{
        display: flex;
        justify-content: flex-start;
        margin-top: 20px;
    }

    .list-left, .list-right{
        width: 50%;
        padding: 20px;
    }

    .list-left{
        display: grid;
        grid-template-columns: repeat(5 ,1fr);
    }

    .icon{
        width: 80px;
        border-radius: 8px 0 8px 0;
        border: 2px solid #409eff;
        cursor: pointer;
    }

    .icon-click{
        border: 2px solid #00c191!important;
    }

    .name-click{
        color: #00c191;
    }

    .skillItem{
        text-align: center;
    }

    .empty{
        margin-top: 20px;
        background-color: #F5F7FA;
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
    }
</style>