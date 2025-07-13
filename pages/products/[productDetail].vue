<template>
 <div class="card" v-if="product">
  <div class="card-header">
   {{ product.title }}
  </div>
  <div class="card-body overflow-y-scroll">
   <NuxtImg
     width="400"
     height="400"
     :src="product.images[0]"
     :alt="product.title"
     :placeholder="[50, 25]"
     loading="lazy"
   />
   <div class="text-primary">
    {{ product.description }}
   </div>
  </div>
  <div class="card-footer"></div>
 </div>
<div v-else-if="pending">pending</div>
 <div v-else-if="error"> Ops, seems like the product is lost</div>
</template>

<script setup lang="ts">
import type {Product} from "~/types/Product";

const route = useRoute();

const productId = route.params.productDetail;
const url = 'https://dummyjson.com/products/' + productId;
const { data: product, pending, error } = useAsyncData<Product>('product', async () => {
  const response =  await fetch(url);
 return response.json();
})

const productTitle = computed(()=>{
 return 'Nuxt: ' + product.value?.title
})

const productDescription = computed(()=>{
 return productTitle.value + " " + product.value?.description
})
useSeoMeta({
 title: ()=>productTitle.value,
 description: ()=>productDescription.value
})

</script>