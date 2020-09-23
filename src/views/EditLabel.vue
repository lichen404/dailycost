<template>
  <layout>
    <TopNav @handleBack="$router.push(`/labels?type=${currentTag.type}`)">编辑标签</TopNav>
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
import {consumeTypeList, incomeTypeList} from "@/constant/tagTypeList";
import TopNav from "@/components/TopNav.vue";

@Component({
  components: {TopNav, Button, FormItem}
})
export default class EditLabel extends Vue {
  get currentTag() {
    return this.$store.state.currentTag;
  }

  created() {
    store.commit('fetchTags');
    const id = this.$route.params.id;
    store.commit('setCurrentTag', id);
    console.log(this.currentTag);
    if (!this.currentTag) {
      this.$router.replace('/404');
    }

  }

  updateTag(name: string) {
    if (this.currentTag) {
      let iconName
      if (this.currentTag.type === 'consume') {
        if (consumeTypeList.indexOf(name) < 0) {
          iconName = '一般'
        } else {
          iconName = name
        }

        this.$store.commit('updateTag', {id: this.currentTag.id, name, iconName, type: 'consume'});

      } else {
        if (incomeTypeList.indexOf(name) < 0) {
          iconName = '其他'
        } else {
          iconName = name
        }
        this.$store.commit('updateTag', {id: this.currentTag.id, name, iconName, type: 'income'});
      }

    }
  }

  remove() {
    if (this.currentTag) {
      store.commit('removeTag', {id: this.currentTag.id, type: this.currentTag.type});
      this.$router.push(`/labels?type=${this.currentTag.type}`);

    }
  }


}
</script>

<style lang="scss" scoped>


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
