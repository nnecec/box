const postcss = require('rollup-plugin-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const nested = require('postcss-nested')

module.exports = {
  rollup (config, options) {
    config.plugins.push(postcss({
      plugins: [
        autoprefixer(),
        cssnano({
          preset: 'default'
        }),
        nested()
      ],
      inject: true
    }))
    return config
  }
}
