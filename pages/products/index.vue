<template>
 <h2>Products list</h2>
 <div v-if="pending">Please wait. Loading....</div>
 <div v-else-if="error">Ups, something went wrong....</div>
 <div v-else >
  <ul class="d-flex">
   <li class="mx-3 list-unstyled" >
    <button type="button" class="btn btn-primary" @click.prevent="setSelectedCategory('')">All</button>
   </li>
   <li class="mx-3 list-unstyled" v-for="category in categories">
    <button type="button" class="btn btn-primary" @click.prevent="setSelectedCategory(category)">{{ category }}</button>
   </li>
  </ul>
  <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
 </div>
</template>
<script setup lang="ts">
import type {Product} from '~/types/Product';
import ProductCard from "~/components/ProductCard.vue";

const selectedCategory = ref('');
const setSelectedCategory = (selected: string): void => {
 selectedCategory.value = selected;
}
const {data: products, pending, error } = useAsyncData ('products-data', async ()=>{
 const response:any = await $fetch('https://dummyjson.com/products?delay=100');
 return response.products;
},{lazy: true});

const categories = computed(()=>{
 if (!products.value) return []
 const categories: string[] = products.value.map((product: Product) => product.category);
 return [...new Set(categories)];
});

const filteredProducts = computed(()=>{
 return products.value.filter((product:Product) => product.category.includes(selectedCategory.value));
})

</script>