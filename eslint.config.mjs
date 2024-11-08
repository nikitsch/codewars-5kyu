import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  {
    files: ['**/*.{js,ts}'],
    languageOptions: { globals: globals.browser },
    rules: {
      semi: ['error', 'always'], // Обязывает использовать точку с запятой
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
]
