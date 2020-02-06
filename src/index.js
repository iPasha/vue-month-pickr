import VueMonthPickr from './VueMonthPickr.vue'

const install = (Vue) => {
    Vue.component('vue-month-pickr', VueMonthPickr)
}

export default {
    install
}

export { VueMonthPickr }