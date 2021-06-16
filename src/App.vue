<template>
        <router-view/>
</template>
<script lang="js">
    import store from "@/store/index2";
    export default {
        data(){
            return {
                store:store
            }
        }
    }
</script>
<style lang="scss">
    @import "~@/assets/style/reset.scss";
    @import "~@/assets/style/helper.scss";

    body {
        line-height: 1.5;
        font-family: $font-hei;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #333;
        font-size: 16px;
        background-color: #f5f5f5;
    }

</style>
