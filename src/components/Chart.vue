<template>
  <div class="wrapper" ref="wrapper">

  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import echarts, {EChartOption} from 'echarts';
import {Component, Prop} from "vue-property-decorator";

@Component
export default class Chart extends Vue {
  @Prop() options: EChartOption

  mounted() {
    const chart = echarts.init(this.$refs.wrapper)
    chart.setOption(this.options)
  }
}
</script>
<style scoped lang="scss">
.wrapper {
  height: 400px;
}
</style>
