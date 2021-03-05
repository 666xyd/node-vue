<template>
    <div class="hero-info">
        <!-- 英雄简介 -->
        <div class="info-card introduce">
            <!-- 一图识英雄 -->
            <div class="picToAll" @click="clickOnePic">
                <van-icon name="photo-o" size="24" color="#db9e3f"/>
                <span style="line-height: 25px;margin-left: 15px">一图识英雄</span>
            </div>
            <div class="simple-intro">
                <p>{{heroSimple}}<span class="fw-700 fs-xl" style="margin-left: 12px">{{heroInfo.name}}</span></p>
                <p><span v-for="(item, index) in heroInfo.classify" :key="index">{{item}}</span></p>
                <p>
                    <span class="fs-lg">难度</span><span class="score-circle bg-primary fs-xs">{{heroInfo.score}}</span>
                    <span class="fs-lg">技能</span><span class="score-circle bg-blue fs-xs">{{heroInfo.skillPower}}</span>
                    <span class="fs-lg">攻击</span><span class="score-circle bg-red fs-xs">{{heroInfo.attackPower}}</span>
                    <span class="fs-lg">生存</span><span class="score-circle bg-green fs-xs">{{heroInfo.livePower}}</span>
                </p>
            </div>
        </div>

        <!-- 技能介绍 -->
        <div class="info-card">
            <div class="title"><van-icon name="aim"/><span class="title-text">技能介绍</span></div>
            <div class="imgList flex flex-evenly">
                <div class="skillImg"  v-for="(item, index) in heroInfo.skillList" :key="index">
                    <img :src="item.pic" @click="skillClick(item)" :class=" { imgBorder:skillClickItem === item }">
                </div>
            </div>
            <p style="padding: 0 0.923rem">
                <span class="fs-xl fw-700" style="margin-right: 0.462rem">{{skillClickItem.name}}</span>
                <span class="fs-sm fc-grey">(冷却值：{{skillClickItem.consume}}  消耗：{{skillClickItem.cooling}})</span></p>
            <p class="line20">{{skillClickItem.describe}}</p>
        </div>

        <!-- 加点建议 -->
        <div class="info-card">
            <div class="title"><van-icon name="completed"/><span class="title-text">加点建议</span></div>
            <div class="flex">
                <!-- 技能加点 -->
                <div class="add-suggestion flex al-center flex-evenly">
                    <div class="flex-center flex flex-column skill-part">
                        <div class="fs-xl">主升</div>
                        <img :src="mainAdd[0].pic">
                        <div>{{mainAdd[0].name}}</div>
                    </div>
                    <div class="flex-center flex flex-column skill-part">
                        <div class="fs-xl">副升</div>
                        <img :src="secondAdd[0].pic">
                        <div>{{secondAdd[0].name}}</div>
                    </div>
                </div>
                <!-- 召唤师技能 -->
                <div class="hero-skill">
                    <div class="flex flex-column al-center">
                        <div class="fs-xl">召唤师技能</div>
                        <div class="flex flex-evenly" style="width: 100%">
                            <template v-for="(item, index) in heroInfo.heroSkill">
                                <div :key="index" class="flex al-center flex-column">
                                    <img :src="item.split(' ')[1]">
                                    <div>{{item.split(' ')[0]}}</div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- 使用技巧 -->
        <div class="info-card use-skill">
            <div class="title"><van-icon name="info-o" /><span class="title-text">使用技巧</span></div>
            <p class="line20">{{heroInfo.useSkill}}</p>
        </div>

        <!-- 对抗技巧 -->
        <div class="info-card">
            <div class="title"><van-icon name="flag-o" /><span class="title-text">对抗技巧</span></div>
            <p class="line20" >{{heroInfo.fightSkill}}</p>
        </div>

        <!-- 团战思路 -->
        <div class="info-card">
            <div class="title"><van-icon name="warn-o" /><span class="title-text">团战思路</span></div>
            <p class="line20" >{{heroInfo.fightThink}}</p>
        </div>

        <!-- 英雄关系 -->
        <div class="info-card">
            <div class="title"><van-icon name="award-o" /><span class="title-text">英雄关系</span></div>
            <!-- 最佳搭档 -->
            <div class="hero-part">
                <p>最佳搭档</p>
                <div>
                    <template v-for="(item, index) in heroInfo.bestPartner">
                        <div class="hero-relation flex" :key="index">
                            <img :src="item.split(' ')[1]">
                            <p class="line20" style="margin: 0">{{heroInfo.bestPartnerDescribe[index]}}</p>
                        </div>
                    </template>
                </div>
            </div>
            <div class="van-hairline--bottom"></div>

            <!-- 被谁克制 -->
            <div class="hero-part">
                <p style="margin-top: 24px">被谁克制</p>
                <div>
                    <template v-for="(item, index) in heroInfo.restrainBy">
                        <div class="hero-relation flex" :key="index">
                            <img :src="item.split(' ')[1]">
                            <p class="line20" style="margin: 0">{{heroInfo.restrainByDescribe[index]}}</p>
                        </div>
                    </template>
                </div>
            </div>
            <div class="van-hairline--bottom"></div>

            <!-- 克制谁 -->
            <div class="hero-part">
                <p style="margin-top: 24px">克制谁</p>
                <div>
                    <template v-for="(item, index) in heroInfo.restrainTo">
                        <div class="hero-relation flex" :key="index">
                            <img :src="item.split(' ')[1]">
                            <p class="line20" style="margin: 0">{{heroInfo.restrainToDescribe[index]}}</p>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "heroMain",
        data(){
            return {
                heroSimple: '',
                skillClickItem: {},
                mainAdd: [{pic: ''}],
                secondAdd: [{pic: ''}],
            }
        },
        components: {

        },
        created() {
            //让分数圆圈进入
            this.transformP();
        },
        watch: {
            skinList(newValue){
                this.heroSimple = newValue[0].skin;
            },
            heroInfo(newValue){
                //模拟点击第一个技能
                this.skillClick(newValue.skillList[0]);
                this.mainAdd = this.heroInfo.skillList.filter(item => item.name === this.heroInfo.mainAdd);
                this.secondAdd = this.heroInfo.skillList.filter(item => item.name === this.heroInfo.secondAdd);
                window.console.log(this.mainAdd, this.secondAdd);
            }
        },
        props: {
            heroInfo: {
                type: Object,
                default: () => {
                    return {

                    }
                }
            },
            skinList: {
                type: Array,
            },
        },
        methods: {
            clickOnePic(){
                this.$emit('clickOnePic');
            },

            transformP(){
                this.$nextTick(()=>{
                    let intro = document.getElementsByClassName('simple-intro')[0];
                    let allPs = intro.getElementsByTagName('p');
                    for(let i = 0 ; i < allPs.length; i++){
                        allPs[i].style.transform = 'translateX(0)';
                    }
                })
            },

            skillClick(item){
                this.skillClickItem = item;
            },
        }

    }
</script>

<style scoped>

    .info-card{
        background-color: white;
        padding: 0.769rem 0.923rem;
        border-top: 1px solid #e9e9e9;
        margin-bottom: 0.769rem;
    }

    .introduce{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .line20{
        color: #343440;
        line-height: 1.538rem;
        padding: 0 0.923rem
    }

    .simple-intro p{
        margin: 0.462rem 0 0 0;
        transition: 1.5s;
        transform: translateX(-100vw);
    }

    .simple-intro p:nth-child(2){
        transition: 1.5s 0.5s;
    }

    .simple-intro p:nth-child(3){
        transition: 1.5s 0.8s;
    }

    .simple-intro{
        text-align: center;
        border: 1px solid #e9e9e9;
        padding: 0.923rem 1.846rem;
        margin-top: 0.923rem;
        border-radius: 1.846rem;
    }

    .picToAll{
        border: 1px solid #e9e9e9;
        border-radius: 0.923rem;
        width: fit-content;
        padding: 0.615rem 3.231rem;
        display: flex;
        align-content: center;
    }

    .score-circle{
        padding: 0.154rem 0.462rem;
        border-radius: 50%;
        color: white;
        margin: 0 8px 0 2px;
    }

    .title{
        font-weight: 700;
        font-size: 16px;
        color: #db9e3f;
        display: flex;
        align-items: center;
        margin-bottom: 0.923rem;
    }

    .skillImg img{
        width: 4.615rem;
    }

    .imgBorder{
        border: 1px solid #db9e3f;
        border-radius: 50%;
        padding: 0.154rem;
        width: 4.615rem;
    }

    .title-text{
        margin-left: 0.308rem;
    }

    .add-suggestion, .hero-skill{
        width: 50%;
    }

    .skill-part img, .hero-skill img{
        width: 4.615rem;
        margin: 0.769rem 0 0.462rem;
    }

    .hero-skill img{
        border-radius: 50%;
    }

    .hero-relation img{
        width: 4.615rem;
        height: 4.615rem;
    }

    .hero-part{
        margin-bottom: 0.923rem;
    }
</style>