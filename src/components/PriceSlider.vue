<template>
    <transition name="custom" enter-active-class="animate__animated animate__fadeInDown"
        leave-active-class="animate__animated animate__fadeOutUp">
        <div v-if="sliderStatus">
            <div class="d-flex flex-column align-items-center justify-content-center" :class="sliderState">
                <label class="font-weight-bold">Max Price</label>
                <input type="number" class="form-control" style="width: 80px;" v-model="maxAmount">
                <input type="range" class="custom-range" min="0" max="200" v-model="maxAmount">
            </div>
        </div>
    </transition>
</template>

<!-- Using composition -->
<script setup lang="ts">
import { useProductsStore } from '@/store/index-pinia';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const { maxPrice, sliderStatus } = storeToRefs(useProductsStore())
// const { setMaxPrice } = useProductsStore()

const maxAmount = ref(maxPrice)
// const updateMaxPrice = (price: number) => setMaxPrice(price)

const sliderState = computed(() => sliderStatus.value ? 'd-flex' : 'd-none')
</script>