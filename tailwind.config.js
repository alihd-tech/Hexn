export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roobert', 'system-ui', 'sans-serif'],
        'persian': ['Vazirmatn', 'system-ui', 'sans-serif'],
        'lato': ['Lato', 'system-ui', 'sans-serif'],
        'bruno': ['Bruno Ace SC', 'BrunoAceSC-Regular', 'monospace'],
        'vazirmatn': ['Vazirmatn', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Display sizes
        'display-large': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'display-medium': ['2.75rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-small': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        
        // Headline sizes
        'headline-large': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        'headline-medium': ['1.75rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'headline-small': ['1.5rem', { lineHeight: '1.35', letterSpacing: '-0.005em' }],
        
        // Title sizes
        'title-large': ['1.375rem', { lineHeight: '1.4', letterSpacing: '0em' }],
        'title-medium': ['1.125rem', { lineHeight: '1.45', letterSpacing: '0.01em' }],
        'title-small': ['1rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        
        // Label sizes
        'label-large': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.025em' }],
        'label-medium': ['0.75rem', { lineHeight: '1.35', letterSpacing: '0.03em' }],
        'label-small': ['0.6875rem', { lineHeight: '1.3', letterSpacing: '0.035em' }],
        
        // Body sizes
        'body-large': ['1rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        'body-medium': ['0.875rem', { lineHeight: '1.55', letterSpacing: '0.015em' }],
        'body-small': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'orb-pulse': 'orbPulse 4s ease-in-out infinite',
        'particle-float': 'particleFloat 15s ease-in-out infinite',
        'chat-slide-in': 'chatSlideIn 0.5s ease-out',
        'typing-dot': 'typingDot 1.4s ease-in-out infinite',
        'ray-1': 'rayMove1 20s ease-in-out infinite',
        'ray-2': 'rayMove2 25s ease-in-out infinite',
        'ray-3': 'rayMove3 30s ease-in-out infinite',
        'ray-4': 'rayMove4 22s ease-in-out infinite',
        'ray-5': 'rayMove5 28s ease-in-out infinite',
        'glass-shimmer': 'glassShimmer 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        orbPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
        },
        particleFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-30px) rotate(120deg)' },
          '66%': { transform: 'translateY(-15px) rotate(240deg)' },
        },
        chatSlideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        typingDot: {
          '0%, 60%, 100%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-10px)' },
        },
        rayMove1: {
          '0%, 100%': { transform: 'translateX(-100px) translateY(-50px) rotate(45deg)' },
          '50%': { transform: 'translateX(100px) translateY(50px) rotate(45deg)' },
        },
        rayMove2: {
          '0%, 100%': { transform: 'translateX(50px) translateY(-100px) rotate(-30deg)' },
          '50%': { transform: 'translateX(-50px) translateY(100px) rotate(-30deg)' },
        },
        rayMove3: {
          '0%, 100%': { transform: 'translateX(-150px) translateY(0px) rotate(60deg)' },
          '50%': { transform: 'translateX(150px) translateY(-100px) rotate(60deg)' },
        },
        rayMove4: {
          '0%, 100%': { transform: 'translateX(100px) translateY(50px) rotate(-45deg)' },
          '50%': { transform: 'translateX(-100px) translateY(-50px) rotate(-45deg)' },
        },
        rayMove5: {
          '0%, 100%': { transform: 'translateX(-50px) translateY(100px) rotate(30deg)' },
          '50%': { transform: 'translateX(50px) translateY(-100px) rotate(30deg)' },
        },
        glassShimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px 0 rgba(0,0,0,0.08)',
        'soft-lg': '0 4px 25px 0 rgba(0,0,0,0.12)',
        'glow': '0 0 20px rgba(34, 197, 94, 0.3)',
        'glow-lg': '0 0 40px rgba(34, 197, 94, 0.6)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 15px 35px 0 rgba(31, 38, 135, 0.2)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      colors: {
        'glass': 'rgba(255, 255, 255, 0.25)',
        'glass-dark': 'rgba(0, 0, 0, 0.05)',
        'glass-ai': 'rgba(255, 255, 255, 0.15)',
      },
      spacing: {
        '18': '4.5rem',
        '84': '21rem',
        '88': '22rem',
        '92': '23rem',
        '96': '24rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
    },
  },
  plugins: [
    require("daisyui"),
    function({ addUtilities, addComponents }) {
      const newUtilities = {
        '.glass-morphism': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        },
        '.glass-morphism-dark': {
          background: 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        },
        '.glass-card': {
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
        },
        '.glass-input': {
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)',
        },
        '.glass-button': {
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          transition: 'all 0.3s ease',
        },
        '.glass-button:hover': {
          background: 'rgba(255, 255, 255, 0.3)',
          transform: 'translateY(-2px)',
          boxShadow: '0 10px 25px 0 rgba(31, 38, 135, 0.3)',
        },
        '.colorful-rays': {
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          height: '100vh',
          overflow: 'hidden',
          zIndex: '-1',
          pointerEvents: 'none',
        },
        '.ray': {
          position: 'absolute',
          borderRadius: '50%',
          filter: 'blur(40px)',
          opacity: '0.6',
        },
        '.ray-1': {
          width: '300px',
          height: '300px',
          background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
          top: '10%',
          left: '10%',
          animation: 'rayMove1 20s ease-in-out infinite',
        },
        '.ray-2': {
          width: '250px',
          height: '250px',
          background: 'linear-gradient(-45deg, #48cae4, #023e8a)',
          top: '20%',
          right: '15%',
          animation: 'rayMove2 25s ease-in-out infinite',
        },
        '.ray-3': {
          width: '400px',
          height: '400px',
          background: 'linear-gradient(60deg, #a8e6cf, #3d5a80)',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'rayMove3 30s ease-in-out infinite',
        },
        '.ray-4': {
          width: '200px',
          height: '200px',
          background: 'linear-gradient(-30deg, #ffd23f, #ff6b35)',
          top: '30%',
          right: '5%',
          animation: 'rayMove4 22s ease-in-out infinite',
        },
        '.ray-5': {
          width: '350px',
          height: '350px',
          background: 'linear-gradient(120deg, #c77dff, #7209b7)',
          top: '15%',
          left: '5%',
          animation: 'rayMove5 28s ease-in-out infinite',
        },
      }
      
      const newComponents = {
        '.search-glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '50px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          transition: 'all 0.3s ease',
        },
        '.search-glass:focus': {
          background: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.5)',
        },
        '.logo-glass': {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '20px 40px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
        },
      }
      
      addUtilities(newUtilities)
      addComponents(newComponents)
    }
  ],
  daisyui: {
    themes: [
      "light",
      "dark", 
      "lemonade",
      "sunset",
      "cmyk",
      "forest",
      "retro",
      "night",
      {
        hexoser: {
          "primary": "#22c55e",
          "primary-focus": "#16a34a",
          "primary-content": "#ffffff",
          "secondary": "#64748b",
          "secondary-focus": "#475569",
          "secondary-content": "#ffffff",
          "accent": "#06b6d4",
          "accent-focus": "#0891b2",
          "accent-content": "#ffffff",
          "neutral": "#374151",
          "neutral-focus": "#1f2937",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#f8fafc",
          "base-300": "#e2e8f0",
          "base-content": "#1f2937",
          "info": "#0ea5e9",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
      },
    ],
    base: true,
    styled: true,
    utils: true,
  },
}