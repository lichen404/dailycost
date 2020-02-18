<template>
    <div class="tags">

        <ul class="current">
            <li v-for="tag in dataSource" :key="tag.id" :class="{selected:selectedTags.indexOf(tag)>=0}" @click="toggle(tag)">{{tag.name}}</li>
        </ul>
        <div class="newTag">
            <button @click="create">新增标签</button>
        </div>

    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component, Prop} from "vue-property-decorator";
    @Component
    export default class Tags extends Vue{
        @Prop(Array) readonly dataSource:string[]|undefined;
        selectedTags:string[] =[];

        toggle(tag:string){
            const index = this.selectedTags.indexOf(tag);
            if(index>=0) {
                this.selectedTags.splice(index,1);
            }else{
                this.selectedTags.push(tag);
            }
            this.$emit('update:value',this.selectedTags)
        }
        create(){
            const name = window.prompt('请输入标签名');
            if(!name){
                window.alert('标签名不能为空')
            }
            else{
                if(this.dataSource){
                    this.$emit('update:dataSource',[...this.dataSource,name]) // 不要修改外部参数

                }
                }
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