module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'primary': '#417D1D',
      'secondary': '#0B2432',
      'icon': '#F4F4F4',
      'tertiary': '#EBEDF0',
      'grey': '#EBEDF0',
      'grey-font': '#6C757D',
      'border-grey': '#D0D0D0',
      'border-green': '#44831E',
      'white': '#fff',
		  'black': '#000',
      'icon': '#F4F4F4'
    },
    borderRadius: {
      DEFAULT: '3px',
    },
    extend: {},
  },
  plugins: [],
}