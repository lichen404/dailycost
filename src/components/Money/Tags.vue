<template>
    <div class="tags">

        <ul class="current">
            <li v-for="tag in tagList" :key="tag.id" :class="{selected:selectedTags.indexOf(tag)>=0}" @click="toggle(tag)">{{tag.name}}</li>
        </ul>
        <div class="newTag">
            <button @click="createTag">新增标签</button>
        </div>

    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    import store from '@/store/index';
    import TagHelper from "@/mixins/createTag";
    @Component(
        {
            mixins:[TagHelper],
            computed:{
                tagList(){
                    return store.state.tagList;
                }
            }
        }
    )
    export default class Tags extends Vue{

        selectedTags:Tag[] =[];

        created(){
            this.$store.commit('fetchTags');
        }

        toggle(tag:Tag){
            const index = this.selectedTags.indexOf(tag);
            if(index>=0) {
                this.selectedTags.splice(index,1);
            }else{
                this.selectedTags.push(tag);
            }
            this.$emit('update:value',this.selectedTags)
        }

        }

</script>

<style lang="scss" scoped>
    .tags {
        background-color: white;
        font-size: 14px;
        padding: 16px;
        flex-grow: 1;
        display: flex;
        flex-direction: column-reverse;

        > .current {
            display: flex;
            flex-wrap: wrap;
            order: 1;


            > li {
                $bg:#d9d9d9;
                background-color:$bg;
                border-radius: (24px/2);
                height: 24px;
                padding: 0 16px;
                margin-right: 12px;
                line-height: 24px;
                &.selected{
                    background-color: darken($bg,30%);
                }
            }
        }

        > .newTag {
            padding-top: 16px;


            button {
                background: transparent;
                border: none;
                color: #999;
                border-bottom: 1px solid;
                padding: 0 3px;
            }
        }
    }


</style>