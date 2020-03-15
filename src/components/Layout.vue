<template>
    <div class="layout-wrapper">

        <div class="content" :class="classPrefix && `${classPrefix}-content`">

            <slot/>

        </div>
        <Nav/>
        <div v-if="displayQRcode()" class="mask">
            <span class="tips">温馨提示</span>
            <div class="img-wrapper">
                <img src="/QRcode.png" alt="scan me">
            </div>

            <span class="scanCode">请使用手机扫描二维码</span>
        </div>


    </div>
</template>
<script lang="ts">
    export default {
        props: ['classPrefix'],
        name: 'Layout',
        methods: {
            displayQRcode() {
                return document.documentElement.clientWidth > 500;
            }


        }
    }

</script>

<style lang="scss" scoped>
    .layout-wrapper {

        display: flex;
        flex-direction: column;
        min-height: 100vh;


    }

    .content {

        flex-grow: 1;
        overflow: scroll;
        min-height:calc(100vh - 54px);

    }

    .mask {

        height: 100vh;
        width: 100vw;
        $mask-color: rgba(0, 0, 0, 0.8);
        background-color: $mask-color;

        position: fixed;
        left: 0;
        top: 0;
        color: white;
        display: flex;
        align-items: center;
        flex-direction: column;

        > .img-wrapper {

            img {
                width: 300px;
                height: 300px;

                border-radius: 15px;
                background-color: white;


            }
        }


        > .tips {
            font-size: 30px;
            margin: 160px auto 30px

        }

        > .scanCode {
            margin-top: 16px;
            line-height: 40px;
            border-radius: 20px;
            padding: 0 20px;
            opacity: .7;
            box-shadow: 0 0 0 #555, 0 1px 1px #555, 0 0 0 #555, 0 -1px 1px #282828;
        }


    }


</style>