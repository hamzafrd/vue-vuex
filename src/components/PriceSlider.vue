<template lang="html">
    <transition name="custom" enter-active-class="animate__animated animate__fadeInDown"
        leave-active-class="animate__animated animate__fadeOutUp">
        <div v-if="sliderStatus">
            <div class="d-flex flex-column align-items-center justify-content-center" :class="sliderState">
                <label class="font-weight-bold mr-2">Max Price</label>
                <input type="number" class="form-control mx-2" style="width: 60px; text-align: center;" v-model="maxAmount"
                    @change="updateMaxPrice(maxAmount)">
                <input type="range" class="custom-range" min="0" max="100" v-model="maxAmount"
                    @change="updateMaxPrice(maxAmount)">
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
const { setMaxPrice } = useProductsStore()

const maxAmount = ref(maxPrice)
const updateMaxPrice = (price: number) => setMaxPrice(price)

const sliderState = computed(() => sliderStatus.value ? 'd-flex' : 'd-none')
</script>

<!-- <script>
/**
 * Vuex
 */
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'price-slider',
    data() {
        return {
            maxAmount: this.maxPrice
        }
    },
    setup() {
        const store = useStore()

        const maxPrice = store.state.maxPrice
        const updateMaxPrice = (price) => store.commit('setMaxPrice', price)

        const sliderStatus = computed(() => store.state.sliderStatus)
        const sliderState = computed(() => sliderStatus.value ? 'd-flex' : 'd-none')

        return {
            updateMaxPrice,
            sliderState,
            sliderStatus,
            maxPrice
        }
    }
}
</script> -->