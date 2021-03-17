module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['vue'],
  extends: [
    'standard-vue-ts'
  ]
}
