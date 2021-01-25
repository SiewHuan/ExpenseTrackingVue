<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="card">
      <button id="show-modal" @click="addnew()">Add Transaction</button>
      <TransactionModal
        v-if="showModal"
        @close="showModal = false"
        :transaction="transaction"
        @addtransaction="addtransaction"
      />
    </div>
    <!-- <highcharts :options="chartOptions"></highcharts> -->
    <columnchart :seriesdata="seriesdata"></columnchart>>
    <Grid
      @remove="remove"
      :expenses="expenses"
      header="Expenses"
      @openmodal="openmodal"
    />
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Grid from "./components/Grid.vue";
import TransactionModal from "./components/TransactionModal.vue";
//import { Chart } from "highcharts-vue";
import columnchart from "./components/Chart.vue";
//var moment = require('moment');
var dayjs = require('dayjs')

export default {
  name: "App",
  components: {
    //HelloWorld,
    Grid,
    TransactionModal,
    //highcharts: Chart,
    columnchart,
  },
  data() {
    return {
      expenses: [
        {
          id: "89qotnkwee9",
          amount: 5.0,
          datetime: "2021-01-01 12:00",
          category: "food",
          item: "lunch",
        },
        {
          id: "38yhtkja9w",
          amount: 9.0,
          datetime: "2021-01-01 15:00",
          category: "food",
          item: "starbuck coffee",
        },
      ],
      transaction: {
        id: null,
        amount: 0,
        datetime: null,
        category: null,
        item: null,
      },
      showModal: false,
      // chartOptions: {
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
      //       //data: [1, 2, 3], // sample data
      //     },
      //   ],
      // },
    };
  },
  created: function() {
    this.fetchExpenses();
    // this.chartOptions.series[0].data = [
    //   ['Shanghai', 24.2],
    //   ['Beijing', 20.8],
    //   ['Karachi', 14.9],
    //   ['Shenzhen', 13.7],
    //   ['Guangzhou', 13.1],
    //   ['Istanbul', 12.7],
    //   ['Mumbai', 12.4]
    // ];
  },
  computed: {
    seriesdata() {
      var result = [
        
      ];
      var totalstart =  dayjs().subtract(12, 'month');
      //var totalend = moment();
      var list = [];
      for(var m=0; m<12; m++){
        var d = totalstart.add(m, 'month');
        var month = {
          start: dayjs(d).startOf('month'),
          end: dayjs(d).endOf('month'),
          label: d.format('YY MMM'),
          sum: 0
        }
        list.push(month);
      }
      this.expenses.forEach((i, obj)=>{
        list.forEach((j, mon)=>{
          if(obj.datetime >mon.start && obj.datetime < mon.end){
            mon.sum += obj.amount;
        }
        });
        
      });
      list.forEach((i, obj)=>{
        result.push([obj.label, obj.sum]);
      });
      return result;
    },
  },
  methods: {
    fetchExpenses: function() {},
    remove: function(index) {
      this.expenses.splice(index, 1);
    },
    addnew: function() {
      var t = {
        id: null,
        amount: 0,
        datetime: "2021-01-01 09:00",
        category: null,
        item: null,
      };
      this.openmodal(t);
    },
    openmodal: function(data) {
      this.transaction = data;
      this.showModal = true;
    },
    addtransaction: function() {
      if (this.transaction.id == null) {
        this.transaction.id = makeid(10);
        this.expenses.push(this.transaction);
      } else {
        var i = this.expenses.findIndex((obj) => obj.id == this.transaction.id);
        var updatedList = [
          ...this.expenses.slice(0, i),
          this.transaction,
          ...this.expenses.slice(i + 1),
        ];
        this.expenses = updatedList;
      }
    },
  },
};

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
[v-cloak] {
  display: none;
}
</style>
