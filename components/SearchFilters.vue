<template>
  <div class="space-y-4">
    <!-- Time Filter -->
    <div>
      <label class="typography-caption text-sm font-medium text-base-content/70 mb-2 block">Time</label>
      <select v-model="selectedTime" class="select select-sm w-full bg-base-100/50 border-base-300">
        <option value="any">Any time</option>
        <option value="hour">Past hour</option>
        <option value="day">Past 24 hours</option>
        <option value="week">Past week</option>
        <option value="month">Past month</option>
        <option value="year">Past year</option>
      </select>
    </div>
    
    <!-- Region Filter -->
    <div>
      <label class="typography-caption text-sm font-medium text-base-content/70 mb-2 block">Region</label>
      <select v-model="selectedRegion" class="select select-sm w-full bg-base-100/50 border-base-300">
        <option value="any">Any region</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
        <option value="au">Australia</option>
        <option value="de">Germany</option>
        <option value="fr">France</option>
      </select>
    </div>

    <!-- Language Filter -->
    <div>
      <label class="typography-caption text-sm font-medium text-base-content/70 mb-2 block">Language</label>
      <select v-model="selectedLanguage" class="select select-sm w-full bg-base-100/50 border-base-300">
        <option value="any">Any language</option>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="zh">Chinese</option>
        <option value="ja">Japanese</option>
      </select>
    </div>

    <!-- Safe Search -->
    <div>
      <label class="typography-caption text-sm font-medium text-base-content/70 mb-2 block">SafeSearch</label>
      <div class="space-y-2">
        <label class="flex items-center space-x-2 cursor-pointer">
          <input type="radio" v-model="safeSearch" value="strict" class="radio radio-sm radio-primary">
          <span class="typography-body text-sm">Strict</span>
        </label>
        <label class="flex items-center space-x-2 cursor-pointer">
          <input type="radio" v-model="safeSearch" value="moderate" class="radio radio-sm radio-primary">
          <span class="typography-body text-sm">Moderate</span>
        </label>
        <label class="flex items-center space-x-2 cursor-pointer">
          <input type="radio" v-model="safeSearch" value="off" class="radio radio-sm radio-primary">
          <span class="typography-body text-sm">Off</span>
        </label>
      </div>
    </div>

    <!-- File Type Filter -->
    <div>
      <label class="typography-caption text-sm font-medium text-base-content/70 mb-2 block">File Type</label>
      <select v-model="selectedFileType" class="select select-sm w-full bg-base-100/50 border-base-300">
        <option value="any">Any format</option>
        <option value="pdf">PDF</option>
        <option value="doc">Word Document</option>
        <option value="ppt">PowerPoint</option>
        <option value="xls">Excel</option>
        <option value="txt">Text File</option>
      </select>
    </div>

    <!-- Usage Rights -->
    <div>
      <label class="typography-caption text-sm font-medium text-base-content/70 mb-2 block">Usage Rights</label>
      <select v-model="selectedUsageRights" class="select select-sm w-full bg-base-100/50 border-base-300">
        <option value="any">Not filtered by license</option>
        <option value="free">Free to use or share</option>
        <option value="commercial">Free to use commercially</option>
        <option value="modify">Free to use, share or modify</option>
      </select>
    </div>

    <!-- Clear Filters -->
    <div class="pt-2">
      <button 
        @click="clearFilters"
        class="btn btn-sm btn-outline w-full"
      >
        Clear all filters
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedTime = ref('any')
const selectedRegion = ref('any')
const selectedLanguage = ref('any')
const safeSearch = ref('moderate')
const selectedFileType = ref('any')
const selectedUsageRights = ref('any')

const clearFilters = () => {
  selectedTime.value = 'any'
  selectedRegion.value = 'any'
  selectedLanguage.value = 'any'
  safeSearch.value = 'moderate'
  selectedFileType.value = 'any'
  selectedUsageRights.value = 'any'
}
</script>