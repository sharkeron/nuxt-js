<template>
    <ul class="pagination">
        <li class="pagination__item">
            <button :disabled="isInFirstPage || loading"
                    @click="onClickFirstPage"
                    type="button">
                First
            </button>
        </li>

        <li class="pagination__item">
            <button :disabled="isInFirstPage || loading"
                    @click="onClickPreviousPage"
                    type="button">
                Previous
            </button>
        </li>

        <li :key="page.name"
            class="pagination__item"
            v-for="page in pages">
            <button :class="{ active: isPageActive(page.name) }"
                    :disabled="page.isDisabled || loading"
                    @click="onClickPage(page.name)"
                    type="button">
                {{ page.name }}
            </button>
        </li>

        <li class="pagination__item">
            <button :disabled="isInLastPage || loading"
                    @click="onClickNextPage"
                    type="button">
                Next
            </button>
        </li>

        <li class="pagination__item">
            <button :disabled="isInLastPage || loading"
                    @click="onClickLastPage"
                    type="button">
                Last
            </button>
        </li>
    </ul>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'Pagination',
        props: {
            maxVisibleButtons: {
                type: Number as () => number,
                required: false,
                default: 3,
            },
            totalPages: {
                type: Number as () => number,
                required: true,
            },
            perPage: {
                type: Number as () => number,
                required: true,
            },
            currentPage: {
                type: Number as () => number,
                required: true,
            },
            loading: {
                type: Boolean as () => boolean,
                required: false,
                default: false,
            },
        },
        computed: {
            startPage(): number {
                if (this.currentPage === 1) {
                    return 1;
                }

                if (this.currentPage === this.totalPages) {
                    return +this.totalPages - +this.maxVisibleButtons + 1;
                }

                return +this.currentPage - 1;

            },
            endPage(): number {
                return Math.min(+this.startPage + +this.maxVisibleButtons - 1, +this.totalPages);
            },
            pages(): { name: number; isDisabled: boolean; }[] {
                const range = [];

                for (let i = +this.startPage; i <= this.endPage; i++) {
                    range.push({
                        name: i,
                        isDisabled: i === this.currentPage,
                    });
                }

                return range;
            },
            isInFirstPage(): boolean {
                return this.currentPage === 1;
            },
            isInLastPage(): boolean {
                return this.currentPage === this.totalPages;
            },
        },
        methods: {
            onClickFirstPage(): void {
                this.$emit('pageChanged', 1);
            },
            onClickPreviousPage(): void {
                this.$emit('pageChanged', +this.currentPage - 1);
            },
            onClickPage(page: number): void {
                this.$emit('pageChanged', page);
            },
            onClickNextPage(): void {
                this.$emit('pageChanged', +this.currentPage + 1);
            },
            onClickLastPage(): void {
                this.$emit('pageChanged', +this.totalPages);
            },
            isPageActive(page: number): boolean {
                return +this.currentPage === page;
            },
        },
    });
</script>

<style lang="scss"
       scoped>
    .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin: 25px 0 0;
        padding: 0;
        list-style-type: none;

        &__item {
            display: block;
            min-width: 30px;
            height: 30px;

            &:not(:last-child) {
                margin-right: 5px;
            }

            .active {
                color: #ffffff;
                background-color: #4AAE9B;
            }

            button {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                transition: background-color 150ms ease, color 150ms ease;
                color: #2f495e;
                border: 0;
                background-color: rgba(#2f495e, 0.25);

                &:not(:disabled):not(.active):hover {
                    color: #fff;
                    background-color: #2f495e;
                }

                &:disabled:not(.active) {
                    opacity: 0.75;
                }
            }
        }
    }
</style>
