<template>
  <div class="min-h-screen">
    <NuxtPage />
  </div>
</template>

<script setup>
onMounted(() => {
  // Set default theme on app load
  if (process.client && !document.documentElement.hasAttribute('data-theme')) {
    document.documentElement.setAttribute('data-theme', 'light')
  }
})
</script>