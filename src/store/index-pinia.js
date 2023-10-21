import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductsStore = defineStore('store', {
    state: () => ({
        products: [],
        cart: [],

        maxPrice: 3,
        sliderStatus: false,

        error: null,
        loading: false,
    }),

    actions: {
        async fetchProducts() {
            console.log('fetching....');
            if (this.products.length >= 1) return

            this.loading = true
            try {
                this.products = await axios
                    .get('https://hplussport.com/api/products/order/price')
                    .then(response => { return response.data })
                    .catch(e => {
                        console.log(e)
                        this.error = e
                        return []
                    })
            } catch (e) {
                console.log(e);
                this.error = e
            } finally {
                console.log('Done !');
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
        isLoading(state) {
            return state.loading ? 'h-100  d-flex justify-content-center align-items-center' : 'mt-5'
        },

        filteredProduct: (state) => {
            return state.products.filter((item) => item.price <= state.maxPrice);
        },

        cartTotal(state) {
            let sum = 0
            const cart = state.cart
            cart.forEach((key, index) => {
                const totalPrice = cart[index].product.price * cart[index].qty
                sum += totalPrice
            })
            return sum;
        },

        cartQty(state) {
            let sum = 0
            this.cart.forEach((key, index) => {
                const qty = state.cart[index].qty
                sum += qty
            })
            return sum
        }
    },
})