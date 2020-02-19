<template>
    <layout>
    <div class="navBar">
        <Icon  class="leftIcon" name="left" @click.native="goBack"/>
        <span class="title">编辑标签</span>
    </div>
        <div class="from-wrapper">
            <form-item :value="tag.name"  @update:value="updateTag" field-name="标签名" placeholder="请输入标签名"/>
        </div>
        <div class="button-wrapper">
            <Button @click="remove">删除标签</Button>
        </div>

    </layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';

    import FormItem from "@/components/Money/FormItem.vue";
    import Button from "@/components/Money/Button.vue";
    import store from "@/store/index2";
    @Component({
        components:{Button, FormItem}
    })
    export default class EditLabel extends Vue {
        tag?:Tag = undefined;
        created() {
            const id = this.$route.params.id;


            const tag = store.findTag(id);
            if(tag){
                this.tag = tag;
            }else {
                this.$router.replace('/404');
            }
        }
        updateTag(name:string){
            if(this.tag){
                store.updateTag(this.tag.id,name);
            }
        }
        remove(){
            if(this.tag){
                  store.removeTag(this.tag.id);
                    this.$router.back();

            }
        }
        goBack(){
            this.$router.back();
        }

    }
</script>

<style lang="scss" scoped>
.navBar{
    text-align: center;
    font-size: 16px;
    padding: 12px 16px;
    background-color: white;
    position: relative;

    >.leftIcon{
        position: absolute;
        left: 16px;
        top:16px;

    }
}
    .from-wrapper{
        margin-top: 8px;
        background-color:white;
    }
    .button-wrapper{
        text-align: center;
        padding: 16px;
        margin-top: 44-16px;
    }
</style>