<template>
  <div class="space-y-4 sm:space-y-5">
    <article
      v-for="(result, index) in results"
      :key="`${result.url || result.domain || 'all'}-${index}`"
      class="result-shell group"
    >
      <div class="mb-3 flex items-center justify-between gap-2">
        <div class="flex min-w-0 items-center gap-2">
          <img
            :src="`https://www.google.com/s2/favicons?domain=${result.domain}&sz=16`"
            :alt="result.domain"
            class="h-4 w-4 flex-shrink-0 rounded"
            @error="$event.target.style.display = 'none'"
          >
          <span class="truncate text-xs font-medium text-base-content/80">{{ result.domain }}</span>
        </div>
      </div>

      <h2 class="mb-2.5 text-lg font-semibold leading-snug sm:text-2xl">
        <a
          :href="result.url"
          target="_blank"
          rel="noopener noreferrer"
          class="line-clamp-2 text-primary transition-colors duration-200 hover:text-primary-focus hover:underline decoration-primary/55 decoration-2 underline-offset-4"
          v-html="highlightSearchTerm(result.title, query)"
        ></a>
      </h2>

      <div class="mb-2 flex items-center gap-2 text-xs text-base-content/65">
        <Icon name="heroicons:link-20-solid" class="h-3.5 w-3.5" />
        <a :href="result.url" target="_blank" rel="noopener noreferrer" class="truncate hover:text-base-content">
          {{ result.url }}
        </a>
      </div>

      <p
        class="mb-4 line-clamp-3 text-sm leading-relaxed text-base-content/90 sm:text-base"
        v-html="highlightSearchTerm(result.description, query)"
      ></p>

      <div v-if="result.date || result.rating || result.category" class="flex flex-wrap items-center gap-2.5">
        <span v-if="result.date" class="inline-flex items-center gap-1 rounded-lg bg-base-200/85 px-2 py-1 text-xs text-base-content/70">
          <Icon name="heroicons:calendar-days-20-solid" class="h-3.5 w-3.5" />
          {{ formatDate(result.date) }}
        </span>
        <span v-if="result.category" class="inline-flex items-center rounded-lg bg-primary/10 px-2 py-1 text-xs text-primary">
          {{ result.category }}
        </span>
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
