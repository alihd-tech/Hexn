<template>
  <div class="min-h-screen bg-base-100 text-base-content">
 

    <!-- Header -->
    <header class="glass-bg border-b border-base-300/50 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center space-x-3">
            <h1 class="Hexn-logo font-bruno text-2xl md:text-3xl">
              Hexn
            </h1>
          </NuxtLink>
          
          <div class="flex items-center space-x-4">
            <NuxtLink 
              to="/search" 
              class="btn btn-sm btn-outline"
            >
              <Icon name="heroicons:magnifying-glass-20-solid" class="w-4 h-4 mr-2" />
              Search
            </NuxtLink>
            
            <button
              @click="toggleDarkMode"
              class="p-2 rounded-lg hover:bg-base-200 transition-all duration-300 focus-ring scale-hover"
              :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <Icon :name="isDarkMode ? 'heroicons:sun-20-solid' : 'heroicons:moon-20-solid'" class="w-5 h-5 text-base-content/70" />
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 py-8">
      <article v-if="data" class="glass-card p-8">
        <!-- Article Header -->
        <header class="mb-8">
          <div class="flex flex-wrap items-center gap-2 mb-4">
            <span class="badge badge-primary">{{ data.category }}</span>
            <span v-if="data.date" class="typography-caption text-sm text-base-content/60">
              {{ formatDate(data.date) }}
            </span>
            <span v-if="data.author" class="typography-caption text-sm text-base-content/60">
              by {{ data.author }}
            </span>
          </div>
          
          <h1 class="font-bruno text-3xl md:text-4xl font-bold mb-4">
            {{ data.title }}
          </h1>
          
          <p v-if="data.description" class="font-lato text-lg text-base-content/80 leading-relaxed">
            {{ data.description }}
          </p>
          
          <!-- Rating and Reviews -->
          <div v-if="data.rating || data.reviews" class="flex items-center space-x-4 mt-4">
            <div v-if="data.rating" class="flex items-center space-x-2">
              <div class="rating rating-sm">
                <input 
                  v-for="star in 5" 
                  :key="star"
                  type="radio" 
                  name="article-rating" 
                  class="mask mask-star-2 bg-orange-400" 
                  :checked="star <= data.rating"
                  disabled
                />
              </div>
              <span class="typography-caption text-sm text-base-content/60">
                {{ data.rating }}/5
              </span>
            </div>
            <span v-if="data.reviews" class="typography-caption text-sm text-base-content/60">
              ({{ data.reviews }} reviews)
            </span>
          </div>
        </header>

        <!-- Article Content -->
        <div class="prose prose-lg max-w-none">
          <ContentRenderer :value="data" class="font-lato" />
        </div>

        <!-- Keywords -->
        <footer v-if="data.keywords && data.keywords.length" class="mt-8 pt-6 border-t border-base-300/50">
          <h3 class="typography-heading text-lg font-semibold mb-3">Related Topics</h3>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="keyword in data.keywords" 
              :key="keyword"
              class="badge badge-outline"
            >
              {{ keyword }}
            </span>
          </div>
        </footer>
      </article>

      <!-- Loading State -->
      <div v-else class="glass-card p-8 animate-pulse">
        <div class="h-8 bg-base-300 rounded w-3/4 mb-4"></div>
        <div class="h-4 bg-base-300 rounded w-1/2 mb-6"></div>
        <div class="space-y-3">
          <div class="h-4 bg-base-300 rounded"></div>
          <div class="h-4 bg-base-300 rounded"></div>
          <div class="h-4 bg-base-300 rounded w-5/6"></div>
        </div>
      </div>

      <!-- Back to Search -->
      <div class="mt-8 text-center">
        <NuxtLink to="/search" class="btn btn-outline">
          <Icon name="heroicons:arrow-left-20-solid" class="w-4 h-4 mr-2" />
          Back to Search
        </NuxtLink>
      </div>
    </main>
 
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const route = useRoute()
const isDarkMode = ref(false)

// Fetch the content based on the slug
const { data } = await useAsyncData(`content-${route.params.slug}`, () => 
  queryContent(`/topics/${route.params.slug}`).findOne()
)

const formatDate = (dateString) => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value

  if (process.client) {
    const html = document.documentElement
    if (isDarkMode.value) {
      html.setAttribute('data-theme', 'dark')
    } else {
      html.setAttribute('data-theme', 'light')
    }

    localStorage.setItem('hexn-dark-mode', isDarkMode.value.toString())
  }
}

onMounted(() => {
  if (process.client) {
    const stored = localStorage.getItem('hexn-dark-mode')
    isDarkMode.value = stored === 'true'
    const html = document.documentElement
    html.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light')
  }
})

// SEO
useHead({
  title: data.value ? `${data.value.title} - Hexn` : 'Topic - Hexn',
  meta: [
    {
      name: 'description',
      content: data.value?.description || 'Learn more about this topic on Hexn'
    },
    {
      name: 'keywords',
      content: data.value?.keywords?.join(', ') || ''
    }
  ]
})
</script>

<style scoped>
.prose {
  color: inherit;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  font-family: 'Bruno Ace SC', monospace;
  color: inherit;
}

.prose p,
.prose li,
.prose td,
.prose th {
  font-family: 'Lato', sans-serif;
}

.prose a {
  color: hsl(var(--p));
  text-decoration: underline;
}

.prose a:hover {
  color: hsl(var(--pf));
}

.prose code {
  background-color: hsl(var(--b2));
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.prose pre {
  background-color: hsl(var(--b2));
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
}

.prose blockquote {
  border-left: 4px solid hsl(var(--p));
  padding-left: 1rem;
  margin-left: 0;
  font-style: italic;
  color: hsl(var(--bc) / 0.8);
}

.prose ul,
.prose ol {
  padding-left: 1.5rem;
}

.prose li {
  margin: 0.5rem 0;
}

.prose table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.prose th,
.prose td {
  border: 1px solid hsl(var(--b3));
  padding: 0.5rem;
  text-align: left;
}

.prose th {
  background-color: hsl(var(--b2));
  font-weight: 600;
}
</style>