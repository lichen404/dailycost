<template>
    <label class="notes">
        <span class="name">备注</span>
        <input type="text" placeholder="请在这里添加备注" v-model="value">
    </label>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from "vue-property-decorator";
    @Component
    export  default  class Notes extends  Vue{
        value = '';

    }

</script>

<style lang="scss" scoped>
    .notes {


        background-color: #f5f5f5;
        font-size: 14px;
        display: flex;
        align-items: center;
        padding-left: 16px;

        > input {
            border: none;
            height: 64px;
            margin-left: 10px;
            background-color: inherit;
            flex-grow: 1;
            padding-right: 16px;
        }

        .name {
            padding-right: 16px;

        }
    }
</style>