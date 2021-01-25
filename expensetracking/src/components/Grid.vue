<template>
    <div class="card mt-5"> 
                    <h3 class="card-header">{{header}}</h3> 
                     <SortedTable :values="expenses">
      <thead >
        <tr>
            <th></th> 
          <th scope="col" >
            <SortLink name="item">Item</SortLink>
          </th>
          <th scope="col" >
            <SortLink name="category">Category</SortLink>
          </th>
          <th scope="col" >
            <SortLink name="datetime">Date Time</SortLink>
          </th>
          <th scope="col" >
            <SortLink name="amount">Amount</SortLink>
          </th>
          <th></th>
                            <th></th>
        </tr>
      </thead>
      <tbody slot="body" slot-scope="sort">
        <tr v-for="(a,index) in sort.values" :key="a.id">
           <td>{{index + 1}}</td> 
                                <td>{{a.item}}</td> 
                                <td>{{a.category}}</td> 
                                <td>{{ a.datetime | dayFormat}}</td> 
                                <td>{{a.amount}}</td> 
                                <td><button class="btn btn-outline-success" @click="edit(a)">Edit</button></td>
                                <td><button class="btn btn-outline-danger" @click="remove(index)">Remove</button></td> 
        </tr>
      </tbody>
    </SortedTable>
                </div>  
</template>

<script>

var dayjs = require('dayjs');
var isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);



export default {
  name: 'Grid',
  props: ['expenses', 'header'],
    data: function() {
        return {            
            showSummary: true
        }
    },   
    methods: {
        remove: function (index) {
            this.$emit('remove', index);           
        },
        edit: function(data){
            this.$emit('openmodal', data);
        }
    },
    filters: {
        dayFormat: (date) => {
            if (!date){
                return null;
            }
            
            return dayjs(date).format('DD MMM YYYY HH:mm');
        }
    },
}
</script>

<style scoped>
.highlight {
    border: solid 3px red;
    color: red;
}
.shooting-star-leave-to, .shooting-star-enter {
    transform: translateX(150px) rotate(30deg);
    opacity: 0;
}
.shooting-star-enter-active, .shooting-star-leave-active {
    transition: all .5s ease;
}
.neo-list-leave-to, .neo-list-enter {
    opacity: 0;
    transform: translateY(30px);
}
.neo-list-enter-active, .neo-list-leave-active {
    transition: all 1s linear;
}
</style>