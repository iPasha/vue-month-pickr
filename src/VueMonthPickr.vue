<template>
  <div class="month-pickr" v-click-away="hide">
    <input class="month-pickr__input" :class="inputClassName" :id="inputId" type="text" readonly @click="pickerVisible = !pickerVisible" :value="showDate" ref="input" />
    
    <div class="month-pickr__container" v-if="pickerVisible" :style="{top: ($refs.input.offsetHeight + 5) + 'px'}">
      <div class="month-pickr__year">
        <button class="month-pickr__year-btn" @click="prevYear">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-left">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <span class="month-pickr__show-year">{{ year }}</span>
        <button class="month-pickr__year-btn" @click="nextYear">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-right">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
      
      <div class="month-pickr__monthes">
        <a
          href=""
          v-for="(m, index) in months"
          @click.prevent="pickMonth(index)"
          :key="'month'+index"
          class="month-pickr__month"
          :class="{'month-pickr__month_selected': index+1 == month}">{{ m }}</a>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name      : "vue-month-pickr",
        directives: {

            clickAway: {

                bind: function (el, binding, vnode) {
                    el.event = function (event) {
                        if (!(el === event.target || el.contains(event.target))) {
                            vnode.context[binding.expression](event)
                        }
                    };

                    document.body.addEventListener('click', el.event);
                },

                unbind: function (el) {
                    document.body.removeEventListener('click', el.event);
                }
            }
        },
        props     : {
            inputClassName: {
                type: String
            },
            inputId: {
                type: String
            },
            defaultYear   : {
                type   : Number,
                default: new Date().getFullYear()
            },
            defaultMonth  : {
                type   : Number,
                default: new Date().getMonth()
            },
            months        : {
                type   : Array,
                default: () => ['January', 'February','March','April','May','June','July','August','September','October','November','December']
            }
        },
        data() {
            return {
                pickerVisible: false,
                year         : this.defaultYear,
                month        : this.defaultMonth
            }
        },
        computed  : {

            showDate() {

                const showYear = new Date().getFullYear() != this.year ? `, ${this.year}` : '';

                return this.months[this.month - 1] + showYear;
            }
        },
        watch     : {
            defaultMonth(val) {

                this.month = val
            },
            defaultYear(val) {

                this.year = val
            },
        },
        methods   : {
            hide() {
                this.pickerVisible = false;
            },

            pickMonth(month) {
                this.month = month + 1;

                this.$emit("choose-date", {month: this.month, year: this.year});
                this.hide();
            },

            prevYear() {
                if (this.year > 1) {
                    this.year = this.year - 1;
                }
            },

            nextYear() {
                this.year = this.year + 1;
            }
        },
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
  
  .month-pickr {
    position: relative;
    
    &__container {
      width: 310px;
      border: 1px solid #CDCDCD;
      border-radius: 4px;
      background-color: #fff;
      box-shadow: 0 17px 50px rgba(51, 51, 51, 0.2);
      z-index: 10;
      overflow: hidden;
      
      position: absolute;
      left: 0;
    }
    
    &__input {
      background-image: url("data:image/svg+xml,%3Csvg width='20px' height='20px' viewBox='0 0 20 20' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg id='jgfh' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='tryjtrj' transform='translate(-975.000000, -182.000000)' fill='%233796F6' fill-rule='nonzero'%3E%3Cg id='Календарь' transform='translate(835.000000, 172.000000)'%3E%3Cg id='Calendar'%3E%3Cg id='Icon/Calendar' transform='translate(140.000000, 10.000000)'%3E%3Cpath d='M18.6,1.6 L16.8,1.6 L16.8,0.4 C16.8,0.1792 16.6212,0 16.4,0 C16.1788,0 16,0.1792 16,0.4 L16,1.6 L4,1.6 L4,0.4 C4,0.1792 3.8208,0 3.6,0 C3.3792,0 3.2,0.1792 3.2,0.4 L3.2,1.6 L1.4,1.6 C0.628,1.6 0,2.228 0,3 L0,18.6 C0,19.372 0.628,20 1.4,20 L18.6,20 C19.372,20 20,19.372 20,18.6 L20,3 C20,2.228 19.372,1.6 18.6,1.6 Z M1.4,2.4 L3.2,2.4 L3.2,3.6 C3.2,3.8208 3.3792,4 3.6,4 C3.8208,4 4,3.8208 4,3.6 L4,2.4 L16,2.4 L16,3.6 C16,3.8208 16.1788,4 16.4,4 C16.6212,4 16.8,3.8208 16.8,3.6 L16.8,2.4 L18.6,2.4 C18.9308,2.4 19.2,2.6692 19.2,3 L19.2,5.6 L0.8,5.6 L0.8,3 C0.8,2.6692 1.0692,2.4 1.4,2.4 Z M18.6,19.2 L1.4,19.2 C1.0692,19.2 0.8,18.9308 0.8,18.6 L0.8,6.4 L19.2,6.4 L19.2,18.6 C19.2,18.9308 18.9308,19.2 18.6,19.2 Z' id='Shape'%3E%3C/path%3E%3Ccircle id='Oval' cx='6.92307692' cy='9.23076923' r='1'%3E%3C/circle%3E%3Ccircle id='Oval' cx='10' cy='9.23076923' r='1'%3E%3C/circle%3E%3Ccircle id='Oval' cx='13.0769231' cy='9.23076923' r='1'%3E%3C/circle%3E%3Ccircle id='Oval' cx='16.1538462' cy='9.23076923' r='1'%3E%3C/circle%3E%3Ccircle id='Oval' cx='3.84615385' cy='12.3076923' r='1'%3E%3C/circle%3E%3Ccircle id='Oval' cx='6.92307692' cy='12.3076923' r='1'%3E%3C/circle%3E%3Ccircle id='Oval' cx='10' cy='12.3076923' r='1'%3E%3C/circle%3E%3Ccircle id='Oval' cx='13.0769231' cy='12.3076923' r='1'%3E%3C/circle%3E%3Ccircle id='Oval' cx='16.1538462' cy='12.3076923' r='1'%3E%3C/circle%3E%3Ccircle id='Oval' cx='3.84615385' cy='15.3846154' r='1'%3E%3C/circle%3E%3Ccircle id='Oval' cx='6.92307692' cy='15.3846154' r='1'%3E%3C/circle%3E%3Ccircle id='Oval' cx='10' cy='15.3846154' r='1'%3E%3C/circle%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      background-position: right 10px center;
      background-repeat: no-repeat;
      background-color: #FFF;
    }
    
    &__monthes {
      display: flex;
      flex-wrap: wrap;
    }
    
    &__year {
      display: flex;
      padding: 10px;
    }
    &__year-btn {
      flex: 0 0 40px;
      height: 33px;
      padding: 0;
      background-color: transparent;
      border: 1px solid #CDCDCD;
      border-radius: 2px;
    }
    &__show-year {
      flex: 0 0 calc(100% - 80px);
      text-align: center;
      padding-top: 7px;
      font-size: 1.1rem;
      font-weight: bold;
    }
    
    &__month {
      box-sizing: border-box;
      flex: 0 0 calc(100% / 3);
      text-align: center;
      padding: 10px;
      border: 1px solid #f3f3f3;
      border-bottom: 0;
      border-left: 0;
      color: #000;
      
      &_selected {
        background-color: #0073FF !important;
        color: #FFF;
      }
      
      &:nth-child(3n+3) {
        border-right: 0;
      }
      
      &:hover {
        background-color: #f3f3f3;
      }
    }
  }

</style>