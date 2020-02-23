<template>
    <div>
        <layout>
            <div class="tagList">
                <router-link :to="`/labels/edit/${tag.id}`" class="tag" v-for="tag in tags" :key="tag.id"><span>{{tag.name}}</span>
                    <Icon name="right"/>
                </router-link>
            </div>
            <div class="addTag-wrapper">
                <Button class="addTag" @click="createTag">新建标签</Button>
            </div>

        </layout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from "vue-property-decorator";
    import Button from "@/components/Money/Button.vue";
    import store from "@/store/index";
    import tagHelper from "@/mixins/createTag"

    @Component({
        components: {Button},
        mixins:[tagHelper],
        computed: {
            tags() {
                return this.$store.state.tagList;
            }
        }
    })
    export default class Labels extends Vue {
        beforeCreate() {
            store.commit('fetchTags');
        }

    }
</script>
<style lang="scss">
    .tagList {
        background-color: white;
        font-size: 16px;
        padding-left: 16px;

        > .tag {
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

