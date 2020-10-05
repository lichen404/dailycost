<template>
    <div>
        <layout>
            <Tabs :data-source="dataSource" :value.sync="type" class-prefix="type"></Tabs>
            <div class="tagList">
              <router-link :to="`/labels/edit/${tag.id}`" class="tag" v-for="tag in (type==='-'?consumeTags:incomeTags)"
                           :key="tag.id"><span>{{ tag.name }}</span>
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
import Tabs from "@/components/Tabs.vue";
import recordTypeList from '@/constant/recordTypeList'

@Component({
  components: {Button, Tabs},
  mixins: [tagHelper],
  computed: {
    consumeTags() {
      return store.state.consumeTagList;
    },
    incomeTags() {
      return store.state.incomeTagList;
    }
  }

    })
    export default class Labels extends Vue {
  dataSource = recordTypeList
  type = '-'

  beforeCreate() {
    this.$store.commit('fetchTags');

  }

  created() {
      if(this.$route.query.type){
          this.type = this.$route.query.type === 'consume' ? '-' : '+'
      }

  }


}
</script>
<style lang="scss" scoped>
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

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}

::v-deep {
  .type-tabs-item {
    background-color: #c4c4c4;

    &.selected {
      background-color: #767676;

      &::after {
        display: none;
      }
    }

  }

  .interval-tabs-item {
    height: 48px;
  }
}
</style>

