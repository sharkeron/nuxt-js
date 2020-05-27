<template>
    <div class="login-page">
        <h1>
            Login page
        </h1>

        <div class="alert alert-info">
            For authorization, enter <strong>any</strong> value in the login field
        </div>

        <form @submit.prevent="onSubmit()"
              class="login-form">
            <div class="form-group">
                <input class="form-control"
                       name="login"
                       type="text"
                       v-model="loginMdl">
            </div>

            <div class="custom-control custom-checkbox">
                <input class="custom-control-input"
                       id="local-storage"
                       type="checkbox"
                       v-model="rememberMeMdl">

                <label class="custom-control-label"
                       for="local-storage">Remember me</label>
            </div>

            <div class="login-page__actions-group">
                <button :disabled="disableLoginBtn"
                        class="btn btn-primary"
                        type="submit">Sign in
                </button>

                <nuxt-link to="/">To home</nuxt-link>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Navbar from '~/components/Navbar.vue';
    import Cookies from 'js-cookie';

    interface LoginPageDataInterface {
        loginMdl: string;
        rememberMeMdl: boolean;
    }

    export default Vue
            .extend({
                name: 'login',
                components: {
                    Navbar,
                },
                head() {
                    return {
                        title: 'Страница входа',
                    };
                },
                data(): LoginPageDataInterface {
                    return {
                        loginMdl: '',
                        rememberMeMdl: false,
                    };
                },
                computed: {
                    disableLoginBtn(): boolean {
                        return !this.$data.loginMdl;
                    },
                },
                methods: {
                    onSubmit(): void {
                        if (this.rememberMeMdl) {
                            Cookies.set('token', 'token');
                        }

                        this.$store.dispatch('login', 'token');
                        this.$router.push('/users');
                    },
                },
            });
</script>

<style lang="scss"
       scoped>
    .login-page {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: center;
        min-height: calc(100vh - 56px);

        .login-form {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            width: 500px;

            .form-group {
                width: 100%;
            }
        }

        &__actions-group {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-top: 1rem;
        }
    }
</style>
