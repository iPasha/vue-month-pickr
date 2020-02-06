<template>
  <div class="container">
  
    <div class="row mt-5 mb-4">
      
      <div class="col">
        <h1>Demo for <a href="https://github.com/iPasha/vue-month-pickr" target="_blank">vue-month-pickr</a> vue component</h1>
        
        <p>
          Simple <a href="https://vuejs.org/" target="_blank">vuejs</a> component which use a dialog window and provide a simple way to select month and year
        </p>
        
      </div>
      
    </div>
    
    <div class="row">
      
      <div class="col-2 col-form-label">
        <label :for="inputId" class="font-weight-bold">Choose month</label>
      </div>
      
      <div class="col-3">
        <vue-month-pickr :inputId="inputId" :inputClassName="'form-control'" :defaultMonth="11" :defaultYear="2019" @choose-date="onDateUpdate"></vue-month-pickr>
      </div>
      
    </div>
    
    <div class="row" v-if="month !== null">
      <div class="col-10 ml-auto">
        
        Selected month: {{month}}, year: {{year}}
        
      </div>
    </div>
    
  </div>
</template>

<script>
    import VueMonthPickr from '../src/VueMonthPickr.vue';

    export default {
        data() {
            return {
                month: null,
                year : null,
                inputId: 'some-id'
            }
        },
        components: {
            VueMonthPickr,
        },
        methods   : {
            
            onDateUpdate(date) {
                this.month = date.month;
                this.year = date.year;
            }
        }
    }
</script>

<style></style>

<style scoped>
  body {
    background-color: #fef0f3;
  }
</style>