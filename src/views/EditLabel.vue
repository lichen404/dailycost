<template>
    <layout>
        <div class="navBar">
            <Icon class="leftIcon" name="left" @click.native="goBack"/>
            <span class="title">编辑标签</span>
        </div>
        <div class="from-wrapper">
            <form-item :value="currentTag.name" @update:value="updateTag" field-name="标签名" placeholder="请输入标签名"/>
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
    import store from "@/store/index";

    @Component({
        components: {Button, FormItem}
    })
    export default class EditLabel extends Vue {
        get currentTag() {
            return this.$store.state.currentTag;
        }

        created() {
            store.commit('fetchTags');
            const id = this.$route.params.id;
            store.commit('setCurrentTag', id);
            if (!this.currentTag) {
                this.$router.replace('/404');
            }

        }

        updateTag(name: string) {
            if (this.currentTag) {
                this.$store.commit('updateTag', {id: this.currentTag.id, name});
            }
        }

        remove() {
            if (this.currentTag) {
                store.commit('removeTag', this.currentTag.id);
                this.$router.back();

            }
        }

        goBack() {
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

    .from-wrapper {
        margin-top: 8px;
        background-color: white;
    }

    .button-wrapper {
        text-align: center;
        padding: 16px;
        margin-top: 44-16px;
    }
</style>