<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <nuxt-link class="navbar-brand"
                   to="/">
            Nuxt App
        </nuxt-link>

        <div class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">
                <template v-if="hasToken">
                    <li class="nav-item">
                        <nuxt-link active-class="active"
                                   class="nav-link"
                                   to="/">
                            About
                        </nuxt-link>
                    </li>

                    <li class="nav-item">
                        <nuxt-link active-class="active"
                                   class="nav-link"
                                   no-prefetch
                                   to="/users">
                            Users
                        </nuxt-link>
                    </li>

                    <li class="nav-item">
                        <button @click.prevent="logout"
                                class="nav-link logout-btn"
                                type="button">
                            Logout
                        </button>
                    </li>
                </template>

                <template v-else>
                    <li class="nav-item">
                        <nuxt-link active-class="active"
                                   class="nav-link"
                                   no-prefetch
                                   to="/">
                            About
                        </nuxt-link>
                    </li>

                    <li class="nav-item">
                        <nuxt-link active-class="active"
                                   class="nav-link"
                                   no-prefetch
                                   to="/login">
                            Sign In
                        </nuxt-link>
                    </li>
                </template>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'Navbar',
        computed: {
            hasToken(): boolean {
                return this.$store.getters.hasToken;
            },
        },
        methods: {
            logout(): void {
                this.$store.dispatch('logout');
                this.$router.push('/login');
            },
        },
    });
</script>

<style lang="scss"
       scoped>
    .logout-btn {
        border: 0;
        background: none;
    }
</style>
