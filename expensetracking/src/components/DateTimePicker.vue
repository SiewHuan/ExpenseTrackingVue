<template>
    <date-pick
        v-model="date"
        :pickTime="true"
        :format="'YYYY-MM-DD HH:mm'"
    ></date-pick>
</template>

<script>
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

export default {
    name: 'DateTimePicker',
    components: {DatePick},
    //props:['input'],
    data: () => ({
        date:  new Date()
    })
};
</script>