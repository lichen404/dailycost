<template>
  <layout>

    <Tabs :data-source="recordTypeList" :value.sync="type" class-prefix="type"/>
    <div>

      <div class="v-chart-wrapper" ref="wrapper">
        <v-chart class="v-chart" :options="type==='-'?getOption('-'):getOption('+')"></v-chart>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Chart from '@/components/Chart.vue';
import dayjs from "dayjs";
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import store from "@/store";

import {Component} from "vue-property-decorator";
import recordTypeList from '@/constant/recordTypeList';
import Tabs from "@/components/Tabs.vue";

@Component({
  components: {'v-chart': Chart, Tabs}
})
export default class Statistics extends Vue {
  recordTypeList = recordTypeList
  type = '-'

  getOption(type: '-' | '+') {
    return {
      grid: {
        left: 10,
        right: 10,
      },
      xAxis: {
        type: 'category',
        data: this.getXDataOrYData('day', type),
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          lineStyle: {
            color: '#666'
          }
        }

      },
      yAxis: {
        type: 'value',
        show: false
      },
      tooltip: {
        show: true,
        triggerOn: 'click',
        position: 'top',
        formatter: '{c}元'
      },
      series: [{
        symbol: 'circle',
        symbolSize: 12,
        itemStyle: {
          borderWidth: 1,
          color: '#666',
          borderColor: '#666'
        },
        data: this.getXDataOrYData('amounts', type),
        type: 'line'
      },]
    }
  }

  beforeCreate() {
    store.commit('fetchRecords');
  }


  mounted() {
    const div = this.$refs.wrapper as HTMLDivElement
    div.scrollLeft = div.scrollWidth
  }


  // 展示最近30天的数据
  getDays() {
    const today = new Date();
    const days = []
    for (let i = 0; i <= 29; i++) {
      days.push(dayjs(today).subtract(i, 'day'))
    }
    return days
  }

  getXDataOrYData(name: string, type: string) {
    const xData = [];
    const days = this.getDays();
    const amounts = [];
    let amount = 0;
    for (let i = 0; i <= days.length - 1; i++) {
      const date = days[i]
      for (let j = 0; j < this.$store.state.recordList.length; j++) {
        if (dayjs(this.$store.state.recordList[j].createAt).isSame(date, 'day')) {
          if (this.$store.state.recordList[j].type === type) {
            amount += this.$store.state.recordList[j].amount;
          }
        }
      }
      xData.push(date.format('MM-DD'));
      amounts.push(amount);
      amount = 0;
    }

    if (name === 'day') {
      return xData.reverse();
    }
    if (name === 'amounts') {
      return amounts.reverse();
    }
  }
}

</script>

<style lang="scss" scoped>
.echarts {
  max-width: 100%;
  height: 400px;
}

.title {
  margin-top: 10px;
  text-align: center;
}

.v-chart {
  width: 430%;

  &-wrapper {
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
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
