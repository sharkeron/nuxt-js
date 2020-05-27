<template>
    <div class="details">
        <div class="details__data">
            <div class="desc">
                {{description[activeType].name}}
            </div>

            <div class="value">
                {{description[activeType].value}}
            </div>
        </div>

        <ul class="details__button-list">
            <li :class="{active: activeType === 'name'}"
                @mouseover="showDetail('name')"
                class="details__button name">
            </li>

            <li :class="{active: activeType === 'email'}"
                @mouseover="showDetail('email')"
                class="details__button email">
            </li>

            <li :class="{active: activeType === 'dob'}"
                @mouseover="showDetail('dob')"
                class="details__button dob">
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {UserInterface} from '~/models/users.models';

    interface UserCardDetailsDataInterface {
        activeType: string;
        description: { [key in DescriptionKeysEnum]: DescriptionObjectInterface };
    }

    interface DescriptionObjectInterface {
        name: string;
        value: string | null;
    }

    enum DescriptionKeysEnum {
        name = 'name',
        email = 'email',
        dob = 'dob'
    }

    export default Vue.extend({
        name: 'UserCardDetails',
        props: {
            user: {
                type: Object as () => UserInterface,
                required: true,
            },
        },
        data(): UserCardDetailsDataInterface {
            return {
                activeType: 'name',
                description: {
                    name: {
                        name: 'Hi, My name is',
                        value: `${this.user.name.first} ${this.user.name.last}`,
                    },
                    email: {
                        name: 'My email address is',
                        value: null,
                    },
                    dob: {
                        name: 'My birthday is',
                        value: null,
                    },
                },
            };
        },
        methods: {
            showDetail(type: 'name' | 'email' | 'dob'): void {
                this.activeType = type;

                switch (type) {
                    case 'name':
                        this.description[type].value = `${this.user.name.first} ${this.user.name.last}`;
                        break;

                    case 'email':
                        this.description[type].value = this.user.email;
                        break;

                    case 'dob':
                        this.description[type].value = new Date(this.user.dob.date).toLocaleDateString();
                        break;
                }
            },
        },
    });
</script>

<style lang="scss"
       scoped>
    .details {
        display: flex;
        align-items: stretch;
        flex-direction: column;
        width: 100%;

        &__data {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            width: 100%;

            .desc {
                font-size: 18px;
                color: #999;

                @media (max-width: 575px) {
                    font-size: 14px;
                }
            }

            .value {
                font-size: 28px;
                margin: 5px;
                transition: color 150ms ease;
                color: #2c2e31;

                @media (max-width: 575px) {
                    font-size: 16px;
                }
            }
        }

        &__button-list {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            padding: 0;
        }

        &__button {
            display: block;
            float: left;
            width: 40px;
            height: 48px;
            margin: 20px;
            cursor: pointer;
            transition: all .25s ease-out;
            background-image: url(~assets/images/card_icons.png);
            background-position-y: -48px;
            background-size: 378px;

            @media (max-width: 575px) {
                transform: scale(0.75);
            }

            &.name {
                background-position: 0 -48px;
            }

            &.email {
                background-position: -68px -48px;
            }

            &.dob {
                background-position: -135px -48px;
            }

            &.active {
                background-position-y: -96px;
            }
        }
    }
</style>
