/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // React components
    "./public/index.html", // Tauri's public directory
  ],
  theme: {
    extend: {}, // Extend or customize the default theme here
  },
  plugins: [],
};
