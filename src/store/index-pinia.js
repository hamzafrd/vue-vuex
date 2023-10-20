// import { createStore } from "vuex";
import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductsStore = defineStore({
    state: {
        products: [],
        cart: [],

        maxPrice: 3,
        sliderStatus: false,

        error: null,
        loading: false,
    },

    actions: {
        async fetchProducts() {
            this.products = []
            this.loading = true
            try {
                this.products = await axios.get('https://hplussport.com/api/products/order/price')
                    .then(response => response.data)
                    .catch(e => console.log(e))
            } catch (e) {
                console.log(e);
                this.error = e
            } finally {
                this.loading = false
            }
        },

        changeSliderStatus() {
            this.sliderStatus = !this.sliderStatus
        },

        addItemToCart(productData) {
            let productIndex;
            const productExist = this.cart.filter((item, index) => {
                if (item.product.id == Number(productData.id)) {
                    productIndex = index
                    return true
                } else {
                    return false
                }
            })

            if (productExist.length) {
                this.cart[productIndex].qty++
            } else {
                this.cart.push({ product: productData, qty: 1 })
            }
        },

        setProductsData(productsData) {
            this.products = productsData
        },

        setMaxPrice(maxPrice) {
            this.maxPrice = maxPrice
        },

        removeItem: function (key) {
            if (this.cart[key].qty > 1) {
                this.cart[key].qty--
            } else {
                this.cart.splice(key, 1)
            }
        },
    },

    getters: {
        filteredProduct: () => {
            return this.products.filter((item) => item.price <= this.maxPrice);
        },

        cartTotal() {
            let sum = 0
            const cart = this.cart
            cart.forEach((key, index) => {
                const totalPrice = cart[index].product.price * cart[index].qty
                sum += totalPrice
            })
            return sum;
        },

        cartQty() {
            let sum = 0
            this.cart.forEach((key, index) => {
                const qty = this.cart[index].qty
                sum += qty
            })
            return sum
        }
    },
})