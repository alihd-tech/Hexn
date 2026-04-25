<template>
  <div class="relative min-h-screen bg-gradient-to-b from-base-100 via-base-100 to-base-200/40 text-base-content">
    <div class="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 rounded-full bg-primary/20 blur-3xl"></div>
    <div class="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-secondary/20 blur-3xl"></div>

    <header class="sticky top-0 z-40 border-b border-base-300/50 bg-base-100/85 backdrop-blur-xl">
      <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <NuxtLink to="/" class="group">
          <h1 class="Hexn-logo font-bruno text-2xl transition-transform duration-300 group-hover:scale-105">HexN</h1>
        </NuxtLink>
        <NuxtLink to="/" class="btn btn-ghost btn-sm rounded-xl">
          <Icon name="heroicons:arrow-left-20-solid" class="h-4 w-4" />
          Back
        </NuxtLink>
      </div>
    </header>

    <main class="relative z-10 mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
      <div class="mb-8">
        <p class="text-xs uppercase tracking-[0.22em] text-base-content/45">Personalization</p>
        <h2 class="mt-2 text-3xl font-semibold sm:text-4xl">Settings</h2>
        <p class="mt-2 max-w-2xl text-sm text-base-content/75 sm:text-base">
          Customize the look and behavior of HexN. All settings are stored locally in your browser.
        </p>
      </div>

      <div class="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section class="space-y-6">
          <article class="rounded-2xl border border-base-300/55 bg-base-100/85 p-5 shadow-sm backdrop-blur-sm sm:p-6">
            <div class="mb-4 flex items-center gap-2">
              <Icon name="heroicons:swatch-20-solid" class="h-5 w-5 text-primary" />
              <h3 class="text-lg font-semibold">Theme</h3>
            </div>
            <p class="mb-5 text-sm text-base-content/70">
              Pick a color theme that fits your workflow and visual style.
            </p>

            <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              <button
                v-for="option in themeOptions"
                :key="option.id"
                class="group rounded-xl border p-3 text-left transition-all duration-200"
                :class="activeTheme === option.id
                  ? 'border-primary/40 bg-primary/10 shadow-md'
                  : 'border-base-300/60 bg-base-100 hover:border-primary/25 hover:bg-base-200/60'"
                @click="selectTheme(option.id)"
              >
                <div class="mb-3 flex h-9 items-center gap-1.5 rounded-lg p-1" :class="option.previewClass">
                  <span class="h-2 w-2 rounded-full bg-white/70"></span>
                  <span class="h-2 w-6 rounded bg-white/55"></span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium">{{ option.label }}</span>
                  <Icon
                    v-if="activeTheme === option.id"
                    name="heroicons:check-circle-20-solid"
                    class="h-5 w-5 text-primary"
                  />
                </div>
              </button>
            </div>
          </article>

          <article class="rounded-2xl border border-base-300/55 bg-base-100/85 p-5 shadow-sm backdrop-blur-sm sm:p-6">
            <div class="mb-4 flex items-center gap-2">
              <Icon name="heroicons:adjustments-horizontal-20-solid" class="h-5 w-5 text-primary" />
              <h3 class="text-lg font-semibold">Preferences</h3>
            </div>

            <div class="space-y-4">
              <label class="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-base-300/55 bg-base-100 px-4 py-3 hover:border-primary/25">
                <div>
                  <p class="font-medium">Compact mode</p>
                  <p class="text-sm text-base-content/70">Tighter spacing for search and content cards.</p>
                </div>
                <input v-model="compactMode" type="checkbox" class="toggle toggle-primary mt-0.5" @change="applyPreferences" />
              </label>

              <label class="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-base-300/55 bg-base-100 px-4 py-3 hover:border-primary/25">
                <div>
                  <p class="font-medium">Reduce motion</p>
                  <p class="text-sm text-base-content/70">Minimize visual animations and transitions.</p>
                </div>
                <input v-model="reduceMotion" type="checkbox" class="toggle toggle-primary mt-0.5" @change="applyPreferences" />
              </label>

              <label class="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-base-300/55 bg-base-100 px-4 py-3 hover:border-primary/25">
                <div>
                  <p class="font-medium">Hide background particles</p>
                  <p class="text-sm text-base-content/70">Disable decorative particle and sphere effects.</p>
                </div>
                <input v-model="hideParticles" type="checkbox" class="toggle toggle-primary mt-0.5" @change="applyPreferences" />
              </label>
            </div>
          </article>
        </section>

        <aside class="space-y-6">
          <article class="rounded-2xl border border-base-300/55 bg-base-100/85 p-5 shadow-sm backdrop-blur-sm sm:p-6">
            <div class="mb-4 flex items-center gap-2">
              <Icon name="heroicons:computer-desktop-20-solid" class="h-5 w-5 text-primary" />
              <h3 class="text-lg font-semibold">Preview</h3>
            </div>

            <div class="rounded-xl border border-base-300/65 bg-base-100 p-4">
              <div class="mb-3 flex items-center justify-between">
                <span class="text-xs uppercase tracking-[0.14em] text-base-content/50">Active theme</span>
                <span class="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">{{ activeTheme }}</span>
              </div>
              <div class="mb-3 h-2 rounded bg-base-300/80"></div>
              <div class="mb-2 h-2 w-4/5 rounded bg-base-300/70"></div>
              <div class="h-2 w-3/5 rounded bg-base-300/70"></div>
            </div>

            <button class="btn btn-outline btn-sm mt-4 w-full rounded-xl" @click="resetPreferences">
              Reset to defaults
            </button>
          </article>

          <article class="rounded-2xl border border-base-300/55 bg-base-100/85 p-5 shadow-sm backdrop-blur-sm sm:p-6">
            <h3 class="mb-2 text-base font-semibold">Privacy note</h3>
            <p class="text-sm text-base-content/70">
              Preferences are only saved in this browser via local storage and are never sent to a server.
            </p>
          </article>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const THEME_KEY = 'hexn-theme'
const COMPACT_KEY = 'hexn-compact-mode'
const REDUCE_MOTION_KEY = 'hexn-reduce-motion'
const HIDE_PARTICLES_KEY = 'hexn-hide-particles'

const themeOptions = [
  { id: 'light', label: 'Light', previewClass: 'bg-gradient-to-br from-slate-100 to-white' },
  { id: 'dark', label: 'Dark', previewClass: 'bg-gradient-to-br from-slate-700 to-slate-900' },
  { id: 'lemonade', label: 'Lemonade', previewClass: 'bg-gradient-to-br from-yellow-300 to-amber-400' },
  { id: 'sunset', label: 'Sunset', previewClass: 'bg-gradient-to-br from-orange-400 to-red-500' },
  { id: 'cmyk', label: 'CMYK', previewClass: 'bg-gradient-to-br from-cyan-400 to-pink-500' },
  { id: 'forest', label: 'Forest', previewClass: 'bg-gradient-to-br from-emerald-500 to-lime-600' },
  { id: 'retro', label: 'Retro', previewClass: 'bg-gradient-to-br from-amber-500 to-violet-600' },
  { id: 'night', label: 'Night', previewClass: 'bg-gradient-to-br from-slate-700 to-slate-900' }
]

const activeTheme = ref('light')
const compactMode = ref(false)
const reduceMotion = ref(false)
const hideParticles = ref(false)

const applyTheme = () => {
  if (!process.client) return
  document.documentElement.setAttribute('data-theme', activeTheme.value)
  localStorage.setItem(THEME_KEY, activeTheme.value)
}

const applyPreferences = () => {
  if (!process.client) return
  const body = document.body
  body.classList.toggle('compact-mode', compactMode.value)
  body.classList.toggle('reduce-motion', reduceMotion.value)
  body.classList.toggle('hide-particles', hideParticles.value)

  localStorage.setItem(COMPACT_KEY, compactMode.value.toString())
  localStorage.setItem(REDUCE_MOTION_KEY, reduceMotion.value.toString())
  localStorage.setItem(HIDE_PARTICLES_KEY, hideParticles.value.toString())
}

const selectTheme = (themeId) => {
  activeTheme.value = themeId
  applyTheme()
}

const resetPreferences = () => {
  activeTheme.value = 'light'
  compactMode.value = false
  reduceMotion.value = false
  hideParticles.value = false
  applyTheme()
  applyPreferences()
}

onMounted(() => {
  if (!process.client) return

  const storedTheme = localStorage.getItem(THEME_KEY)
  if (storedTheme && themeOptions.some((option) => option.id === storedTheme)) {
    activeTheme.value = storedTheme
  } else {
    activeTheme.value = document.documentElement.getAttribute('data-theme') || 'light'
  }

  compactMode.value = localStorage.getItem(COMPACT_KEY) === 'true'
  reduceMotion.value = localStorage.getItem(REDUCE_MOTION_KEY) === 'true'
  hideParticles.value = localStorage.getItem(HIDE_PARTICLES_KEY) === 'true'

  applyTheme()
  applyPreferences()
})

useHead({
  title: 'Settings - Hexn',
  meta: [
    {
      name: 'description',
      content: 'Customize Hexn theme and interface preferences with local-only settings.'
    }
  ]
})
</script>
