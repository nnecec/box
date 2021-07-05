module.exports = {
  './**/*.{js?(x),ts?(x),md?(x)}': [
    'eslint --fix',
    'git add'
  ]
}
