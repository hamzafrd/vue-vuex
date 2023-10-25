<template>
    <div>
        <div class="border rounded overflow-hidden">
            <table class="table table-hover m-0" v-if="cart.length">
                <thead>
                    <tr class="rounded">
                        <th scope="col"></th>
                        <th scope="col" class="text-right">Item</th>
                        <th scope="col" class="text-center">Qty</th>
                        <th scope="col" class="text-center">Price</th>
                        <th scope="col" class="text-center">Sub-total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in cart" :key="item.product.id">
                        <td class="text-center">
                            <div class="btn-group">
                                <button @click="addItemToCart(item.product)" class="btn btn-info">+</button>
                                <button @click="removeItem(index)" class=" btn btn-outline-info">-</button>
                            </div>
                        </td>
                        <th scope="row">{{ item.product.name }} </th>
                        <th class="text-center"> {{ item.qty }} </th>
                        <th class="text-center">
                            <Price :price="Number(item.product.price)" />
                        </th>
                        <th class="text-center">
                            <Price :price="Number(item.product.price) * item.qty" />
                        </th>
                    </tr>
                    <tr class="h3 text-center">
                        <b>Total :</b>
                        <price class=" d-block text-success font-weight-light" :price="Number(cartTotal)" />
                    </tr>
                </tbody>
            </table>
        </div>
        <router-link class="btn btn-sm btn-info text-white mt-3" to="/">Back To Shop</router-link>
    </div>
</template>

<!-- Using composition and pinia -->
<script setup lang="ts">
import Price from '@/components/PriceItem.vue'

import { useProductsStore } from '@/store/index-pinia';
import { storeToRefs } from 'pinia';
const { cart, cartTotal } = storeToRefs(useProductsStore())
const { addItemToCart, removeItem, setTitle } = useProductsStore()
setTitle('CheckOut')
</script>

<!-- <script>
import { useStore } from 'vuex';
import { computed } from 'vue';

import Price from '@/components/PriceItem.vue'

export default {
    name: "check-out",
    components: {
        Price
    },

    setup() {
        const store = useStore()

        const cart = computed(() => { return store.state.cart })
        const cartTotal = computed(() => { return store.getters.cartTotal })

        const addItem = (item) => {
            store.dispatch("addItemToCart", item)
        }

        const removeItem = (index) => {
            store.commit("removeItem", index)
        }

        return { cart, addItem, removeItem, cartTotal }
    }
}
</script> -->