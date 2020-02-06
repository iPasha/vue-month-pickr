import VueMonthPickr from './VueMonthPickr.vue';

const install = (Vue) => {
    Vue.component('vue-month-pickr', VueMonthPickr)
};

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin)
}

export default install;

export { VueMonthPickr }