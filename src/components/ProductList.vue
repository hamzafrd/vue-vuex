<template>
    <div class="h-100">
        <transition-group class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4" name="custom" tag="div"
            @beforeEnter="beforeEnter" @enter="enter" @leave="leave">
            <div class="d-flex mt-3" v-for="(item, index) in filteredProducts" :key="item.id" :data-index="index">
                <div class="card">
                    <img :src="item.image" :alt="item.name">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title"> {{ item.name }} </h5>
                        <p class="card-text flex-fill"> {{ item.description }} </p>
                        <div class="d-flex justify-content-evenly align-items-center">
                            <a href="#" class="btn btn-primary" @click="addItemToCart(item)" :class="isItemInCart(item.id)">
                                {{ isItemInCart(item.id) == "disabled" ? "Already in cart" : "Add to cart" }}
                            </a>
                            <span class="d-inline-block text-center">
                                <p class="p-0 m-0">
                                    Price
                                </p>
                                <p class="p-0 m-0">
                                    <b>
                                        <Price :price="Number(item.price)" />
                                    </b>
                                </p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </transition-group>
        <div v-if="products.length && filteredProducts.length < 1"
            class="h-100 d-flex justify-content-center align-items-center">
            <h1>Items "{{ searchQuery }}" Not Found</h1>
        </div>
    </div>
</template>

<script setup lang="ts">

import Price from './PriceItem.vue';

import { useProductsStore } from '@/store/index-pinia'
import { storeToRefs } from 'pinia';

const store = useProductsStore()

// accesing action
const { addItemToCart, fetchProducts, setTitle, searchQuery } = store

// accesing state/refs and getters
const { products, filteredProducts, isItemInCart } = storeToRefs(store)
// prevent calling api if product already fetched
products.value.length < 1 ? fetchProducts() : undefined;
setTitle('IDShop')

function beforeEnter(el: Element): void {
    el.className = 'd-none';
}

function enter(el: Element): void {
    if (el instanceof HTMLElement && el.dataset.index) {
        const delay = Number(el.dataset.index) * 100;
        setTimeout(() => {
            filteredProducts.value.length > 0
                ? el.className = "d-flex mt-3 animate__animated animate__fadeInRight"
                : el.className = "d-none"
        }, delay);
    }
}

function leave(el: Element): void {
    if (el instanceof HTMLElement && el.dataset.index) {
        const delay = Number(el.dataset.index) * 100;
        setTimeout(() => {
            el.className = "animate__animated animate__fadeOutRight";
        }, delay);
    }
}
</script>

<style scoped>
img {
    height: 285px;
    object-fit: contain;
}

.card-title {
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
}

.card-text {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    /* number of lines to show */
    line-clamp: 5;
    -webkit-box-orient: vertical;
}
</style>