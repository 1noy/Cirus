import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        browser: true,
        es2021: true,
        node: true,
        document: true,
        window: true,
        console: true,
        setTimeout: true,
        clearTimeout: true,
        setInterval: true,
        clearInterval: true,
        requestAnimationFrame: true,
        cancelAnimationFrame: true,
        Event: true,
        URL: true,
        Blob: true,
        MediaRecorder: true,
        navigator: true,
        Audio: true,
        Worker: true,
        IntersectionObserver: true,
        PerformanceObserver: true,
        performance: true,
        process: true,
        fetch: true,
        caches: true,
        Image: true
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react,
      'react-hooks': reactHooks
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/no-unescaped-entities': 'off',
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'no-undef': 'warn',
      'no-inner-declarations': 'warn',
      'no-case-declarations': 'warn',
      'no-empty': 'warn',
      'react-hooks/exhaustive-deps': 'warn'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
]; 