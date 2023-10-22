<template>
    <transition-group v-if="products" name="custom" tag="div" @beforeEnter="beforeEnter" @enter="enter" @leave="leave">
        <div class="row d-flex mb-3 align-items-center" v-for="(item, index) in filteredProduct" :key="item.id"
            :data-index="index">
            <div class="col-1 m-auto">
                <div class="btn btn-info" @click.stop="addItemToCart(item)">+</div>
            </div>
            <div class="col-sm-4">
                <img :src="item.image" :alt="item.name" class="img-fluid d-block">
            </div>
            <div class="col">
                <div class="text-info">{{ item.name }}</div>
                <div class="mb-0">{{ item.description }}</div>
                <div class="h5 float-right">
                    <Price :price="Number(item.price)" />
                </div>
            </div>
        </div>
    </transition-group>
</template>

<script setup lang="ts">
import Price from './PriceItem.vue';

/**
 * Pinia
 */
import { useProductsStore } from '@/store/index-pinia'
import { storeToRefs } from 'pinia';

const store = useProductsStore()

// accesing action
const { addItemToCart, fetchProducts } = store
// or just like accesing something with vuex
// store.fetchProducts()

// accesing state/refs and getters
const { products, filteredProduct } = storeToRefs(store)

// prevent calling api if product already fetched
products.value.length < 1 ? fetchProducts() : undefined;

function beforeEnter(el: Element): void {
    el.className = 'd-none';
}

function enter(el: Element): void {
    if (el instanceof HTMLElement && el.dataset.index) {
        const delay = Number(el.dataset.index) * 100;
        setTimeout(() => {
            el.className = "row d-flex mb-3 align-items-center animate__animated animate__fadeInRight";
        }, delay);
    }
}

function leave(el: Element): void {
    if (el instanceof HTMLElement && el.dataset.index) {
        const delay = Number(el.dataset.index) * 100;
        setTimeout(() => {
            el.className = "row d-flex mb-3 align-items-center animate__animated animate__fadeOutRight";
        }, delay);
    }
}

/**
 * vuex
 */

// import { onMounted, computed } from 'vue';
// import { useStore } from 'vuex';
// const store = useStore()

// function addToCart(item) {
//     store.dispatch("addItemToCart", item)
// }

// const getFilteredProduct = computed(() => {
//     return store.getters.filteredProduct
// })

// onMounted(() => {
//     store.dispatch("fetchProducts")
// })
</script>