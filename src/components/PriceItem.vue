<template>
    <div>
        <span>
            {{ prefix + price.toFixed(precision) }}
        </span>
    </div>
</template>

<script setup lang="ts">

defineProps({
    price: {
        type: Number,
        default: 0
    },
    prefix: {
        type: String,
        default: '$'
    },
    precision: {
        type: Number,
        default: 2
    }
});
</script>
