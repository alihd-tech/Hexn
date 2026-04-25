import { ref } from 'vue'

export const useContentSearch = () => {
  const searchContent = async (query) => {
    if (!query || query.trim().length === 0) {
      return []
    }

    try {
      // Import the search data
      const searchData = await import('~/content/search-data.json')
      const results = searchData.default?.searchResults || searchData.searchResults || []
      
      if (!results || results.length === 0) {
        return []
      }

      const searchTerm = query.toLowerCase().trim()
      const filteredResults = []

      // Search through each result
      for (const result of results) {
        let score = 0
        
        // Check title match (highest priority)
        if (result.title && result.title.toLowerCase().includes(searchTerm)) {
          score += 10
        }
        
        // Check tags match (high priority)
        if (result.tags && Array.isArray(result.tags)) {
          const tagMatch = result.tags.some(tag => 
            tag.toLowerCase().includes(searchTerm)
          )
          if (tagMatch) {
            score += 8
          }
        }
        
        // Check description match (medium priority)
        if (result.description && result.description.toLowerCase().includes(searchTerm)) {
          score += 5
        }
        
        // Check domain match (lower priority)
        if (result.domain && result.domain.toLowerCase().includes(searchTerm)) {
          score += 3
        }
        
        // Check category match (lower priority)
        if (result.category && result.category.toLowerCase().includes(searchTerm)) {
          score += 2
        }
        
        // If we found a match, add to results
        if (score > 0) {
          filteredResults.push({
            ...result,
            score,
            searchQuery: query
          })
        }
      }

      // Sort by relevance score (highest first)
      filteredResults.sort((a, b) => b.score - a.score)
      
      return filteredResults.slice(0, 20) // Return top 20 results
      
    } catch (error) {
      console.error('Search error:', error)
      return []
    }
  }

  const highlightSearchTerm = (text, query) => {
    if (!query || !text) return text
    
    const regex = new RegExp(`(${query.trim()})`, 'gi')
    return text.replace(regex, '<mark class="bg-yellow-200 text-yellow-900 px-1 rounded">$1</mark>')
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return {
    searchContent,
    highlightSearchTerm,
    formatDate
  }
}