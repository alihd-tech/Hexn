<template>
  <div class="space-y-4">
    <article
      v-for="(result, index) in results"
      :key="`${result.url || result.domain || 'video'}-${index}`"
      class="overflow-hidden rounded-2xl border border-base-300/55 bg-base-100/90"
    >
      <div class="flex flex-col sm:flex-row">
        <a :href="result.url" target="_blank" rel="noopener noreferrer" class="flex h-40 items-center justify-center bg-base-200/60 sm:w-64">
          <Icon name="heroicons:play-circle-20-solid" class="h-12 w-12 text-base-content/45" />
        </a>
        <div class="flex-1 p-4">
          <h3 class="mb-2 text-lg font-semibold">
            <a
              :href="result.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary hover:underline"
              v-html="highlightSearchTerm(result.title, query)"
            ></a>
          </h3>
          <p class="mb-3 line-clamp-2 text-sm text-base-content/80" v-html="highlightSearchTerm(result.description, query)"></p>
          <div class="flex items-center gap-2 text-xs text-base-content/65">
            <span>{{ result.domain }}</span>
            <span class="h-1 w-1 rounded-full bg-base-content/30"></span>
            <span>{{ formatDate(result.date) || 'Recently indexed' }}</span>
          </div>
        </div>
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
  },
  formatDate: {
    type: Function,
    required: true
  }
})
</script>
