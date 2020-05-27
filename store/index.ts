import {Context} from '@nuxt/types';
import Cookies from 'js-cookie';
import {ActionTree, GetterTree, MutationTree} from 'vuex';

export const state = () => ({
   token: null as string | null,
});

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
   hasToken: s => !!s.token,
};

export const mutations: MutationTree<RootState> = {
   setToken: (state, token: string) => {
      state.token = token;
   },
   clearToken: (state) => {
      state.token = null;
      Cookies.remove('token');
   },
};

export const actions: ActionTree<RootState, RootState> = {
   nuxtServerInit({commit}, ctx: Context) {
      getTokenFromCookie(commit, ctx);
   },
   login({commit}, payload: string) {
      commit('setToken', payload);
   },
   logout({commit}) {
      commit('clearToken');
   },
};

const getTokenFromCookie = (commit: Function, ctx: Context): void => {
   const cookies: string[] = !!ctx.req.headers.cookie ? ctx.req.headers.cookie.split('; ') : [];
   let token: string | null = null;

   if (cookies.length > 0) {
      for (const cookie of cookies) {
         if (cookie.indexOf('token=') !== -1) {
            token = cookie.split('=')[1];

            break;
         }
      }

      if (token) {
         commit('setToken', token);

         if (ctx.route.name === 'login') {
            ctx.redirect('/');
         }
      }
   }
};
