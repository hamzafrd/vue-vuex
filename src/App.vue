<template>
  <div id="app" class="container" :class="isLoading">
    <div v-if="!loading">
      <nav-bar />
      <h1>IDShop</h1>
    </div>

    <div v-if="loading">
      <h1>Loading...</h1>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue"

import { useProductsStore } from '@/store/index-pinia'
import { storeToRefs } from 'pinia';

const { loading, isLoading } = storeToRefs(useProductsStore())

/**
 * Vuex
*/
// import { computed } from 'vue';
// import { useStore } from 'vuex';

// const store = useStore()

// const loading = computed(() => store.state.loading)
// const isLoading = computed(() => loading.value ? 'h-100  d-flex justify-content-center align-items-center' : 'mt-5')
</script>