module.exports = {
  './**/*.{js?(x),ts?(x)}': [
    'eslint --fix',
    'git add'
  ]
}
