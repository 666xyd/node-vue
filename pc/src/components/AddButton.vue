<template>
    <!-- 新增按钮 -->
    <div>
        <!-- 跳转页面 -->
        <div v-if="url" class="add" :class="{cmb:cmb}" @click="toUrl">
            <img src="https://dxs-pictures.gd2.qingstor.com/pc_image/purchase/plus.svg" alt="">
            <span>{{title}}</span>
        </div>

        <!-- 打开弹窗 -->
        <button v-else class="add" @click="addNew" :class="{cmb:cmb}">
            <img src="https://dxs-pictures.gd2.qingstor.com/pc_image/purchase/plus.svg" alt="">
            <span>{{title}}</span>
        </button>
    </div>
</template>

<script>
    export default {
        name: "Button",
        props: {
            title: String,
            //clear margin-bottom
            cmb: {
                type: Boolean,
                default: false,
            },
            url: {
                type: String,
                default: '',
            }
        },
        methods: {
            addNew() {
                this.$emit("add");
            },
            toUrl(){
                if(this.$route.name === 'pcPrintSetting'){
                    this.getStore('features_open').then((res)=>{
                        let features = res.filter(function (item){
                            return item.includes('打印模版');
                        })
                        if(features.length !== 0){
                            this.$router.push({name: this.url})
                        }else{
                            //没有开通
                            this.$confirm('多个打印模板是属于高级功能，暂未开通~','高级功能',{
                              confirmButtonText: '开通功能', cancelButtonText: '取消', type: 'warning'
                            }).then(()=>{
                              this.$router.push({name: "pcFeaturesOpen", params: {type: '便捷高级功能', title: '多个打印模板'}});
                            }).catch(()=>{});
                        }
                    })
                }else{
                    this.$router.push({name: this.url})
                }
            }
        },
    }
</script>

<style scoped>
    .add {
        background: #00C191;
        border-radius: 4px;
        padding: 6px 15px 6px 14px;
        width: fit-content;
        /*没有display：flex时组件复用的时候会有一个莫名其妙的撑开高度*/
        display: flex;
        align-items: center;
        cursor: pointer;
        outline: none;
        border: none;
    }

    /*清除下边距*/
    .cmb {
        margin-bottom: 0;
    }

    .add:hover {
        background: #00B588;
    }

    .add:active {
        background: #00A87E;
    }

    .add span {
        color: #FFFFFF;
        font-size: 14px;
        margin-left: 5px;
        vertical-align: middle;
    }

    .add span:first-child {
        margin-right: 9px;
    }
</style>
