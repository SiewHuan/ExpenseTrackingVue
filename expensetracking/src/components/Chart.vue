<template>
  <div>
    <div >
      <highcharts
        class="chart"
        :options="chartdata"
        :updateArgs="updateArgs"
        ref="chart"
        
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
  props:['chartdata'],
  // watch:{
  //   seriesdata(){
  //     this.redraw()
  //     }
  // },
  data() {
    return {
      updateArgs: [true, true, true],
    };
  },
  // methods: {
  //   redraw(){
  //     this.chartOptions.series[0] = this.seriesdata;
  //   }
  // }
};
</script>