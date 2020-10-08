<template>
  <div class="wrapper" ref="wrapper">
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import echarts, {EChartOption, ECharts} from 'echarts';
import {Component, Prop, Watch} from "vue-property-decorator";

@Component
export default class Chart extends Vue {
  @Prop() options?: EChartOption;
  chart?: ECharts;

  mounted() {
    this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement)
    if (this.options) {
      this.chart.setOption(this.options)
    }
  }

  @Watch('options')
  onOptionsChange(newValue: EChartOption) {
    this.chart!.setOption(newValue)
  }
}
</script>
<style scoped lang="scss">
.wrapper {
  height: 400px;
}
</style>
