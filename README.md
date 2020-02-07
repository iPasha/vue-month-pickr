[![NPM version](https://img.shields.io/npm/v/vue-month-pickr.svg?style=for-the-badge)](https://www.npmjs.com/package/vue-month-pickr)
[![NPM downloads](https://img.shields.io/npm/dm/vue-month-pickr.svg?style=for-the-badge)](https://www.npmjs.com/package/vue-month-pickr)

# vue-month-pickr

✨ Simple vue component to select month and year ✨

<img src="https://i.ibb.co/McsktKM/2020-02-06-15-54-25.png">

## Install

`npm install vue-month-pickr`

## Use

````javascript
import VueMonthPickr from 'vue-month-pickr';

components: {
    VueMonthPickr
}
````

````html
<vue-month-pickr :input-id="inputId" :input-class-name="'form-control'" :default-month="11" :default-year="2019" @choose-date="onDateUpdate"></vue-month-pickr>
````

### Props 

| Prop                          | Type            | Default                    | Description                              |
|-------------------------------|-----------------|----------------------------|------------------------------------------|
| input-id                      | String          |                            | "id" attribute for input tag.	          |
| input-class-name              | String	      |                            | class attribute for input tag.           |
| default-month                 | Integer         | new Date().getMonth()      | The default month of the month picker.   |
| default-year                  | Integer         | new Date().getFullYear()   | The default year of the month picker.    |
| months                        | Array           | \['January', ... ]         | Array of months in english               |

### Events

| Event                         | Returns         | Description                                                |
|-------------------------------|-----------------|------------------------------------------------------------|
| @choose-date                  | Object    	  | Fires when month selected. Returns selected month and year |


## License

[MIT](http://opensource.org/licenses/MIT)
