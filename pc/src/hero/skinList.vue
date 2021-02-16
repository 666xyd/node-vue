<template>
    <div class="skin-list initMain">
        <div class="list-content">
            <div class="list-form al-center">
                <AddButton title="新增皮肤" :cmb="false" @add="add"></AddButton>
                <Search title="搜索皮肤名称/英雄名称" @search="search" v-model="searchText"></Search>
            </div>
        </div>

        <!-- 英雄分类及皮肤列表 -->
        <div class="list-main flex">
            <!-- 左侧英雄分类 -->
            <div class="classify">
                <div class="hero-type">
                    <div class="hero-type-title">英雄分类</div>
                    <div style="overflow: hidden">
                        <transition name="fade">
                            <!-- 树形控件 -->
                            <el-tree ref="elTree" node-key="id" :data="heroTypeList" :props="defaultProps"
                                     @node-click="handleNodeClick"></el-tree>
                        </transition>
                    </div>
                </div>
                <div style="width: 156px; text-align: center; margin-top: 12px" v-show="toTopShow">
                    <div class="toTop" @click="toTop">
                        <i class="el-icon-top" style="color: #999999"></i>
                    </div>
                </div>
            </div>

            <!-- 右侧皮肤列表 -->
            <div style="height: calc(100% - 60px);overflow-y: auto; margin-right: -20px;" ref="scroll">
                <div class="list">
                    <template v-for="(item, index) in skinList">
                        <div :key="index" class="skinInfo">
                            <img :src="item.pic">
                            <div class="skinName">
                                {{item.skin}}
                            </div>
                            <div class="operation">
                                <el-button icon="el-icon-edit-outline" size="small" round type="success" plain @click="toEdit(item)">编辑</el-button>
                                <el-button icon="el-icon-paperclip" size="small" round type="success" plain>详情</el-button>
                                <el-button icon="el-icon-delete" size="small" round type="success" plain @click="deleteSkin(item)">删除</el-button>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AddButton from "../components/AddButton";
    import Search from "../components/Search";
    export default {
        name: "skinList",
        components: {
            AddButton,
            Search,
        },
        data(){
            return {
                heroTypeList: [{name: "全部", id: 0}],
                skinList: [],
                defaultProps: {children: 'child', label: 'name'},                        //树形选择器
                popupShow: false,                                                        //分类弹窗是否显示
                heroList: [],         //英雄列表
                id: null,
                params: {
                    category_id: 0,
                },
                page_count: this.$store.state.per_num,   //每页数据条数
                page: 1,     //页码
                searchText: '',      //搜索框内容
                toTopShow: false,     //判断回到顶部是否显示
            }
        },
        created() {
            this.getSkinList();
            this.getClassifyList();
        },

        mounted() {
            //监听皮肤列表滚动
            this.$refs.scroll.addEventListener("scroll", this.handleScroll);
        },

        methods: {
            add(){
                this.$router.push({name: 'skinNew'});
            },

           search(){
               //这里需要nexttick，不用的话点清空搜索内容时，仍然停留在搜索内容的结果
               this.$nextTick(()=>{
                   if(this.searchText){
                       //有输入内容
                       this.$http.get(`rest/skinInfo/skinName/${this.searchText}`).then((res)=>{
                           this.skinList = res.data;
                           this.getClassifyList(); //这一步的目的主要是为了让树形回到‘全部’
                       })
                   }else{
                       //内容清空
                       this.getSkinList();
                   }
               })

            },

            //获取分类列表
            getClassifyList(){
                this.$http.get('rest/heroCategories').then((res)=>{
                    this.heroTypeList = [{name: "全部", id: 0}];
                    for(let i = 0 ; i < res.data.length; i++){
                        this.heroTypeList.push({name: res.data[i].classify, id: i + 1});
                    }
                    this.$nextTick(() => {
                        this.$refs.elTree && this.$refs.elTree.setCurrentKey(this.params.category_id)
                    })
                })
            },

            //获取皮肤列表
            getSkinList(){
                this.$http.get('rest/skinInfo').then((res)=>{
                    this.skinList = res.data;
                })
            },

            //点击树形控件
            handleNodeClick(val) {
                this.searchText = '';
                window.console.log(val);
                if(val.id === 0){
                    //点击的是'全部'
                    this.getSkinList()
                }else {
                    this.$http(`rest/skinInfo/classify/${val.name}`).then((res)=>{
                        this.skinList = res.data;
                    })
                }
            },

            //监听滚动事件
            handleScroll(){
                let scroll = this.$refs.scroll.scrollTop;
                if(scroll > 200){
                    this.toTopShow = true;
                }else{
                    this.toTopShow = false;
                }

            },

            //回到顶部
            toTop(){
                this.$refs.scroll.scrollTop = 0;
                this.toTopShow = false;
            },

            //编辑皮肤
            toEdit(item){
                this.$router.push({name: 'skinEdit', params: {id: item._id}});
            },

            //删除皮肤
            deleteSkin(row){
                this.$confirm(`是否删除皮肤--${row.skin}?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await this.$http.delete(`rest/skinInfo/${row._id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getSkinList();
                })
            },
        }
    }
</script>

<style scoped>
    .list-form{
        margin-bottom: 20px;
    }

    /*商品分类*/
    .classify{
        min-width: 156px;
        width: 156px;
        overflow: hidden;
        margin-right: 20px;
        margin-bottom: 18px;
    }

    .hero-type {
        width: 156px;
        overflow-x: hidden;
        overflow-y: auto;
        /*隐藏滚动条*/
        margin-right: -40px;
        padding-bottom: 24px;
        box-sizing: border-box;
        background: #F5F7FA;
        border-radius: 4px 4px 0 0;
    }

    /*隐藏时的样式*/
    .fade-enter, .fade-leave-to {
        transform: translate3d(0, -2rem, 0);
    }

    .hero-type-title {
        width: 100%;
        color: #333;
        font-size: 14px;
        font-weight: bold;
        background: #F5F7FA;
        padding: 17px 16px;
        position: sticky;
        top: 0;
        z-index: 10;
    }

    .list-main{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .skin-list{
        height: calc(100% - 180px);
    }

    /*树形控件*/
    .skin-list >>> .el-tree {
        background: #F5F7FA;
    }

    .skin-list >>> .el-tree-node {
        white-space: normal;
    }

    .skin-list >>> .el-tree-node__content {
        height: auto;
        padding: 10px 8px;
    }

    .skin-list >>> .el-tree-node__content:hover {
        background: #FFF;
        color: #00C191;
        font-weight: bold;
    }

    .skin-list >>> .el-tree .is-current {
        color: #00C191;
        font-weight: bold;
    }

    .skin-list >>> .el-tree-node__expand-icon {
        padding: 0 6px 0 3px;
    }

    .list{
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: 20px;
        grid-row-gap: 28px;
    }

    .skinInfo{
        border-radius: 4px;
        overflow: hidden;
        cursor: pointer;
        position: relative;
    }

    .skinInfo img{
        width: 100%;
        height: 100%;
        border-radius: 4px;
        opacity: 1;
        transform: scale(1);
        transition: all 0.6s;
    }

    .operation{
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: rgba(192, 192, 192, 0.6);
        width: 100%;
        padding: 12px;
        text-align: center;
        transform: translateY(100%);
        transition: all 0.6s;
    }

    .skinName{
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        transform: translateY(-100%);
        font-size: 32px;
        font-weight: bold;
        text-align: center;
        color: #666666;
        transition: 0.6s 0.3s;
    }

    .skinInfo:hover img{
        opacity: 0.5;
        transform: scale(1.1);
    }

    .skinInfo:hover .operation{
        transform: translateY(0);
    }

    .skinInfo:hover .skinName{
        transform: translateY(100%);
    }

    .toTop{
        width: 30px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #999999;
        border-radius: 50%;
        text-align: center;
        cursor: pointer;
        display: inline-block;
    }

    .toTop:hover{
        background-color: rgba(192, 192, 192, 0.1);
    }
</style>