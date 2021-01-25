<template>
            <transition name="modal" >
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container">
  
                
                <h3 v-if="transaction.id == null" class="modal-header">
                    Add New Item
                </h3>
                <h3 v-else class="modal-header"> 
                    Edit Item
                </h3>
  
                <div class="modal-body">
                  <slot name="body">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label">Date Time</label>
                      <div class="col-sm-9">
                        <datetime v-model="transaction.datetime" type="datetime" input-class="form-control"></datetime>
                      </div>
                  </div>     
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label">Item</label>
                      <div class="col-sm-9">
                        <input type="text" class="form-control" v-model="transaction.item">
                      </div>
                  </div>
                  <div class="form-group row">
                      <label class="col-sm-3 col-form-label">Category</label>
                      <div class="col-sm-9">
                        <select v-model="transaction.category" class="form-control" :categoryoptions="categoryoptions">
      <option v-for="(a) in categoryoptions" :key="a.value">{{a}}</option>
</select>
                      </div>
                  </div>
                        
                  <div class="form-group row">
                      <label class="col-sm-3 col-form-label">Amount</label>
                      <div class="col-sm-9">
                       <input type="number" step="0.01" min="0.01" class="form-control" placeholder="Amount" v-model="transaction.amount">
                      </div>
                  </div>                     
                  </slot>
                </div>
  
                <div class="modal-footer">
                  <slot name="footer">
                    <button class="btn btn-outline-success" @click="addTransaction()">
                       <span v-if="transaction.id == null">Add</span>
                       <span v-else>Save</span>
                      </button>
                    <button class="btn btn-outline-primary" @click="$emit('close')">
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
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'


export default {
    name: 'TransactionModal',
    components: {
        Datetime
    },
    props: ['transaction'],
        methods: {
            addTransaction: function(){
                this.$emit('close');
                this.$emit('addtransaction');    
            }
        },
    data(){
      return {
        categoryoptions:['Food', 'Transportation','Bills', 'Health', 'Travel']
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
    width: 600px;
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