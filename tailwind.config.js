module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1e40af'
        },
        secondary: {
          DEFAULT: '#0ea5e9',
          dark: '#0284c7'
        }
      }
    }
  },
  plugins: []
}
