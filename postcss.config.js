module.exports = ctx => ({
  plugins: [
      ctx.env === 'production' ? require('autoprefixer') : false
  ]
});