import { createStore } from "vuex";
import axios from 'axios'
export default createStore({
    state: {
        products: [],
        cart: [],
        maxPrice: 3,
        sliderStatus: false,

        error: null,
        loading: false,
    },

    actions: {
        /** 
         * Better way using Promise
        */

        // fetchProducts() {
        //     return new Promise((resolve, reject) => {
        //         axios.get('https://hplussport.com/api/products/order/price')
        //             .then(response => resolve(response.data))
        //             .catch(e => reject(e))
        //     })
        // }

        /**
         * Proper Way using VueX action
         */
        fetchProducts({ commit }) {
            commit('setProductsData')
        },

        changeSliderStatus({ commit }) {
            commit("setSliderStatus")
        },

        addItemToCart({ commit }, product) {
            commit('addItemCartWithQtyFromProduct', product)
        },

        addPriceToSum({ commit }) {
            commit("cartTotal")
        },
    },

    getters: {
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
            state.cart.forEach((key, index) => {
                const qty = state.cart[index].qty
                sum += qty
            })
            return sum
        }
    },

    mutations: {
        async setProductsData(state) {
            let product;
            state.loading = true

            try {
                product = await axios
                    .get('https://hplussport.com/api/products/order/price')
                    .then(response => response.data)
                    .catch(e => {
                        state.error = e.message
                        console.log(e.message);
                        return []
                    })

            } catch (e) {
                state.error = e
                console.log(e);
            } finally {
                state.loading = false
            }
            state.products = product
        },

        setSliderStatus(state) {
            state.sliderStatus = !state.sliderStatus
        },

        setMaxPrice(state, maxPrice) {
            state.maxPrice = maxPrice
        },

        addItemCartWithQtyFromProduct(state, productData) {
            let productIndex;
            const productExist = state.cart.filter((item, index) => {
                if (item.product.id == Number(productData.id)) {
                    productIndex = index
                    return true
                } else {
                    return false
                }
            })

            if (productExist.length) {
                state.cart[productIndex].qty++
            } else {
                state.cart.push({ product: productData, qty: 1 })
            }
        },


        removeItem: function (state, key) {
            if (state.cart[key].qty > 1) {
                state.cart[key].qty--
            } else {
                state.cart.splice(key, 1)
            }
        },
    }
})