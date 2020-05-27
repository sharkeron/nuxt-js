<template>
    <div @click="showInfo"
         class="user-card">
        <div class="user-card__inner">
            <div class="user-card__photo">
                <img :src="user.picture.large"
                     alt="user_photo">
            </div>

            <UserCardDetails :user="user"/>
        </div>

        <div class="user-card__loader"
             v-if="usersLoadingInProgress">
            <Loader/>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {UserInterface} from '~/models/users.models';
    import UserCardDetails from '~/components/UserCardDetails.vue';
    import Loader from '~/components/Loader.vue';

    export default Vue.extend({
        name: 'UserCard',
        components: {
            UserCardDetails,
            Loader,
        },
        props: {
            user: {
                type: Object as () => UserInterface,
                required: true,
            },
        },
        computed: {
            usersLoadingInProgress(): boolean {
                return this.$store.getters['users/loading'];
            },
        },
        methods: {
            showInfo(): void {
                alert(`My email is ${this.user.email}. Gender is ${this.user.gender}. Age is ${this.user.dob.age}`);
            },
        },
    });
</script>

<style lang="scss"
       scoped>
    .user-card {
        position: relative;
        display: flex;
        overflow: hidden;
        flex-direction: column;
        width: calc(50% - 1rem);
        margin: 0.5rem;
        padding: 20px 0 0;
        cursor: pointer;
        border-radius: 3px;
        background: #F9F9F9;
        box-shadow: 0 0 1px rgba(0, 0, 0, .5);

        @media (max-width: 991px) {
            width: 100%;
        }

        &:hover {
            &:before {
                background-color: #4d5860;
            }

            .user-card__inner {
                background-color: #2f495e;
            }

            ::v-deep .details__data {
                .value {
                    color: #fff;
                }
            }
        }

        &:before {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 130px;
            content: '';
            transition: background-color 150ms ease;
            background: #F9F9F9;

            @media (max-width: 575px) {
                height: 90px;
            }
        }

        &__inner {
            display: flex;
            align-items: center;
            flex-direction: column;
            transition: background-color 150ms ease;
            border-top: 1px solid rgba(0, 0, 0, .15);
            background: #fff;
        }

        &__photo {
            position: relative;
            overflow: hidden;
            width: 150px;
            height: 150px;
            margin-bottom: 30px;
            border: 1px solid rgba(0, 0, 0, 0.25);
            border-radius: 50%;

            @media (max-width: 575px) {
                width: 120px;
                height: 120px;
                margin-bottom: 20px;
            }

            img {
                width: 100%;
                height: 100%;
                border: 5px solid #fff;
                border-radius: 50%;
            }
        }

        &__loader {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background-color: rgba(#fff, 0.55);
        }
    }
</style>
