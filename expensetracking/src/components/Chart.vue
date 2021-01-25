<template>
  <div>
    <div >
      <highcharts
        class="chart"
        :options="chartOptions"
        :updateArgs="updateArgs"
        ref="chart"
      ></highcharts>
      <button @click="addSeries">Add new series</button>
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
  props:['seriesdata'],
  data() {
    return {
      updateArgs: [true, true, true],
    //   chartOptions: {
    //     chart: {
    //       zoomType: "x"
    //     },

    //     title: {
    //       text: "Datapoints"
    //     },

    //     series: [
    //       {
    //         name: "Series 1",
    //         data: [1, 2, 3, 4, 5, 6]
    //       },
    //       {
    //         name: "Series 2",
    //         data: [11, 22, 33, 44, 55, 66]
    //       }
    //     ],

    //     xAxis: {
    //       type: "datetime"
    //     }
    //   }
       chartOptions: {
        chart: {
          type: "column",
          animation: {
            duration: 1000,
          },
        },
        title: {
          text: "Expenses",
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          min: 0,
          title: {
            text: "Total Expenses",
          },
        },
        legend: {
          enabled: false,
        },
        series: [
          {
            data: this.seriesdata ,
            //data: [1, 2, 3], // sample data
          },
        ],
      },
    };
  },
  methods: {
    addSeries() {
      this.chartOptions.series.push({
        name: "Series 2",
        data: [11, 22, 33, 44, 55, 66]
      });
    }
  }
};
</script>