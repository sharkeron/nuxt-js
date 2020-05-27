<template>
    <section class="users-page">
        <h1>{{pageTitle}}</h1>

        <div class="users-page__pagination-config">
            <div class="users-page__filter">
                <div class="users-page__filter-title">
                    Gender
                </div>

                <div class="users-page__filter-list">
                    <div class="custom-control custom-radio">
                        <input :disabled="usersLoadingInProgress"
                               @change="onChangeFilter()"
                               class="custom-control-input"
                               id="any"
                               name="gender"
                               type="radio"
                               v-model="genderMdl"
                               value="any">
                        <label class="custom-control-label"
                               for="any">Any</label>
                    </div>

                    <div class="custom-control custom-radio">
                        <input :disabled="usersLoadingInProgress"
                               @change="onChangeFilter()"
                               class="custom-control-input"
                               id="male"
                               name="gender"
                               type="radio"
                               v-model="genderMdl"
                               value="male">
                        <label class="custom-control-label"
                               for="male">Male</label>
                    </div>

                    <div class="custom-control custom-radio">
                        <input :disabled="usersLoadingInProgress"
                               @change="onChangeFilter()"
                               class="custom-control-input"
                               id="female"
                               name="gender"
                               type="radio"
                               v-model="genderMdl"
                               value="female">
                        <label class="custom-control-label"
                               for="female">Female</label>
                    </div>
                </div>
            </div>

            <div class="users-page__limit">
                <label for="page-limit">Limit:</label>

                <input :class="{'is-invalid': invalidItemsPerPage}"
                       :disabled="usersLoadingInProgress"
                       @blur="onChangeItemsPerPage"
                       @keydown.enter="$event.target.blur()"
                       class="form-control"
                       id="page-limit"
                       max="20"
                       min="0"
                       name="page-limit"
                       type="number"
                       v-model.number="pagination.itemsPerPage">

                <div class="invalid-feedback">
                    Invalid value
                </div>
            </div>
        </div>

        <div class="users-page__list">
            <UserCard :key="user.email"
                      :user="user"
                      v-for="user in users"/>
        </div>

        <div class="users-page__load-more">
            <button :disabled="usersLoadingInProgress"
                    @click="loadMore"
                    type="button">
                Load more
            </button>
        </div>

        <div class="users-page__pagination">
            <Pagination
                    :current-page="pagination.currentPage"
                    :loading="usersLoadingInProgress"
                    :max-visible-buttons="5"
                    :per-page="pagination.itemsPerPage || 0"
                    :total-pages="100"
                    @pageChanged="onPageChange"/>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Context} from '@nuxt/types';
    import {auth} from '~/middleware/auth';
    import filters from '~/plugins/filters';
    import UserCard from '~/components/UserCard.vue';
    import Pagination from '~/components/Pagination.vue';
    import {UserInterface, UsersDataInterface} from '~/models/users.models';

    export default Vue.extend({
        async fetch(ctx: Context) {
            const params = `?page=1&results=20&inc=dob,name,email,picture,gender`;

            await ctx.store.dispatch('users/getUsers', params);
        },
        name: 'index',
        components: {
            UserCard,
            Pagination,
        },
        middleware: [
            auth,
        ],
        filters,
        head() {
            return {
                title: 'Users',
            };
        },
        data(): UsersDataInterface {
            return {
                pageTitle: 'Users',
                genderMdl: 'any',
                pagination: {
                    currentPage: 1,
                    totalItems: 0,
                    itemsPerPage: 20,
                },
            };
        },
        computed: {
            users(): UserInterface[] {
                return this.$store.getters['users/users'];
            },
            usersLoadingInProgress(): boolean {
                return this.$store.getters['users/loading'];
            },
            invalidItemsPerPage(): boolean {
                return +this.$data.pagination.itemsPerPage === 0 || +this.$data.pagination.itemsPerPage > 20;
            },
        },

        methods: {
            async onPageChange(page: number): Promise<void> {
                this.pagination.currentPage = page;

                await this.$store.dispatch('users/getUsers', this.getParams());
            },

            async onChangeItemsPerPage(): Promise<void> {
                if (+this.pagination.itemsPerPage === 0 || +this.$data.pagination.itemsPerPage > 20) {
                    return;
                }

                await this.$store.dispatch('users/getUsers', this.getParams());
            },

            async onChangeFilter(): Promise<void> {
                await this.$store.dispatch('users/getUsers', this.getParams());
            },

            getParams(): string {
                const params: Partial<{
                    included: string[];
                    gender: string;
                    page: number;
                    results: number;
                }> = {
                    included: ['dob', 'name', 'email', 'picture', 'gender'],
                    page: this.pagination.currentPage,
                    results: this.pagination.itemsPerPage,
                };

                if (this.genderMdl !== 'any') {
                    params.gender = this.genderMdl;
                }

                return `?page=${params.page}&results=${params.results}&inc=${params.included?.join()}${params.gender ? `&gender=${params.gender}` : ''}`;
            },

            async loadMore(): Promise<void> {
                this.pagination.currentPage += 1;

                await this.$store.dispatch('users/getMoreUsers', this.getParams());
            },
        },
    });
</script>

<style lang="scss"
       scoped>
    .users-page {
        display: flex;
        align-items: stretch;
        flex-direction: column;
        justify-content: flex-start;
        min-height: calc(100vh - 56px);
        padding-bottom: 50px;

        h1 {
            margin-top: 1rem;
            margin-bottom: 1.5rem;
        }

        &__filter {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            margin-bottom: 25px;
        }

        &__limit {
            position: relative;

            .invalid-feedback {
                position: absolute;
                bottom: -20px;
                left: 0;
            }
        }

        &__filter-title {
            margin-bottom: 10px;
        }

        &__filter-list {
            display: flex;

            .custom-control {
                &:not(:last-child) {
                    margin-right: 15px;
                }
            }
        }

        &__list {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
        }

        &__load-more {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            margin-top: 15px;

            button {
                transition: color 150ms ease, background-color 150ms ease;
                color: #fff;
                border: 1px solid #2f495e;
                background-color: #2f495e;

                &:hover {
                    color: #2f495e;
                    background-color: #fff;
                }
            }
        }

        &__pagination-config {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            margin-top: 30px;
            margin-bottom: 25px;
        }
    }
</style>
