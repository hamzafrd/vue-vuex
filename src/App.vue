<template>
  <div id="app" class="h-100 d-flex" :class="isLoading">
    <nav-bar v-if="!loading" />
    <router-view :class="{ 'flex-fill': !loading }" />
    <h1 v-if="loading">Loading...</h1>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue"

import { useProductsStore } from '@/store/index-pinia'
import { storeToRefs } from 'pinia';
import { computed } from "vue";
const { loading } = storeToRefs(useProductsStore())

const isLoading = computed(() =>
  loading.value
    ? "justify-content-center align-items-center"
    : "flex-column container-fluid"
)

/**
 * Vuex
*/
// import { computed } from 'vue';
// import { useStore } from 'vuex';

// const store = useStore()

// const loading = computed(() => store.state.loading)
// const isLoading = computed(() => loading.value ? 'h-100  d-flex justify-content-center align-items-center' : 'mt-5')
</script>