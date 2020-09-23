<template>
  <div>
    <div class="wrapper">
      <Icon name="not-found"/>

      <span class="text">当前页面不存在，请检查网址是否正确</span>
      <router-link to="/">返回首页</router-link>
    </div>


  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from "vue-property-decorator";
import Icon from "@/components/Icon.vue";

@Component({
  components: {Icon}
})
export default class Notfound extends Vue {


}
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > .icon {
    height: 64px;
    width: 64px;
  }

  > .text {
    margin-top: 5px;
    margin-bottom: 5px;
  }
}

a {
  text-decoration: underline;
  color: #0084ff;
}
</style>
