<template>
    <transition-group name="custom" tag="div" @beforeEnter="beforeEnter" @enter="enter" @leave="leave">
        <div class="row d-flex mb-3 align-items-center" v-for="(item, index) in getFilteredProduct" :key="item.id"
            :data-index="index">
            <div class="col-1 m-auto">
                <div class="btn btn-info" @click.stop="addToCart(item)">+</div>
            </div>
            <div class="col-sm-4">
                <img :src="item.image" :alt="item.name" class="img-fluid d-block">
            </div>
            <div class="col">
                <div class="text-info">{{ item.name }}</div>
                <div class="mb-0">{{ item.description }}</div>
                <div class="h5 float-right">
                    <Price :price="item.price" />
                </div>
            </div>
        </div>
    </transition-group>
</template>
<script>
import Price from './PriceItem.vue';

export default {
    name: 'product-list',
    components: { Price },
    methods: {
        beforeEnter(el) {
            el.className = 'd-none';
        },
        enter(el) {
            const delay = el.dataset.index * 100;
            setTimeout(() => {
                el.className = "row d-flex mb-3 align-items-center animate__animated animate__fadeInRight";
            }, delay);
        },
        leave(el) {
            const delay = el.dataset.index * 100;
            setTimeout(() => {
                el.className = "row d-flex mb-3 align-items-center animate__animated animate__fadeOutRight";
            }, delay);
        },

        addToCart(item) {
            this.$store.dispatch("addItemToCart", item)
        },

    },
    computed: {
        getProducts() {
            return this.$store.state.products
        },

        getFilteredProduct() {
            return this.$store.getters.filteredProduct
        }

    },

    mounted() {
        this.$store.dispatch("fetchProducts")
    }
}
</script>