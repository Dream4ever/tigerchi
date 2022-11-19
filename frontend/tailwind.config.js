module.exports = {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**.tsx',
    './src/layouts/**.tsx',
  ],
  theme: {
    extend: {
      colors: {
        yellowdeep: '#FFA100',
        yellowlight: '#FFA200',
      },
      backgroundImage: {
        banner: 'url("@/assets/images/banner.png")',
      },
      backgroundSize: {
        '70%': '70%',
      },
    },
  },
}
