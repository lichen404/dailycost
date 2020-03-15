<template>
    <div class="navBar">
        <Icon class="leftIcon" name="left" @click.native="goBack"/>
        <span class="title"><slot></slot></span>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    @Component
    export default class TopNav extends Vue{
        goBack(){

            this.$router.back();

        }
    }
</script>

<style lang="scss" scoped>
    .navBar {
        text-align: center;
        font-size: 16px;
        padding: 12px 16px;
        background-color: white;
        position: relative;

    > .leftIcon {
        position: absolute;
        left: 16px;
        top: 16px;

    }
    }
</style>