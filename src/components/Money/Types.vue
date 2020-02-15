<template>
    <ul class="types">
        <li :class="value==='-'&&'selected'" @click="selectType('-')">支出</li>
        <li :class="value==='+'&&'selected'" @click="selectType('+')">收入</li>
    </ul>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop, Watch} from 'vue-property-decorator';

    @Component
    export default  class Types extends Vue{
        @Prop(String) readonly value!:string;
        //@Prop(Number) xxx:number|undefined;
        //Prop 告诉Vue  xxx不是data 是prop
        //Number 告诉Vue xxx运行时是个Number
        // xxx属性名
        //number|undefined 告诉 TS xxx的编译时类型

        selectType(value:string){
            if(value!=='-'&&value!=='+'){
                throw new Error('type is unknown');
            }
            this.$emit('update:value',value)
        }

    }
</script>

<style lang="scss" scoped>

    .types {
        background-color: #c4c4c4;
        display: flex;

        > li {
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