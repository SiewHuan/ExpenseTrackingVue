<template>
    <div class="card mt-5"> 
                    <h2 class="card-header">{{header}}</h2> 
                    <transition name="shooting-star"> 
                        <div class="mt-3 ml-3" v-cloak v-if="numExpenses > 0 && showSummary"> 
                            <p>showing {{numExpenses}} items</p> 
                        </div> 
                    </transition> 
                    <div class="m-3"> 
                        <a href="#" @click="showSummary = !showSummary">Show/hide summary</a> 
                    </div> 
                    <table class="table table-striped" :class="[{'table-dark': false}, 'table-bordered']"> 
                        <thead class="thead-light"> 
                            <th>#</th> 
                            <th>Item</th> 
                            <th>Category</th> 
                            <th>Date Time</th> 
                            <th>Amount</th> 
                            <th>Edit</th>
                            <th>Remove</th>
                        </thead> 
                        <tbody is="transition-group" name="neo-list" v-cloak> 
                            <tr v-for="(a, index) in expenses" 
                                :key="a.id" >
                                <td>{{index + 1}}</td> 
                                <td>{{a.item}}</td> 
                                <td>{{a.category}}</td> 
                                <td>{{a.datetime}}</td> 
                                <td>{{a.amount}}</td> 
                                <td><button class="btn btn-warning" @click="edit(a)">edit</button></td>
                                <td><button class="btn btn-warning" @click="remove(index)">remove</button></td> 
                             </tr> 
                        </tbody> 
                    </table> 
                </div>  
</template>

<script>
export default {
  name: 'Grid',
  props: ['expenses', 'header'],
    data: function() {
        return {            
            showSummary: true
        }
    },  
    computed: {
        numExpenses: function() {
            return this.expenses.length;
        }
    },  
    methods: {
        remove: function (index) {
            this.$emit('remove', index);           
        },
        edit: function(data){
            this.$emit('openmodal', data);
        }
    }
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