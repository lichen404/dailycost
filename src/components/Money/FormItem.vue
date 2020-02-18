<template>
    <label class="formItem">
        <span class="name">{{this.fieldName}}</span>
        <input type="text" :placeholder="placeholder" @input="onValueChanged($event.target.value)" v-model="value">
    </label>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Watch, Prop} from "vue-property-decorator";

    @Component
    export default class FormItem extends Vue {
        value = '';
        @Prop({required:true}) readonly fieldName!:string;
        @Prop(String)placeholder?:string;

        onValueChanged(value: string) {
            this.$emit('update:value', value);
        }

    }

</script>

<style lang="scss" scoped>
    .formItem {



        font-size: 14px;
        display: flex;
        align-items: center;
        padding-left: 16px;

        > input {
            border: none;
            height: 40px;
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