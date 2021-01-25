<template>
  <div>
    <div >
      <highcharts
        class="chart"
        :options="chartdata"
        :updateArgs="updateArgs"
        ref="chart"
        :seriesdata="seriesdata"
      ></highcharts>
      
    </div>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";

export default {
    name: 'columnchart',
    components: {   
    highcharts: Chart
  },
  props:['seriesdata','chartdata'],
  watch:{
    seriesdata(){
      this.redraw()
      }
  },
  data() {
    return {
      updateArgs: [true, true, true],
      //  chartOptions: {
      //   chart: {
      //     type: "column",
      //     animation: {
      //       duration: 1000,
      //     },
      //   },
      //   title: {
      //     text: "Expenses",
      //   },
      //   xAxis: {
      //     type: "category",
      //   },
      //   yAxis: {
      //     min: 0,
      //     title: {
      //       text: "Total Expenses",
      //     },
      //   },
      //   legend: {
      //     enabled: false,
      //   },
      //   series: [
      //     {
      //       data: this.seriesdata,
      //     },
      //   ],
      // },
    };
  },
  methods: {
    redraw(){
      this.chartOptions.series[0] = this.seriesdata;
    }
  }
};
</script>