<template>
  <div class="space-y-4">
    <article
      v-for="(result, index) in results"
      :key="`${result.url || result.domain || 'map'}-${index}`"
      class="rounded-2xl border border-base-300/60 bg-base-100/90 p-4"
    >
      <div class="mb-3 flex h-36 items-center justify-center rounded-xl bg-base-200/70">
        <Icon name="heroicons:map-pin-20-solid" class="h-11 w-11 text-base-content/35" />
      </div>
      <h3 class="mb-1 text-base font-semibold" v-html="highlightSearchTerm(result.title, query)"></h3>
      <p class="mb-3 line-clamp-2 text-sm text-base-content/75" v-html="highlightSearchTerm(result.description, query)"></p>
      <div class="flex items-center justify-between gap-2 text-xs">
        <span class="truncate text-base-content/70">{{ result.domain }}</span>
        <a :href="result.url" target="_blank" rel="noopener noreferrer" class="font-medium text-primary hover:underline">
          Open map
        </a>
      </div>
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
