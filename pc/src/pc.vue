<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'pc',
}
</script>


<style>
    /*全局变量*/
    html {
        background-color: #f6f6f6;
        color: #333;
        z-index: -1;
    }

    #app{
        height: 100%;
    }
</style>