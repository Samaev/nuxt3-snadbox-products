<template>
 <div class="card h-100" v-if="product">
  <div class="card-header">
   {{ product.title }}
  </div>
  <div class="card-body overflow-y-scroll">
   <img :src="product.images[0]" alt="" style="height: 100px;width: auto">
   {{ product.description }}
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

</script>