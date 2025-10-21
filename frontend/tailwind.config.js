/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define your custom primary and secondary colors here
        'primary': '#DC2626',   // A standard red, for example
        'secondary': '#1D4ED8', // A standard blue, for example
        
        // OR define them with a color scale (recommended for complex apps)
        'brand-primary': {
          DEFAULT: '#DC2626', // Use 'brand-primary'
          '50': '#FEF2F2',
          '100': '#FEE2E2',
          // ... other shades from 200 to 800
          '900': '#7F1D1D', // Use 'brand-primary-900'
        },
        'brand-secondary': {
          DEFAULT: '#1D4ED8',
          '50': '#EFF6FF',
          // ... other shades
        },
      },
    },
  },
  plugins: [],
}

