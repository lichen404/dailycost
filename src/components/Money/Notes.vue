<template>
    <label class="notes">
        <span class="name">{{this.fieldName}}</span>
        <input type="text" :placeholder="this.placeholder" v-model="value">
    </label>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Watch, Prop} from "vue-property-decorator";

    @Component
    export default class Notes extends Vue {
        value = '';
        @Prop({required:true}) fieldName!:string;
        @Prop(String)placeholder?:string;
        @Watch('value')
        onValueChanged(value: string) {
            this.$emit('update:value', value);
        }

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