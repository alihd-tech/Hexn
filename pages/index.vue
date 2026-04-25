<template> 
  <div class="h-screen w-screen overflow-hidden flex flex-col bg-base-100">
 

    <!-- Compact Header -->
    <header class="flex justify-end items-center p-2 sm:p-3 relative z-10 flex-shrink-0">
      <button
          @click="cycleTheme"
          class="p-2 pb-1 rounded-full rounded-lg hover:bg-base-200 transition-all duration-300 focus-ring scale-hover"
          aria-label="Switch theme"
      >
        <Icon name="heroicons:swatch-20-solid" class="w-5 h-5 text-base-content/70" />
      </button>
    </header>

    <!-- Centered Main Content -->
    <main class="flex-1 flex items-center justify-center px-4 relative z-10">
      <div class="w-full max-w-lg mx-auto">
        <!-- Compact Logo -->
        <div class="text-center mb-0">
          <h1 class="Hexn-logo font-bruno text-6xl md:text-8xl lh-07">
            HexN
          </h1>
        </div>
 
        <!-- Centered Search Container -->
        <div class="search-container mb-20">
          <div class="relative">
            <div class="absolute inset-y-0 flex items-center pointer-events-none" :class="isRTL ? 'right-0 pr-4' : 'left-0 pl-4'">
              <Icon name="heroicons:magnifying-glass-20-solid" class="h-5 w-5 text-base-content/40" />
            </div>
            <input
                v-model="searchQuery"
                type="text"
                class="glass-search-container w-full py-4 typography-body text-base bg-base-200 backdrop-blur-sm border border-base-300 rounded-full shadow-lg hover:shadow-xl focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-300 text-base-content pl-12 pr-12"
                placeholder="Search or type a URL"
                @keydown.enter="performSearch"
                @focus="isSearchFocused = true"
                @blur="isSearchFocused = false"
            />
            <div class="absolute inset-y-0 right-0 pr-4 flex items-center space-x-2">
              <button class="p-2 rounded-lg hover:bg-base-200 transition-all duration-300 scale-hover" title="Voice search">
                <Icon name="heroicons:microphone-20-solid" class="h-4 w-4 text-base-content/40" />
              </button>
              <button class="p-2 rounded-lg hover:bg-base-200 transition-all duration-300 scale-hover" title="Image search">
                <Icon name="heroicons:camera-20-solid" class="h-4 w-4 text-base-content/40" />
              </button>
            </div>
          </div>

          
          
        </div>

      </div>
    </main>

    <!-- Compact Footer -->
    <footer class="glass-dark border-t border-base-300/50 relative z-10 flex-shrink-0">
      <div class="px-4 py-3">
        <div class="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0">
          <div class="flex justify-center items-center gap-3">
             <NuxtLink to="/settings" class="typography-caption text-xs text-base-content/50 hover:text-base-content transition-colors scale-hover">Settings</NuxtLink>
          
             <a href="https://github.com/alihd-tech/" target="_blank" class="typography-caption text-xs text-base-content/50 hover:text-base-content transition-colors scale-hover">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'


const searchQuery = ref('')
const isSearchFocused = ref(false)
const isRTL = ref(false)
const activeTheme = ref('light')
const THEME_KEY = 'hexn-theme'
const themeOptions = ['light', 'dark', 'lemonade', 'sunset', 'cmyk', 'forest', 'retro', 'night']


const performSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`)
  }
}

const performLuckySearch = () => {
  if (searchQuery.value.trim()) {
    const query = encodeURIComponent(searchQuery.value.trim())
    window.open(`https://www.google.com/search?q=${query}&btnI=1`, '_blank')
  }
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

onMounted(async () => {
  if (process.client) {
    const storedTheme = localStorage.getItem(THEME_KEY)
    if (storedTheme && themeOptions.includes(storedTheme)) {
      activeTheme.value = storedTheme
    } else {
      activeTheme.value = document.documentElement.getAttribute('data-theme') || 'light'
    }
    applyTheme()
  }
})
 
</script>