import {Context, Middleware} from '@nuxt/types';

export const auth: Middleware = (ctx: Context) => {
   if (!ctx.store.getters.hasToken) {
      ctx.redirect('./login');
   }
};
