<template>
  <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
    <article
      v-for="(result, index) in results"
      :key="`${result.url || result.domain || 'image'}-${index}`"
      class="overflow-hidden rounded-2xl border border-base-300/60 bg-base-100/90 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <a :href="result.url" target="_blank" rel="noopener noreferrer" class="block">
        <div class="flex aspect-[16/10] items-center justify-center bg-base-200/60">
          <Icon name="heroicons:photo-20-solid" class="h-10 w-10 text-base-content/35" />
        </div>
        <div class="space-y-1 p-3">
          <h3 class="line-clamp-2 text-sm font-medium text-base-content" v-html="highlightSearchTerm(result.title, query)"></h3>
          <p class="truncate text-xs text-base-content/65">{{ result.domain }}</p>
        </div>
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
