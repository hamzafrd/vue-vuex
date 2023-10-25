<template>
    <div>
        <nav class="navbar navbar-expand-sm bg-body-tertiary">
            <h1 class="navbar-brand mx-2 fs-2">{{ title }}</h1>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
                aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse d-lg-flex" id="navbarScroll">
                <form class="input-group my-lg-0 my-3 navbar-nav-scroll flex-lg-grow-1 mx-lg-5" role="search"
                    @submit.prevent="search">
                    <span class="input-group-text">
                        <font-awesome-icon icon="magnifying-glass" />
                    </span>
                    <input class="form-control" type="search" placeholder="Search" aria-label="Search" v-model="query">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                <div class="navbar-nav-lg mt-lg-0 mt-sm-3 d-flex justify-content-center">
                    <div v-if="cart.length >= 0">
                        <div class="nav-item dropdown border" :class="{ 'blink': error }">
                            <button class="dropdown-toggle btn btn-success" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <div>
                                    <b>Cart :</b>
                                    <span class="badge rounded-pill text-bg-warning">
                                        <font-awesome-icon icon="shopping-cart" />
                                        <span
                                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {{ cartQty }}
                                            <span class="visually-hidden">unread messages</span>
                                        </span>
                                    </span>
                                </div>
                                <price :price="cartTotal" />
                            </button>
                            <div class="dropdown-menu pb-0" data-bs-theme="light">
                                <div v-for="( item, index ) in   cart  " :key="index">
                                    <div class="align-items-center p-2">
                                        <p class=" text-center text-wrap m-0 p-0">{{ item.product.name }}</p>
                                        <div class="d-flex flex-column justify-content-center align-items-center">
                                            <b>
                                                <Price :price="Number(item.product.price) * item.qty"></Price>
                                            </b>
                                            <div>
                                                <span> Qty<b> : {{ item.qty }}</b> </span>
                                                <a class="badge text-bg-success ms-2" href="#"
                                                    @click.stop="addItemToCart(item.product)">
                                                    <font-awesome-icon icon="plus" />
                                                </a>
                                                <a class="badge text-bg-danger ms-2" href="#"
                                                    @click.stop="removeItem(index)">
                                                    <font-awesome-icon icon="trash-can" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <hr class="dropdown-divider m-0">
                                </div>
                                <hr class="dropdown-divider m-0">
                                <router-link class="dropdown-item m-0 text-center hover-bg-warning" to="/checkout">
                                    <b>CheckOut</b>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-sm btn-outline-success mx-2 px-4" @click="changeSliderStatus">
                        <font-awesome-icon icon="dollar-sign"></font-awesome-icon>
                    </button>
                </div>
            </div>
        </nav>
        <PriceSlider />
    </div>
</template>

<!-- Using Composition and pinia -->
<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Price from './PriceItem.vue';
import PriceSlider from './PriceSlider.vue'

import { useProductsStore } from '@/store/index-pinia';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';


const { changeSliderStatus, removeItem, addItemToCart } = useProductsStore()
const { cart, cartTotal, cartQty, title, error, searchQuery } = storeToRefs(useProductsStore())

const query = ref('')
const search = () => {
    searchQuery.value = query.value
}
</script>

<style scoped lang="scss">
.hover-bg-warning {
    &:hover {
        background-color: #ffc107;
    }
}


@keyframes blink {
    0% {
        opacity: 1;
    }

    25% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    75% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.blink {
    animation: blink 2s normal;
}
</style>
<!-- Vuex -->
<!-- <script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Price from './PriceItem.vue';

export default {
    name: 'nav-bar',
    components: {
        Price,
        FontAwesomeIcon
    },

    methods: {
        toggleSlider() { this.$store.dispatch("changeSliderStatus") },
        toggleDelete(key) { this.$store.commit("removeItem", key) }
    },

    computed: {
        getCart() { return this.$store.state.cart },
        cartTotal() { return this.$store.getters.cartTotal },
        cartQty() { return this.$store.getters.cartQty }
    }
}
</script> -->
<style lang="css"></style>