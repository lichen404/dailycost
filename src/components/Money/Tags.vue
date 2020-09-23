<template>
    <div class="tags">

        <ul class="current" v-if="value==='-'">
            <li v-for="tag in consumeTagList" :key="tag.id"  @click="toggle(tag)" class="item">
                <Icon :name="tag.iconName" :class="{selected:selectedTags.indexOf(tag)===0}"/>
                <span>{{tag.name}}</span>
            </li>
            <li class="item" @click="createTag('consume')">
              <Icon name="add"/>
              <span>新增</span>
            </li>
        </ul>
      <ul class="current" v-else>
        <li v-for="tag in incomeTagList" :key="tag.id" @click="toggle(tag)" class="item">
          <Icon :name="tag.iconName" :class="{selected:selectedTags.indexOf(tag)===0}"/>
          <span>{{ tag.name }}</span>
        </li>
        <li class="item" @click="createTag('income')">
          <Icon name="add"/>
          <span>新增</span>
        </li>
      </ul>



    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component, Prop, Watch} from "vue-property-decorator";
    import store from '@/store/index';
    import TagHelper from "@/mixins/createTag";
    @Component(
        {
            mixins:[TagHelper],
            computed:{
                consumeTagList(){
                    return store.state.consumeTagList;
                },
                incomeTagList(){
                    return store.state.incomeTagList;
                }
            },
        }
    )
    export default class Tags extends Vue{
        @Prop(String) readonly value!:string;

        selectedTags:Tag[] =[];


        created() {

          this.$store.commit('fetchTags');


        }


        toggle(tag:Tag){
            const index = this.selectedTags.indexOf(tag);
            if(this.selectedTags.length===1){
                this.selectedTags.splice(index,1);

            }
            this.selectedTags.push(tag);
            this.$emit('update:value',this.selectedTags)
        }

        }

</script>

<style lang="scss" scoped>
    .tags {
        background-color: white;
        font-size: 14px;
        padding: 20px 16px 0;
        flex-grow: 1;
        display: flex;
        flex-direction: column;


        > .current {
            display: flex;
            flex-wrap: wrap;
            order: 1;


            > li {
                width: 20%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-bottom: 10px;
                .icon{
                    $bg:#d9d9d9;
                    height: 32px;
                    width: 32px;
                    border-radius:50%;
                    border: 5px solid #fff;
                    margin-bottom: 5px;
                    &.selected{
                        background-color:$bg;
                        border-color: $bg;
                    }
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
