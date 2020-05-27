import Vue from 'vue';

export function capitalize(val: string): string {
   return val.toUpperCase();
}

const filters: { [name: string]: Function } = {
   capitalize,
};

export default filters;

Object.keys(filters)
      .forEach((key) => {
         Vue.filter(key, filters[key]);
      });
