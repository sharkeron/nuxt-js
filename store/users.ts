import {ActionTree, GetterTree, MutationTree} from 'vuex';
import {ResponseInterface, UserInterface} from '~/models/users.models';

export const state = () => ({
   loading: false,
   users: [] as UserInterface[],
});

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
   loading: s => s.loading,
   users: s => s.users,
};

export const mutations: MutationTree<RootState> = {
   setUsers: (state, users: UserInterface[]) => (state.users = users),
   enableLoading: (state) => (state.loading = true),
   disableLoading: (state) => (state.loading = false),
};

export const actions: ActionTree<RootState, RootState> = {
   async getUsers({commit}, params: string) {
      commit('enableLoading');

      try {
         const usersResponse = await this.$axios
                                         .$get<ResponseInterface>(`/${params}`);

         commit('setUsers', usersResponse.results);
      } catch {
         console.warn('Users fetching failed.');
      } finally {
         commit('disableLoading');
      }
   },

   async getMoreUsers({commit, getters}, params: string) {
      commit('enableLoading');

      try {
         const usersResponse = await this.$axios
                                         .$get<ResponseInterface>(`/${params}`);

         commit('setUsers', [...getters.users, ...usersResponse.results]);
      } catch {
         console.warn('Users fetching failed.');
      } finally {
         commit('disableLoading');
      }
   },
};
