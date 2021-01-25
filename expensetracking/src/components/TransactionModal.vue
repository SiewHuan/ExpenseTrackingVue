<template>
            <transition name="modal" >
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container">
  
                
                <div v-if="transaction.id == null" class="modal-header">
                    Add New Item
                </div>
                <div v-else> 
                    Edit Item
                </div>
  
                <div class="modal-body">
                  <slot name="body">
                    <input type="text" class="form-control" placeholder="Item" v-model="transaction.item">
                    <input type="text" class="form-control" placeholder="Category" v-model="transaction.category">                  
                    <date-pick v-model="transaction.datetime" 
        :pickTime="true"
        :format="'YYYY-MM-DD HH:mm'"></date-pick>
                    <input type="number" step="0.01" min="0.01" class="form-control" placeholder="Amount" v-model="transaction.amount">
                  </slot>
                </div>
  
                <div class="modal-footer">
                  <slot name="footer">
                    <button class="modal-default-button" @click="addTransaction()">
                       <span v-if="transaction.id == null">Add</span>
                       <span v-else>Save</span>
                      </button>
                    <button class="modal-default-button" @click="$emit('close')">
                      Cancel
                    </button>
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </transition>
</template>

<script>
//import DateTimePicker from '../components/DateTimePicker.vue'
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

export default {
    name: 'TransactionModal',
    components: {
        DatePick
    },
    props: ['transaction'],
        methods: {
            addTransaction: function(){
                this.$emit('close');
                this.$emit('addtransaction');    
            }
        }
}
</script>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }
  
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  
  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
  
  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }
  
  .modal-body {
    margin: 20px 0;
  }
  
  .modal-default-button {
    float: right;
  }
  
  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */
  
  .modal-enter {
    opacity: 0;
  }
  
  .modal-leave-active {
    opacity: 0;
  }
  
  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  
</style>