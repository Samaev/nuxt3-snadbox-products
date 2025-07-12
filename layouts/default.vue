<template>
 <Header/>
 <slot></slot>
 <h3>Footer</h3>
</template>
<script setup lang="ts">
useSeoMeta({
 title: 'Nuxt3 Products',
})
</script>