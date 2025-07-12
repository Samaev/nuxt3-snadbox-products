import {defineStore} from "pinia";
import type {Product} from "~/types/Product";

interface ProductsState {
    list: Product[]
}
export const useProductsStore = defineStore('products', {
    state: (): ProductsState=>({
        list: []
    }),
    getters:{
        allProducts:(state) =>state.list
    },
    actions: {
        async fetchProducts ()  {
            try {
                const response: any  = await $fetch('https://dummyjson.com/products?delay=100');
                this.list = response.products;
            } catch (e) {
                console.error(e);
                throw e;
            }
        }
    }
})