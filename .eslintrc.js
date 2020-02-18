module.exports = {
    root: true,
    env: {
        browser: true
    },
    extends: [
        'standard',
        'plugin:vue/recommended',
        'prettier',
        'prettier/standard',
        'prettier/vue'
    ],
    rules: {
        'no-console': 0
    }
};