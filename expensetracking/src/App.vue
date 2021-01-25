<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-dark">
  <div class="container-fluid">
    <span class="navbar-brand mb-0 ml-5 h1">Expense Tracking App</span>
  </div>
</nav>
  <div class="container">

    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="card m-3">
      <button id="show-modal" @click="addnew()" class="btn btn-outline-success">Add Transaction</button>
      <TransactionModal
        v-if="showModal"
        @close="showModal = false"
        :transaction="transaction"
        @addtransaction="addtransaction"
      />
    </div>
    <!-- <highcharts :options="chartOptions"></highcharts> -->
    <columnchart :seriesdata="seriesdata" :chartdata="chartdata"></columnchart>
    <Grid
      @remove="remove"
      :expenses="expenses"
      header="Transaction Records"
      @openmodal="openmodal"
    />
  </div>
    
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Grid from "./components/Grid.vue";
import TransactionModal from "./components/TransactionModal.vue";
import columnchart from "./components/Chart.vue";
var dayjs = require('dayjs');
var isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);


export default {
  name: "App",
  components: {
    //HelloWorld,
    Grid,
    TransactionModal,
    columnchart,
  },
  data() {
    return {
      //dummy data
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
      showModal: false
    };
  },

  computed: {
    seriesdata() {
      var result = [
        
      ];
      var totalstart =  dayjs().subtract(12, 'month');
      //var totalend = moment();
      var list = [];
      for(var m=1; m<=12; m++){
        var d = totalstart.add(m, 'month');
        var month = {
          start: dayjs(d).startOf('month'),
          end: dayjs(d).endOf('month'),
          label: d.format('MMM YY'),
          sum: 0
        }
        list.push(month);
      }
      this.expenses.forEach((obj)=>{
        list.forEach((mon)=>{
          if(dayjs(obj.datetime).isBetween(mon.start, mon.end)){
           mon.sum = parseInt( mon.sum) + parseInt( obj.amount);
        }
        });
        
      });
      list.forEach((obj)=>{
        result.push([obj.label, obj.sum]);
      });
      return result;
    },
    chartdata(){
      var result = {
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
        ]
      }
      return result;
    }
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
  /* margin-top: 60px; */
}
[v-cloak] {
  display: none;
}
</style>
