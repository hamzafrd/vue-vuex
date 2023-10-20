<template>
    <div>
        <span>
            {{ this.prefix + Number.parseFloat(this.price).toFixed(this.precision) }}
        </span>
    </div>
</template>
<script>
export default {
    props: {
        price: {
            type: [String, Number]
        },
        prefix: {
            type: String,
            default: '$'
        },
        precision: {
            type: Number,
            default: 2
        }
    },
}
</script>