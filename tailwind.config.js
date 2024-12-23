module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      mob: "375px",
      tablet: "768px",
      laptop: "1024px",
      desktop: "1280px",
      laptopl: "1440px",
    },
    
    extend: {
      colors: {
        'custom-light-bg': '#FEF9E7', // Example light mode color
        'custom-dark-bg': '#121212', // Example dark mode color
      },

      backgroundImage: {
        'clicmedia-bg': "url('/backgroundwebsite.png')",
        'gradient-orange': 'linear-gradient(to right,#FF5F1F, #FFAC1C)',
        'gradient-green': 'linear-gradient(to right, #355E3B, #228B22)',
      },
      fontFamily: {
        
        sans: [
          'Inter var, sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  plugins: [],
};
