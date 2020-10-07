<template>
  <layout>
    <TopNav @handleBack="$router.back()">本月支出统计</TopNav>
    <div>
      <div class="title">每日支出</div>
      <v-chart class="v-chart" :options="option"></v-chart>
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
import TopNav from '@/components/TopNav.vue';
import {Component} from "vue-property-decorator";

@Component({
  components: {TopNav, 'v-chart': Chart}
})
export default class Statistics extends Vue {

  get option() {
    return {
      xAxis: {
        type: 'category',
        data: this.days('day', '-')
      },
      yAxis: {
        type: 'value',
        show: false
      },
      tooltip: {
        show: true,
        triggerOn: 'click'
      },
      series: [{
        data: this.days('amounts', '-'),
        type: 'line',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(220, 220, 220, 0.8)'
        },

      },]
    }
  }

  beforeCreate() {
    store.commit('fetchRecords');
  }

  beforeMount() {
    if (store.state.recordList.length === 0) {
      window.alert('还没有内容，先去记一笔账吧');
      this.$router.push("/money")
    }

  }


  getDays() {
    const [year, month] = [dayjs().year(), dayjs().month()];
    const d = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
      if (month === 1) {
        return 29;
      } else {
        return d[month];
      }
    } else {
      return d[month];
    }
  }

  days(name: string, type: string) {
    const day = [];
    const days = this.getDays();
    const amounts = [];
    let amount = null;
    for (let i = 1; i <= days; i++) {
      const date = dayjs().date(i);
      for (let j = 0; j < this.$store.state.recordList.length; j++) {
        if (dayjs(this.$store.state.recordList[j].createAt).isSame(date, 'day')) {
          if (this.$store.state.recordList[j].type === type) {
            amount += this.$store.state.recordList[j].amount;
          }

        }
      }
      day.push(i);
      amounts.push(amount);
      amount = null;
    }

    if (name === 'day') {
      return day;
    }
    if (name === 'amounts') {
      return amounts;
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
  width: 500%;
}
</style>
