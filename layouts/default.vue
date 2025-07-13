<template>
 <div class="container">
  <Header/>
  <slot></slot>
  <h3>Footer</h3>
 </div>
</template>
<script setup lang="ts">
useSeoMeta({
 title: 'Nuxt3 Products',
})
</script>