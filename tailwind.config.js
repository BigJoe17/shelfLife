/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary: '#1E90FF',
        secondary: '#FF6347',
        accent: '#FFD700',
        background: '#F5F5F5',
        text: '#333333',
        border: '#CCCCCC',
        shadow: '#000000',
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8',
        light: '#f8f9fa',
        dark: '#343a40',
        muted: '#6c757d',
        white: '#FFFFFF',
        black: '#000000',
        transparent: 'transparent',
        current: 'currentColor',
      }
    },
  },
  plugins: [],
}