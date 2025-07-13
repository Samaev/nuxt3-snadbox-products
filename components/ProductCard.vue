<template>
 <NuxtLink :to="`/products/${props.product.id}`" class="card m-2">
  <div class="d-flex align-items-center justify-content-between card-header">
   <h3>
    {{ props.product.title }}
   </h3>
   <p class="badge bg-secondary">
    {{ props.product.category }}
   </p>
  </div>
  <div class="card-body d-flex align-items-center justify-content-between my-1 p-2" style="height: 120px">
   <img :src="props.product.thumbnail" class="img-thumbnail w-auto" style="height: 120px" alt="">
   <div>Price: {{ props.product.price}}</div>
   <div>Rating: {{ props.product.rating}}</div>
  </div>
 </NuxtLink>
</template>

<script setup lang="ts">
import type {Product} from "~/types/Product";

const props = defineProps<{
 product: Product
}>()
</script>