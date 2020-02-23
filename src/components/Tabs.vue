<template>
 <ul class="tabs">
     <li  class="tabs-item" v-for="item in dataSource" :key="item.value" @click="select(item)" :class="{[classPrefix+'-tabs-item']:classPrefix,selected:item.value===value}">{{item.text}}</li>
 </ul>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from "vue-property-decorator";

    @Component
    export default class Tabs extends Vue {
        @Prop({required:true,type:Array}) dataSource!:{text:string,value:string}[];
        @Prop(String) readonly value!:string;
        @Prop(String) classPrefix?:string;
        select(item:{text:string,value:string}){
            this.$emit('update:value',item.value);
        }
    }
</script>

<style  lang="scss" scoped>
    .tabs {
        background-color: #c4c4c4;
        display: flex;

     &-item{
        text-align: center;
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 64px;
        position: relative;

    &.selected::after {
         content: '';
         position: absolute;
         bottom: 0;
         left: 0;
         width: 100%;
         height: 4px;
         background-color: #333;
     }
    }
    }
</style>