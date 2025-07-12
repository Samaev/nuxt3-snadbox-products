<template>
 <NuxtLink to="/products/1" class="card p-2 m-1">
  <div class="d-flex align-items-center justify-content-between card-header">
   <h3>
    {{ props.product.title }}
   </h3>
   <p class="badge bg-secondary">
    {{ props.product.category }}
   </p>
  </div>
  <div class="card-body d-flex align-items-center justify-content-between">
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