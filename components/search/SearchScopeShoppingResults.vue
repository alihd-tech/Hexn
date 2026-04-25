<template>
  <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
    <article
      v-for="(result, index) in results"
      :key="`${result.url || result.domain || 'shop'}-${index}`"
      class="rounded-2xl border border-base-300/55 bg-base-100/90 p-4"
    >
      <div class="mb-3 flex h-32 items-center justify-center rounded-xl bg-base-200/70">
        <Icon name="heroicons:shopping-bag-20-solid" class="h-10 w-10 text-base-content/35" />
      </div>
      <h3 class="mb-1 line-clamp-2 text-sm font-semibold text-base-content" v-html="highlightSearchTerm(result.title, query)"></h3>
      <p class="mb-2 text-xs text-base-content/70">{{ result.domain }}</p>
      <a :href="result.url" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary w-full">
        View Product
      </a>
    </article>
  </div>
</template>

<script setup>
defineProps({
  results: {
    type: Array,
    default: () => []
  },
  query: {
    type: String,
    default: ''
  },
  highlightSearchTerm: {
    type: Function,
    required: true
  }
})
</script>
