<template>
  <div class="space-y-3">
    <article
      v-for="(result, index) in results"
      :key="`${result.url || result.domain || 'news'}-${index}`"
      class="rounded-2xl border border-base-300/60 bg-base-100/85 p-4"
    >
      <div class="mb-2 flex items-center gap-2 text-xs text-base-content/65">
        <span class="font-medium">{{ result.domain }}</span>
        <span class="h-1 w-1 rounded-full bg-base-content/35"></span>
        <span>{{ formatDate(result.date) || 'Latest' }}</span>
      </div>
      <h3 class="mb-2 text-lg font-semibold">
        <a
          :href="result.url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary hover:underline"
          v-html="highlightSearchTerm(result.title, query)"
        ></a>
      </h3>
      <p class="line-clamp-3 text-sm text-base-content/85" v-html="highlightSearchTerm(result.description, query)"></p>
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
  },
  formatDate: {
    type: Function,
    required: true
  }
})
</script>
