<template>
  <div class="relative min-h-screen bg-base-100 text-base-content">
    <div class="ambient-orb ambient-orb-1"></div>
    <div class="ambient-orb ambient-orb-2"></div>
    <div class="ambient-grid"></div>

    <header class="sticky top-0 z-50 border-b border-base-300/50 bg-base-100/85 backdrop-blur-xl">
      <div class="mx-auto flex w-full max-w-7xl items-center gap-3 px-3 py-3 sm:px-4 sm:py-4 lg:gap-6">
        <NuxtLink to="/" class="group flex-shrink-0">
          <h1 class="Hexn-logo font-bruno text-xl sm:text-2xl md:text-3xl transition-transform duration-300 group-hover:scale-105">
            HexN
          </h1>
        </NuxtLink>

        <div class="relative flex-1">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Icon name="heroicons:magnifying-glass-20-solid" class="h-5 w-5 text-base-content/45" />
          </div>
          <input
            v-model="searchQuery"
            type="text"
            class="modern-search-input w-full rounded-full border border-base-300/70 bg-base-100/95 py-3 pl-12 pr-14 text-sm shadow-sm transition-all duration-300 placeholder:text-base-content/45 focus:border-primary/40 focus:outline-none focus:ring-4 focus:ring-primary/12 sm:text-base"
            placeholder="Search knowledge, docs, tools, or paste a URL"
            @keydown.enter="performNewSearch"
          />
          <button
            class="absolute inset-y-0 right-2 my-auto flex h-10 w-10 items-center justify-center rounded-xl text-base-content/55 transition-all duration-200 hover:bg-base-200 hover:text-base-content"
            title="Search"
            @click="performNewSearch"
          >
            <Icon name="heroicons:arrow-up-right-20-solid" class="h-5 w-5" />
          </button>
        </div>

        <div class="flex items-center gap-1.5 sm:gap-2">
          <button
            @click="cycleTheme"
            class="btn btn-ghost btn-sm rounded-full"
            aria-label="Switch theme"
          >
            <Icon name="heroicons:swatch-20-solid" class="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>

    <div class="sticky top-[74px] z-40 border-b border-base-300/35 bg-base-100/75 backdrop-blur-lg">
      <div class="mx-auto max-w-7xl px-3 sm:px-4">
        <button
          @click="showSearchTabs = !showSearchTabs"
          class="flex w-full items-center justify-between py-2.5 text-sm font-medium text-base-content/75 transition-colors duration-200 hover:text-base-content"
        >
          <span class="flex items-center gap-2">
            <Icon name="heroicons:adjustments-horizontal-20-solid" class="h-4 w-4" />
            Search Scope
          </span>
          <Icon
            :name="showSearchTabs ? 'heroicons:chevron-up-20-solid' : 'heroicons:chevron-down-20-solid'"
            class="h-4 w-4 transition-transform duration-200"
          />
        </button>
      </div>

      <div class="overflow-hidden transition-all duration-300 ease-in-out" :class="showSearchTabs ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'">
        <div class="mx-auto max-w-7xl border-t border-base-300/25 px-3 py-2 sm:px-4">
          <div class="scrollbar-hide flex items-center gap-2 overflow-x-auto">
            <button
              v-for="tab in searchTabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="flex items-center gap-2 whitespace-nowrap rounded-xl border px-3 py-2 text-sm font-medium transition-all duration-200"
              :class="activeTab === tab.id
                ? 'border-primary/30 bg-primary/10 text-primary'
                : 'border-transparent bg-base-100/70 text-base-content/70 hover:border-base-300 hover:bg-base-200/80 hover:text-base-content'"
            >
              <Icon :name="tab.icon" class="h-4 w-4" />
              <span class="hidden sm:inline">{{ tab.label }}</span>
              <span class="sm:hidden">{{ tab.shortLabel }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <main class="relative z-10 mx-auto w-full max-w-7xl px-3 py-4 sm:px-4 sm:py-7">
      <div class="mb-5 rounded-2xl border border-base-300/60 bg-base-100/85 p-4 shadow-sm backdrop-blur-sm sm:p-5">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-xs uppercase tracking-[0.2em] text-base-content/45">Search Performance</p>
            <p class="mt-1 text-sm text-base-content/80">
              <span v-if="isLoading">Running a fresh query...</span>
              <span v-else-if="searchQuery.trim()">About {{ totalResults.toLocaleString() }} results in {{ searchTime }}s</span>
              <span v-else>Start by entering a query to explore indexed content.</span>
            </p>
          </div> 
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-7">
        <div class="min-w-0">
          <div v-if="isLoading" class="space-y-4">
            <div v-for="i in 5" :key="i" class="result-shell animate-pulse">
              <div class="mb-3 h-4 w-1/3 rounded bg-base-300"></div>
              <div class="mb-3 h-6 w-3/4 rounded bg-base-300"></div>
              <div class="mb-2 h-4 w-full rounded bg-base-300"></div>
              <div class="h-4 w-2/3 rounded bg-base-300"></div>
            </div>
          </div>

          <div v-else-if="scopedSearchResults.length === 0 && searchQuery.trim()" class="rounded-2xl border border-dashed border-base-300/70 bg-base-100/75 px-4 py-16 text-center">
            <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-base-200/90 text-base-content/40">
              <Icon name="heroicons:magnifying-glass-20-solid" class="h-8 w-8" />
            </div>
            <h3 class="mb-2 text-xl font-semibold">No matching {{ activeScopeLabel.toLowerCase() }} results</h3>
            <p class="text-sm text-base-content/80">Try broader keywords, fewer words, or switch to another search scope.</p>
          </div>

          <component
            v-else
            :is="activeScopeComponent"
            :results="scopedSearchResults"
            :query="searchQuery"
            :highlight-search-term="highlightSearchTerm"
            :format-date="formatDate"
          />

          <div v-if="scopedSearchResults.length > 0 && activeTab === 'all'" class="mt-10 flex justify-center">
            <div class="join rounded-2xl border border-base-300/55 bg-base-100/75 p-1 shadow-sm">
              <button
                class="join-item btn btn-sm border-none bg-transparent"
                :disabled="currentPage === 1"
                @click="goToPage(currentPage - 1)"
              >
                <Icon name="heroicons:chevron-left-20-solid" class="h-4 w-4" />
                <span class="hidden sm:inline">Previous</span>
              </button>

              <button
                v-for="page in visiblePages"
                :key="page"
                class="join-item btn btn-sm border-none"
                :class="page === currentPage ? 'btn-primary' : 'bg-transparent hover:bg-base-200'"
                @click="goToPage(page)"
              >
                {{ page }}
              </button>

              <button
                class="join-item btn btn-sm border-none bg-transparent"
                :disabled="currentPage === totalPages"
                @click="goToPage(currentPage + 1)"
              >
                <span class="hidden sm:inline">Next</span>
                <Icon name="heroicons:chevron-right-20-solid" class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <aside class="hidden lg:block">
          <div class="sticky top-32 space-y-4">
            <section class="rounded-2xl border border-base-300/60 bg-base-100/90 p-4 shadow-sm backdrop-blur-sm">
              <div class="mb-3 flex items-center justify-between">
                <h3 class="text-sm font-semibold tracking-wide text-base-content/90">Organizations</h3>
                <span class="rounded-lg bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  {{ topOrganizations.length }}
                </span>
              </div>
              <p class="mb-4 text-xs leading-relaxed text-base-content/70">
                Most visible sources in this result set. Quickly identify trusted publishers.
              </p>

              <div v-if="topOrganizations.length > 0" class="space-y-2.5">
                <div
                  v-for="org in topOrganizations"
                  :key="org.domain"
                  class="rounded-xl border border-base-300/55 bg-base-100 px-3 py-2.5 transition-colors hover:border-primary/30"
                >
                  <div class="mb-1.5 flex items-center justify-between gap-2">
                    <span class="truncate text-sm font-medium text-base-content/90">{{ org.name }}</span>
                    <span class="text-xs text-base-content/60">{{ org.count }} results</span>
                  </div>
                  <div class="h-1.5 overflow-hidden rounded bg-base-200">
                    <div class="h-full rounded bg-primary/70" :style="{ width: `${org.score}%` }"></div>
                  </div>
                  <p class="mt-1.5 truncate text-xs text-base-content/65">{{ org.domain }}</p>
                </div>
              </div>

              <div v-else class="rounded-xl border border-dashed border-base-300/65 bg-base-100/70 p-3 text-xs text-base-content/65">
                Organization insights appear once results are loaded.
              </div>
            </section>

            <section class="rounded-2xl border border-base-300/55 bg-base-100/80 p-4 shadow-sm backdrop-blur-sm">
              <h4 class="mb-2 text-sm font-semibold text-base-content/85">Reading Tips</h4>
              <ul class="space-y-2 text-xs text-base-content/70">
                <li class="flex items-start gap-2">
                  <Icon name="heroicons:check-circle-20-solid" class="mt-0.5 h-4 w-4 text-success" />
                  Compare multiple organizations before opening links.
                </li>
                <li class="flex items-start gap-2">
                  <Icon name="heroicons:check-circle-20-solid" class="mt-0.5 h-4 w-4 text-success" />
                  Use domain and date badges to verify recency.
                </li>
              </ul>
            </section>
          </div>
        </aside>
      </div>
    </main>

    
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useContentSearch } from '~/composables/useContentSearch'
import SearchScopeAllResults from '~/components/search/SearchScopeAllResults.vue'
import SearchScopeImageResults from '~/components/search/SearchScopeImageResults.vue'
import SearchScopeVideoResults from '~/components/search/SearchScopeVideoResults.vue'
import SearchScopeNewsResults from '~/components/search/SearchScopeNewsResults.vue'
import SearchScopeShoppingResults from '~/components/search/SearchScopeShoppingResults.vue'
import SearchScopeMapResults from '~/components/search/SearchScopeMapResults.vue'

const route = useRoute()
const router = useRouter()
const { searchContent, highlightSearchTerm, formatDate } = useContentSearch()
const THEME_KEY = 'hexn-theme'
const themeOptions = ['light', 'dark', 'lemonade', 'sunset', 'cmyk', 'forest', 'retro', 'night']

const searchQuery = ref(route.query.q || '')
const activeTheme = ref('light')
const currentPage = ref(parseInt(route.query.page) || 1)
const totalResults = ref(1247000)
const searchTime = ref(0.42)
const totalPages = ref(50)
const activeTab = ref('all')
const isLoading = ref(false)
const searchResults = ref([])
const showSearchTabs = ref(true)

const searchTabs = [
  { id: 'all', label: 'All', shortLabel: 'All', icon: 'heroicons:magnifying-glass-20-solid' },
  { id: 'images', label: 'Images', shortLabel: 'Images', icon: 'heroicons:photo-20-solid' },
  { id: 'videos', label: 'Videos', shortLabel: 'Videos', icon: 'heroicons:play-20-solid' },
  { id: 'news', label: 'News', shortLabel: 'News', icon: 'heroicons:newspaper-20-solid' },
  { id: 'shopping', label: 'Shopping', shortLabel: 'Shop', icon: 'heroicons:shopping-bag-20-solid' },
  { id: 'maps', label: 'Maps', shortLabel: 'Maps', icon: 'heroicons:map-20-solid' }
]

const scopeKeywords = {
  images: ['image', 'photo', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'gallery'],
  videos: ['video', 'watch', 'stream', 'youtube', 'vimeo', 'player', 'clip'],
  news: ['news', 'breaking', 'report', 'headline', 'article', 'journal'],
  shopping: ['shop', 'shopping', 'product', 'buy', 'price', 'deal', 'store', 'cart'],
  maps: ['map', 'maps', 'location', 'place', 'address', 'nearby', 'direction']
}

const scopeComponents = {
  all: SearchScopeAllResults,
  images: SearchScopeImageResults,
  videos: SearchScopeVideoResults,
  news: SearchScopeNewsResults,
  shopping: SearchScopeShoppingResults,
  maps: SearchScopeMapResults
}

const resultIncludesScopeKeyword = (result, scopeId) => {
  const keywords = scopeKeywords[scopeId] || []
  const normalized = `${result?.title || ''} ${result?.description || ''} ${result?.category || ''} ${result?.url || ''}`.toLowerCase()
  return keywords.some((keyword) => normalized.includes(keyword))
}

const fallbackScopeResults = (scopeId, results) => {
  const fallbackSize = {
    images: 12,
    videos: 8,
    news: 10,
    shopping: 9,
    maps: 8
  }
  const fallbackStep = {
    images: 2,
    videos: 3,
    news: 2,
    shopping: 2,
    maps: 3
  }

  const size = fallbackSize[scopeId] || 8
  const step = fallbackStep[scopeId] || 2
  return results.filter((_, index) => index % step === 0).slice(0, size)
}

const scopedSearchResults = computed(() => {
  if (activeTab.value === 'all') {
    return searchResults.value
  }

  const primaryMatches = searchResults.value.filter((result) => resultIncludesScopeKeyword(result, activeTab.value))
  if (primaryMatches.length > 0) {
    return primaryMatches
  }

  return fallbackScopeResults(activeTab.value, searchResults.value)
})

const activeScopeComponent = computed(() => scopeComponents[activeTab.value] || scopeComponents.all)
const activeScopeLabel = computed(() => searchTabs.find((tab) => tab.id === activeTab.value)?.label || 'All')

// Perform search function
const performSearch = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    return
  }

  isLoading.value = true
  try {
    const results = await searchContent(searchQuery.value.trim())
    searchResults.value = results
    totalResults.value = results.length * 100 // Simulate larger result count
    searchTime.value = (Math.random() * 0.5 + 0.1).toFixed(2) // Random search time
  } catch (error) {
    console.error('Search failed:', error)
    searchResults.value = []
  } finally {
    isLoading.value = false
  }
}

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, start + 4)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const topOrganizations = computed(() => {
  const sources = {}

  for (const result of searchResults.value) {
    const domain = (result?.domain || '').trim().toLowerCase()
    if (!domain) continue
    sources[domain] = (sources[domain] || 0) + 1
  }

  const sorted = Object.entries(sources)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)

  const maxCount = sorted[0]?.[1] || 1

  return sorted.map(([domain, count]) => ({
    domain,
    count,
    score: Math.max(18, Math.round((count / maxCount) * 100)),
    name: domain
      .replace(/^www\./, '')
      .split('.')
      .slice(0, 1)
      .join('')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
  }))
})

const performNewSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/search',
      query: { q: searchQuery.value.trim(), page: 1 }
    })
    performSearch()
  }
}

const goToPage = (page) => {
  currentPage.value = page
  router.push({
    path: '/search',
    query: { ...route.query, page }
  })
}

const applyTheme = () => {
  if (!process.client) return
  document.documentElement.setAttribute('data-theme', activeTheme.value)
  localStorage.setItem(THEME_KEY, activeTheme.value)
}

const cycleTheme = () => {
  const currentIndex = themeOptions.indexOf(activeTheme.value)
  const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % themeOptions.length : 0
  activeTheme.value = themeOptions[nextIndex]
  applyTheme()
}

onMounted(() => {
  if (process.client) {
    const storedTheme = localStorage.getItem(THEME_KEY)
    if (storedTheme && themeOptions.includes(storedTheme)) {
      activeTheme.value = storedTheme
    } else {
      activeTheme.value = document.documentElement.getAttribute('data-theme') || 'light'
    }
    applyTheme()
    
    // Perform search if query exists
    if (searchQuery.value.trim()) {
      performSearch()
    }
  }
})

useHead({
  title: `${searchQuery.value} - Hexn Search`,
  meta: [
    {
      name: 'description',
      content: `Search results for "${searchQuery.value}" on Hexn - Free, independent, and open-source search.`
    }
  ]
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.ambient-orb {
  pointer-events: none;
  position: absolute;
  z-index: 0;
  height: 360px;
  width: 360px;
  border-radius: 999px;
  filter: blur(72px);
  opacity: 0.22;
}

.ambient-orb-1 {
  top: -160px;
  right: -120px;
  background: radial-gradient(circle at center, hsl(var(--p)) 0%, transparent 70%);
}

.ambient-orb-2 {
  bottom: 12%;
  left: -180px;
  background: radial-gradient(circle at center, hsl(var(--s)) 0%, transparent 70%);
}

.ambient-grid {
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.25;
  background-image:
    linear-gradient(to right, hsl(var(--bc) / 0.045) 1px, transparent 1px),
    linear-gradient(to bottom, hsl(var(--bc) / 0.045) 1px, transparent 1px);
  background-size: 38px 38px;
  -webkit-mask-image: radial-gradient(circle at center, black 35%, transparent 90%);
  mask-image: radial-gradient(circle at center, black 35%, transparent 90%);
}

.modern-search-input {
  background-image: linear-gradient(180deg, hsl(var(--b1)) 0%, hsl(var(--b1) / 0.92) 100%);
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border: 1px solid hsl(var(--b3) / 0.7);
  background: hsl(var(--b1) / 0.9);
  border-radius: 0.75rem;
  padding: 0.34rem 0.6rem;
  font-size: 0.73rem;
  color: hsl(var(--bc) / 0.72);
}

.result-shell {
  border: 1px solid hsl(var(--b3) / 0.56);
  background: linear-gradient(175deg, hsl(var(--b1) / 0.9) 0%, hsl(var(--b1) / 0.72) 100%);
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 2px 8px hsl(var(--bc) / 0.03);
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
}

.result-shell:hover {
  transform: translateY(-2px);
  border-color: hsl(var(--p) / 0.32);
  box-shadow: 0 10px 26px hsl(var(--bc) / 0.08);
}

@media (min-width: 640px) {
  .result-shell {
    padding: 1.25rem;
  }
}
</style>