<template>
    <div>
        <layout>
            <ul class="tagList">
                <li v-for="tag in tags" :key="tag.id"><span>{{tag.name}}</span>
                <Icon name="right"/>
                </li>
            </ul>
            <div class="addTag-wrapper">
                <button class="addTag" @click="createTag">新建标签</button>
            </div>

        </layout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from "vue-property-decorator";
    import tagListModel from "@/models/tagListModel";

    @Component
    export default class Labels extends Vue {
        tags = tagListModel.fetch();
        createTag(){
            const name = window.prompt('请输入标签名');
            if(name){
                try {
                    tagListModel.create(name);
                }catch (e) {
                    console.log(e);
                }

            }
        }
    }
</script>
<style lang="scss">
    .tagList {
        background-color: white;
        font-size: 16px;
        padding-left: 16px;

        > li {
            min-height: 44px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e6e6e6;

            svg {
                color: #666;
                margin-right: 16px;
                width: 24px;
                height: 24px;
            }
        }
    }

    .addTag {
        background-color: #767676;
        color: white;
        border-radius: 4px;
        border: none;
        padding: 0 16px;
        height: 40px;

        &-wrapper {
            text-align: center;
            padding: 16px;
            margin-top: 44-16px;
        }
    }
</style>

