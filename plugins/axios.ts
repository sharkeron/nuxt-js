import {Context} from '@nuxt/types';

export default function (ctx: Context) {
   ctx.$axios.defaults.baseURL = 'https://randomuser.me/api';

   if (process.env.NODE_ENV !== 'production') {
      ctx.$axios
         .onRequest(config => {
            console.log('Making request to ' + config.url);
         });
   }

   ctx.$axios
      .onError(error => {
         const code = error.response?.status;
         console.log('Response with code error -', code);
      });
}
