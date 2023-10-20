<template lang="html">
    <div class="navbar navbar-light fixed-top">
        <div class="navbar-text ml-auto d-flex">
            <button class="btn btn-sm btn-outline-success" @click="toggleSlider">
                <!-- <i class="fas fa-dollar-sign"></i> -->
                <font-awesome-icon icon="dollar-sign"></font-awesome-icon>
            </button>

            <div class="ml-2" v-if="getCart.length >= 0">
                <button class="btn btn-success btn-sm dropdown-toggle" id="dropdownCart" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <b>Cart :</b>
                    <span class="badge-pill badge-warning">{{ cartQty }}</span>
                    <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
                    <price :price="cartTotal"></price>
                </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownCart">
                    <div v-for="(item, index) in  getCart " :key="index">
                        <div class="dropdown-item-text text-nowrap text-right">
                            <span class="badge badge-pill badge-warning align-text-top mr-1">
                                {{ item.qty }}
                            </span>
                            {{ item.product.name }}
                            <b>
                                <Price :price="item.product.price * item.qty"></Price>
                            </b>
                            <a href="#" class="badge badge-danger text-white" @click.stop="toggleDelete(index)">-</a>

                        </div>
                    </div>
                    <router-link class="btn btn-sm btn-outline-info text-dark float-right mr-2" to="/checkout">
                        CheckOut
                    </router-link>

                </div>
            </div>

        </div>
    </div>
</template>
<script>
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
</script>
<style lang="css"></style>