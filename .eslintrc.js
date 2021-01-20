module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  // "parser": "vue-eslint-parser",
  parserOptions: {
    project: './tsconfig.json'
    // "parser": "@typescript-eslint/parser"
  },
  plugins: ['vue'],
  extends: [
    'standard-vue-ts'
  ]
}
