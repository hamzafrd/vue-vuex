import { Product, Cart } from "./../interface/index";
import { defineStore } from "pinia";
import axios from "axios";

export const useProductsStore = defineStore("store", {
  state: () => ({
    products: [] as Product[],
    cart: [] as Cart[],

    maxPrice: 200,
    sliderStatus: false,

    error: false,
    loading: false,

    title: "",
    searchQuery: "",
  }),

  actions: {
    async fetchProducts(): Promise<void> {
      console.log("fetching....");
      if (this.products.length >= 1) return;
      this.loading = true;
      try {
        this.products = await axios
          .get("https://hplussport.com/api/products/order/price")
          .then((response) => {
            // console.log(response.data);

            return response.data;
          })
          .catch((e) => {
            console.log(e);
            this.error = e;
            return [];
          });
        // console.log(this.products);
      } catch (e: any) {
        console.log(e);
        this.error = e;
      } finally {
        console.log("Done !");
        this.loading = false;
      }
    },

    changeSliderStatus(): void {
      this.sliderStatus = !this.sliderStatus;
    },

    addItemToCart(productData: Product): void {
      let productIndex: number = 0;
      // this.isClicked = false;

      const productExist = this.cart.filter((item: Cart, index: number) => {
        if (Number(item.product.id) == Number(productData.id)) {
          productIndex = index;
          return true;
        } else {
          return false;
        }
      });

      if (productExist.length) {
        this.cart[productIndex].qty++;
      } else {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 2000);
        this.cart.push({ product: productData, qty: 1 });
      }
    },

    setProductsData(productsData: Product[]): void {
      this.products = productsData;
    },

    setMaxPrice(maxPrice: number): void {
      this.maxPrice = maxPrice;
    },

    removeItem: function (key: number): void {
      if (this.cart[key].qty > 1) {
        this.cart[key].qty--;
      } else {
        this.cart.splice(key, 1);
      }
    },

    setTitle(name: string): void {
      this.title = name;
    },

    setSearchQuery(query: string): void {
      this.searchQuery = query;
    },
  },

  getters: {
    isItemInCart(state) {
      return (itemId: string) => {
        // let isDisabled: string = "";
        // state.cart.forEach((e) => {
        //   if (e.product.id === itemId) {
        //     isDisabled = "disabled";
        //   }
        // });
        // return isDisabled;
        for (const cartItem of state.cart) {
          if (cartItem.product.id === itemId) {
            return "disabled";
          }
        }
      };
    },

    filteredProducts: (state) => {
      return state.products.filter(
        (item) =>
          Number(item.price) <= state.maxPrice &&
          item.name.toLocaleLowerCase().match(state.searchQuery.toLocaleLowerCase())
      );
    },

    cartTotal(state) {
      let sum = 0;
      const cart = state.cart;
      cart.forEach((_, index: number) => {
        const totalPrice = Number(cart[index].product.price) * cart[index].qty;
        sum += totalPrice;
      });
      return sum;
    },

    cartQty(state) {
      let sum = 0;
      this.cart.forEach((_, index) => {
        const qty = state.cart[index].qty;
        sum += qty;
      });
      return sum;
    },
  },
});
